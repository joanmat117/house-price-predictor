import { useFormFieldsStore } from '@/shared/hooks/useFormFieldsStore';
import { 
  type UseFormReturn, 
  type UseFormHandleSubmit,
  type FieldValues,
  type SubmitHandler
} from 'react-hook-form';
import { useEffect, useCallback, useRef } from 'react';

interface UseFormPersistOptions {
  autoSave?: boolean; // Save automatically when fields change
  debounceTime?: number; // Debounce time for auto-save
  restoreOnMount?: boolean; // Restore data automatically on mount
}

export function useFormPersist<T extends FieldValues>(
  useFormReturn: UseFormReturn<T, unknown, any>,
  options: UseFormPersistOptions = {}
) {
  const { 
    handleSubmit: originalHandleSubmit, 
    watch,
    getValues,
    setValue
  } = useFormReturn;

  const {
    autoSave = true,
    debounceTime = 500,
    restoreOnMount = true
  } = options;

  const { addFields, fields, resetFields } = useFormFieldsStore();
  
  // Ref para controlar si es una restauración inicial
  const isInitialRestoration = useRef(false);
  const isRestoring = useRef(false);

  // Function to save current form data to the store
  const saveCurrentFields = useCallback(async (data?: T) => {
    try {
      // No guardar mientras estamos restaurando datos
      if (isRestoring.current) return;
      
      const fieldsToSave = data || getValues();
      await addFields(fieldsToSave);
    } catch (error) {
      console.error('Error saving fields to store:', error);
    }
  }, [addFields, getValues]);

  // Function to restore form data from the store
  const restoreFields = useCallback(() => {
    try {
      // The fields object contains all form data
      if (Object.keys(fields).length > 0 && !isInitialRestoration.current) {
        isRestoring.current = true;
        
        // Restaurar los datos SIN usar reset para evitar disparar watch
        const formData = fields as T;
        Object.entries(formData).forEach(([key, value]) => {
          setValue(key as any, value, {
            shouldValidate: false,
            shouldDirty: false,
            shouldTouch: false
          });
        });
        
        isInitialRestoration.current = true;
        isRestoring.current = false;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error restoring fields from store:', error);
      isRestoring.current = false;
      return false;
    }
  }, [fields, setValue]);

  // Custom handleSubmit that persists data before executing onValid
  const customHandleSubmit: UseFormHandleSubmit<T> = (
    onValid: SubmitHandler<T>, 
    onInvalid?: (errors: any, event?: React.BaseSyntheticEvent) => any
  ) => {
    return originalHandleSubmit(
      async (data, event) => {
        try {
          // 1. Persist data to store before submit
          await saveCurrentFields(data);
          
          // 2. Execute the original onValid function
          const result = await onValid(data, event);
          
          return result;
          
        } catch (error) {
          console.error('Error in custom submit:', error);
          throw error;
        }
      },
      onInvalid
    );
  };

  // Effect to restore data when component mounts (SÓLO UNA VEZ)
  useEffect(() => {
    if (restoreOnMount && !isInitialRestoration.current) {
      const timer = setTimeout(() => {
        restoreFields();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [restoreOnMount]);

  // Effect for auto-save when form fields change
  useEffect(() => {
    if (!autoSave || isRestoring.current) return;

    // Use ReturnType<typeof setTimeout> for browser compatibility
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const subscription = watch((data) => {
      // No auto-save durante la restauración inicial
      if (isRestoring.current) return;
      
      // Use debounce to avoid saving on every keystroke
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        try {
          await saveCurrentFields(data as T);
        } catch (error) {
          console.error('Error in auto-save:', error);
        }
      }, debounceTime);
    });
    
    return () => {
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [watch, autoSave, debounceTime, saveCurrentFields]);

  // Function to clear persisted form data
  const clearPersistedData = useCallback(async () => {
    try {
      // resetFields clears all fields from the store
      resetFields();
      isInitialRestoration.current = false;
      return true;
    } catch (error) {
      console.error('Error clearing persisted data:', error);
      return false;
    }
  }, [resetFields]);

  // Function to force a manual save
  const manualSave = useCallback(async () => {
    try {
      const currentData = getValues();
      await saveCurrentFields(currentData);
      return true;
    } catch (error) {
      console.error('Error in manual save:', error);
      return false;
    }
  }, [getValues, saveCurrentFields]);

  return {
    ...useFormReturn,
    handleSubmit: customHandleSubmit,
    // Additional functions for persistence management
    restoreFields,
    clearPersistedData,
    manualSave,
    // Information about persisted data
    hasPersistedData: Object.keys(fields).length > 0,
    persistedData: fields,
    // Keep access to original handleSubmit if needed
    originalHandleSubmit,
  };
}
