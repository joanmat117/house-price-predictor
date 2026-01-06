import type { HTMLProps, ReactNode } from "react"

interface Props extends HTMLProps<HTMLParagraphElement> {
  children:ReactNode,
  labelHeading:ReactNode,
  error:string
}

export function InputWrapper({labelHeading,error,children,...headingProps}:Props){
  return <>
  <label className="flex flex-col gap-1">
  <p {...headingProps}>{labelHeading}</p>
  {children}
  <span className="text-destructive text-sm border border-destructive">{error}</span>
  </label>
  </>
}
