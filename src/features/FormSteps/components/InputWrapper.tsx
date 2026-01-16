import type { HTMLProps, ReactNode } from "react"

interface Props extends HTMLProps<HTMLLabelElement> {
  children?:ReactNode,
  labelHeading?:ReactNode,
  error?:any|undefined,
  className?:string
}

export function InputWrapper({labelHeading,error,className,children,...headingProps}:Props){
  return <>
  <article className="flex flex-col flex-1 gap-1 mt-3">
  {labelHeading && <label {...headingProps} className={`font-bold mb-1 ${className}`}>{labelHeading}</label>}
  {children}
  {error && <span className="text-destructive text-sm ml-2 min-h-5">{error|| ""}</span>}
  </article>
  </>
}
