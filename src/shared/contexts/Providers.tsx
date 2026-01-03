import type { ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"

interface Props {
  children?:ReactNode
}

export function Providers({children}:Props){
  return <>
  <BrowserRouter>
    {children}
  </BrowserRouter>
  </>
}
