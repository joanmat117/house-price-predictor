import { BoxRadioInput } from "@/shared/components/BoxRadioInput";
import { useController } from "react-hook-form";

interface Props {
  name:string,
  control:any,
  optionsTranslation:Record<string,string>,
  options:string[]
}

export function BoxRadioInputControlled({name,control,options,optionsTranslation}:Props){
  
  const {
    field:{value,onChange}
  } = useController({
    name,
    control
  })

  return <BoxRadioInput
  onValueChange={(value)=>onChange(value)}
  value={value}
  optionsTranslation={optionsTranslation}
  items={options}
  labelClassName=""
  containerClassName=""
  />
}
