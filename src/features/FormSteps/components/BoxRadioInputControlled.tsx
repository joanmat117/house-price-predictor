import { BoxRadioInput } from "@/shared/components/BoxRadioInput";
import { useController } from "react-hook-form";

interface Props {
  name:string,
  control:any,
  optionsTranslation?:Record<string,string>,
  options:Array<string|number>,
  valueType?: 'string' | 'boolean',
  containsText?:boolean
}

export function BoxRadioInputControlled({name,control,containsText = true,options,optionsTranslation,valueType = 'string'}:Props){

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
  labelClassName={`transition-all active:scale-95 ${containsText ? 'flex-1 max-w-[300px] min-w-[120px]' : ' min-w-10 rounded-full!'}`}
  containerClassName=""
  />
}
