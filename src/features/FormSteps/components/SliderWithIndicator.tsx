import { cn } from "@/lib/utils"
import { NumberSlider } from "@/shared/components/Slider"
import type { ComponentProps } from "react"
import { useController } from "react-hook-form"

interface Props extends ComponentProps<typeof NumberSlider> {
  initialValue?:number,
  control:any,
  name:string
}

export function SliderWithIndicator({control,name,initialValue,step, ...props }: Props) {

  const {
  field:{value,onChange}
  } = useController({
    control,
    name
  })

  return <article className="flex gap-3 justify-center items-center w-full max-w-[400px]">
    <NumberSlider
      defaultValue={initialValue ? [initialValue] : undefined}
      step={step}
      className={cn("w-full", 'cursor-pointer')}
      value={[value]}
      onValueChange={(value)=>onChange(value[0])}
      selectorClassName="p-2 w-10 dark:bg-background"
      {...props}
    />
    <span className="font-extrabold text-md border border-border  px-4 flex items-center justify-center rounded-full">
      {value}
    </span>
  </article>
}
