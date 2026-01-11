import { useFormFieldsStore } from '@/shared/hooks/useFormFieldsStore';
import { 
  useForm,
  type UseFormHandleSubmit,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
  type DefaultValues
} from 'react-hook-form';
import { useEffect, useCallback, useRef, useMemo } from 'react';

interface UseFormPersistOptions {
  autoSave?: boolean; 
  debounceTime?: number; 
  restoreOnMount?: boolean; 
}

// El hook ahora acepta las props de useForm (generic T) y sus propias opciones
export function useFormPersist<T extends FieldValues>(
  useFormOptions: UseFormProps<T> = {},
  persistOptions: UseFormPersistOptions = {}
) {
  const {
    autoSave = true,
    debounceTime = 500,
    restoreOnMount = true
  } = persistOptions;

  const { addFields, fields, resetFields } = useFormFieldsStore();
  
  // 1. LÓGICA DE DEFAULT VALUES
  // Calculamos los valores iniciales combinando los defaultValues del usuario
  // con los datos guardados en el store.
  const combinedDefaultValues = useMemo(() => {
    // Si no debemos restaurar, usamos los defaults originales
    if (!restoreOnMount) {
      return useFormOptions.defaultValues;
    }

    const hasPersistedData = Object.keys(fields).length > 0;
    
    // Si hay datos persistidos, los priorizamos
    if (hasPersistedData) {
      // Hacemos merge: persistidos sobreescriben a los defaults originales
      return {
        ...(useFormOptions.defaultValues || {}),
        ...fields,
      } as DefaultValues<T>;
    }

    return useFormOptions.defaultValues;
  }, [useFormOptions.defaultValues, fields, restoreOnMount]);

  // 2. INICIALIZACIÓN DE USEFORM INTERNA
  // Inicializamos useForm aquí mismo con los valores ya combinados
  const methods = useForm<T>({
    ...useFormOptions,
    defaultValues: combinedDefaultValues,
  });

  const { 
    handleSubmit: originalHandleSubmit, 
    watch, 
    getValues, 
  } = methods;

  const isRestoring = useRef(false);

  // Guardar datos en el store
  const saveCurrentFields = useCallback(async (data?: T) => {
    try {
      if (isRestoring.current) return;
      const fieldsToSave = data || getValues();
      await addFields(fieldsToSave);
    } catch (error) {
      console.error('Error saving fields to store:', error);
    }
  }, [addFields, getValues]);

  // Custom handleSubmit
  const customHandleSubmit: UseFormHandleSubmit<T> = (
    onValid: SubmitHandler<T>, 
    onInvalid?: (errors: any, event?: React.BaseSyntheticEvent) => any
  ) => {
    return originalHandleSubmit(
      async (data, event) => {
        try {
          await saveCurrentFields(data);
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

  // 3. AUTO-SAVE
  useEffect(() => {
    if (!autoSave) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    
    const subscription = watch((data) => {
      // Si estamos restaurando programáticamente, ignorar
      if (isRestoring.current) return;
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        try {
          // data puede ser parcial, así que aseguramos el tipado
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

  // Limpiar datos persistidos
  const clearPersistedData = useCallback(async () => {
    try {
      resetFields(); // Limpia el store
      // Opcional: Resetear el formulario a sus valores por defecto originales (sin persistencia)
      // reset(useFormOptions.defaultValues as DefaultValues<T>); 
      return true;
    } catch (error) {
      console.error('Error clearing persisted data:', error);
      return false;
    }
  }, [resetFields]); //, reset, useFormOptions.defaultValues

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

  // Devolvemos methods (...methods) para que funcione igual que useForm normal
  // pero sobreescribimos handleSubmit y añadimos nuestras utilidades
  return {
    ...methods,
    handleSubmit: customHandleSubmit,
    clearPersistedData,
    manualSave,
    hasPersistedData: Object.keys(fields).length > 0,
    persistedData: fields,
    originalHandleSubmit, // Por si acaso se necesita el original
  };
}
