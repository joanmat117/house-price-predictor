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

  const {
    field:{value,onChange}
  } = useController({
    name,
    control
  })

  return <BoxRadioInput
  onValueChange={(stringValue)=>{
    if (valueType === 'boolean') {
      onChange(stringValue === 'true')
    } else {
      onChange(stringValue)
    }
  }}
  value={value !== undefined ? String(value) : undefined}
  optionsTranslation={optionsTranslation}
  items={options}
  labelClassName=""
  containerClassName=""
  />
}
