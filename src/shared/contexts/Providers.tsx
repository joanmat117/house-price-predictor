import type { ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./ThemeProvider"

interface Props {
  children?:ReactNode
}

export function Providers({children}:Props){
  return <>
  <BrowserRouter>
  <ThemeProvider>
    {children}
  </ThemeProvider>
  </BrowserRouter>
  </>
}
