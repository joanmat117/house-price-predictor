import type { ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./ThemeProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface Props {
  children?:ReactNode
}

const client = new QueryClient()

export function Providers({children}:Props){
  return <>
  <QueryClientProvider client={client}>
  <BrowserRouter>
  <ThemeProvider>
    {children}
  </ThemeProvider>
  </BrowserRouter>
  </QueryClientProvider>
  </>
}
