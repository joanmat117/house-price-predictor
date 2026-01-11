import { NumberInput } from "@/shared/components/NumberInput";
import type { ComponentProps } from "react";
import { useController } from "react-hook-form";

interface Props extends ComponentProps<typeof NumberInput>{
  control:any,
  name:string
}

export function NumberInputControlled({control,name}:Props){

  const {field:{value,onChange}} = useController({control,name})

  return <>
  <NumberInput
  value={value}
  onValueChange={(val:string)=>onChange(val)}
  />
  </>
}
