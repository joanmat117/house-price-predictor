import {create} from 'zustand'

interface StepperStoreType {
  currentStep:number,
  goNextStep:()=>void,
  goPrevStep:()=>void,
  goStep:(step:number)=>void,
  maxStep:number
}

export const StepperStore = create<StepperStoreType>((set,get)=>({
  currentStep:1,
  maxStep:8,
  goNextStep:()=>{
    const {maxStep,currentStep} = get()
    
    if(currentStep >= maxStep) return
    
    set(state=>({currentStep:state.currentStep+1}))
  },
  goPrevStep:()=>{

    const {currentStep} = get()

    if(currentStep <= 1) return

    set(state=>({currentStep:state.currentStep-1}))
  },
  goStep:(step)=>{

    const {maxStep} = get()

    if(step < 1 || step > maxStep) return

    set({currentStep:step})
  }
}))
