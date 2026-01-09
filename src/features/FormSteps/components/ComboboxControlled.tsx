import { Combobox } from "@/shared/components/Combobox";
import { useController } from "react-hook-form";

interface Props {
  label:string,
  notFound:string,
  optionsTranslation?:Record<string,string>,
  options:string[],
  name:string,
  control:any
}

export function ComboboxControlled({label,optionsTranslation,notFound,options,name,control}:Props){
 
  const {
    field:{onChange,value},
  } = useController({
    name,
    control
  })


  return <Combobox
    label={label}
    notFound={notFound}
    optionsTranslation={optionsTranslation}
    options={options}
    value={value}
    onValueChange={(currentValue)=>{onChange(currentValue)}}
  />
}
