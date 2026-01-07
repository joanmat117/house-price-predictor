import { useEffect } from 'react';
import { type UseFormWatch, type UseFormReset } from 'react-hook-form';

type FormValues = Record<string, any>;

interface UseFormPersistProps<T extends FormValues> {
  watch: UseFormWatch<T>;
  reset: UseFormReset<T>;
}

export function useFormPersist<T extends FormValues>(
  storageKey: string,
  { watch, reset }: UseFormPersistProps<T>
) {
  
  useEffect(() => {
    
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        const data = JSON.parse(savedData) as T
        reset(data);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
        localStorage.removeItem(storageKey); // Clean corrupt data
      }
    }
  }, [storageKey, reset]);

  useEffect(() => {
    const subscription = watch((data) => {
      if (data) {
        localStorage.setItem(storageKey, JSON.stringify(data));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, storageKey]);

}