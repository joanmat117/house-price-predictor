import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTrigger,
} from '@/shared/components/ui/stepper';
import { useEffect, type ReactNode } from 'react';

interface Props {
  value:number,
  onValueChange:((value: number) => void) | undefined,
  children:ReactNode,
  steps:number[],
  className?:string
}

export default function FormStepper({value,onValueChange,className,children,steps}:Props) {

  useEffect(()=>{
    window.scroll({top:0,behavior:'instant'})
  },[value])

  return (
    <Stepper value={value} onValueChange={onValueChange} className={`space-y-8 ${className}`}>
      <StepperNav>
        {steps.map((step) => (
          <StepperItem key={step} step={step}>
            <StepperTrigger asChild>
              <StepperIndicator className="data-[state=completed]:bg-primary data-[state=completed]:text-primary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-500">
                {step}
              </StepperIndicator>
            </StepperTrigger>
            {steps.length > step && <StepperSeparator className="group-data-[state=completed]/step:bg-primary" />}
          </StepperItem>
        ))}
      </StepperNav>

      {children}
       
    </Stepper>
  );
}
