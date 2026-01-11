import { cn } from "@/lib/utils"
import { Slider } from "@/shared/components/ui/slider"
import type { ComponentProps } from "react"

interface SliderProps extends ComponentProps<typeof Slider> {
}

export function NumberSlider({ className,step, ...props }: SliderProps) {
  return (
    <Slider
      step={step}
      className={cn("w-[60%]", className)}
      {...props}
    />
  )
}
