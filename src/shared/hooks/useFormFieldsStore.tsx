import { FormFieldsStore } from "../contexts/FormFieldsStore";

export function useFormFieldsStore(){
  const store = FormFieldsStore()

  return store
}
