import { NumberInput } from "@/shared/components/NumberInput";
import type { ComponentProps } from "react";
import { useController } from "react-hook-form";

interface Props extends ComponentProps<typeof NumberInput> {
  name:string,
  control:any
}

export function NumberInputControlled({name,control,...restProps}:Props){

  const {field:{value,onChange}} = useController({name,control})

  return <NumberInput
    value={value}
    onValueChange={(value)=>onChange(value)}
    {...restProps}
  />
}
