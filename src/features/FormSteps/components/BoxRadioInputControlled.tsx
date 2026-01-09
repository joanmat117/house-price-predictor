/**
 * Controlled Radio Input Component with Type Conversion
 *
 * A wrapper around BoxRadioInput that integrates with React Hook Form's
 * useController hook for form state management. Supports both string and
 * boolean value types for backend compatibility.
 *
 * Key Features:
 * - Controlled component using React Hook Form
 * - Type conversion between string UI values and boolean backend values
 * - Translation support for option labels
 * - Consistent styling with the design system
 *
 * Props:
 * - name: Field name for form registration
 * - control: React Hook Form control object
 * - options: Array of option values (strings)
 * - optionsTranslation: Translation mapping for option labels
 * - valueType: 'string' (default) or 'boolean' for type conversion
 *
 * Usage:
 * For boolean fields: valueType="boolean", options=["true", "false"]
 * For string enums: valueType="string" (default), options=["option1", "option2"]
 */
import { BoxRadioInput } from "@/shared/components/BoxRadioInput";
import { useController } from "react-hook-form";

interface Props {
  name:string,
  control:any,
  optionsTranslation:Record<string,string>,
  options:string[],
  valueType?: 'string' | 'boolean'
}

export function BoxRadioInputControlled({name,control,options,optionsTranslation,valueType = 'string'}:Props){

  // Use React Hook Form's useController for controlled component behavior
  // This provides field value, onChange handler, and form integration
  const {
    field:{value,onChange}
  } = useController({
    name,
    control
  })

  return <BoxRadioInput
    // Handle value changes with optional type conversion
    onValueChange={(stringValue)=>{
      if (valueType === 'boolean') {
        // Convert string "true"/"false" to actual boolean for backend
        onChange(stringValue === 'true')
      } else {
        // Keep as string for enum values
        onChange(stringValue)
      }
    }}
    // Convert boolean values back to strings for UI display
    value={value !== undefined ? String(value) : undefined}
    optionsTranslation={optionsTranslation}
    items={options}
    labelClassName=""
    containerClassName=""
  />
}
