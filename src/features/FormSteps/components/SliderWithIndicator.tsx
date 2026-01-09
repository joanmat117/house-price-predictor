import { cn } from "@/lib/utils"
import { Slider } from "@/shared/components/ui/slider"
import type { ComponentProps } from "react"

interface Props extends ComponentProps<typeof Slider> {
  maxValue:number,
  initialValue?:number,
}

export function SliderWithIndicator({ className,maxValue,initialValue,step, ...props }: Props) {
  return (
    <Slider
      defaultValue={initialValue ? [initialValue] : undefined}
      max={maxValue}
      step={step}
      className={cn("w-[60%]", className)}

      {...props}
    />
  )
}
