import { cn } from "@/lib/utils"
import { Slider } from "@/shared/components/ui/slider"
import type { ComponentProps } from "react"

interface SliderProps extends ComponentProps<typeof Slider> {
  maxValue:number,
  initialValue:number,
}

export function NumberSlider({ className,maxValue,initialValue,step, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[initialValue]}
      max={maxValue}
      step={step}
      className={cn("w-[60%]", className)}
      {...props}
    />
  )
}
