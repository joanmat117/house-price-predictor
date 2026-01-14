import { BoxRadioInput } from "@/shared/components/BoxRadioInput";
import type { ComponentProps } from "react";
import { useController } from "react-hook-form";

interface Props extends Omit<ComponentProps<typeof BoxRadioInput>,'items'|'value'|'onValueChange'> {
  name:string,
  control:any,
  optionsTranslation?:Record<string,string>,
  options:Array<string|number>,
  valueType?: 'string' | 'boolean'|'number',
  onValueChange?:(value:string)=>void
}

export function BoxRadioInputControlled({name,onValueChange,control,options,optionsTranslation,valueType = 'string',...restProps}:Props){

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
    } else if (valueType === 'number') {
      onChange(+stringValue)
    } else {
        onChange(stringValue)
    }
    if(onValueChange)onValueChange(stringValue)
  }}
  value={value !== undefined ? String(value) : undefined}
  optionsTranslation={optionsTranslation}
  items={options}
  labelClassName={``}
  {...restProps}
  />
}
