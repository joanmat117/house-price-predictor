import { useMemo, useState, type ComponentProps } from "react";
import { BoxRadioInputControlled } from "./BoxRadioInputControlled";
import { Input } from "@/shared/components/ui/input";
import { capitalize } from "@/shared/utils/capitalize";
import { useController } from "react-hook-form";

interface Props extends Omit<ComponentProps<typeof BoxRadioInputControlled>,'onValueChange'|'valueType'>{
  setValue:any
}

const indexOfLastShowedOption = 4

export function BoxRadioInputExpansible({name,control,setValue,options,...restProps}:Props){

  const {field:{value,onChange}} = useController({name,control})

  const [isOpen,setIsOpen] = useState(false)

  const {slicedOptions,translations} = useMemo(()=>{
    const slicedOptions = options.slice(0,indexOfLastShowedOption+1)
    const translations:Record<string,string> = {}

    slicedOptions.forEach((option,i)=>{
      const stringOption = option.toString()
      if(i === slicedOptions.length-1){
        translations[stringOption] = '+ '+stringOption
      } else {
        translations[stringOption] = capitalize(stringOption)
      }
    })

    return {slicedOptions,translations}

    },[options])

  return <section className="flex flex-col gap-3">
    <BoxRadioInputControlled
    options={slicedOptions}
    valueType="number"
    name={name}
    onLabelClick={(option)=>{
        if(option.toString() === options[indexOfLastShowedOption].toString()){
          setIsOpen(true)
        } else {
          setIsOpen(false)
        }
    }}
    control={control}
    optionsTranslation={translations}
    {...restProps}
    />
    {isOpen && <Input
    className="rounded-full animate-fade-in"
    type="number"
    value={value}
    onChange={(e)=>{
        const value = e.currentTarget.value
        onChange(+value == 0 ? '':+value)
      }}
    />}
  </section>
}
