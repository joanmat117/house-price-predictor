import { Outlet } from "react-router-dom";

export function Layout(){
  return <>
  <div className="mx-auto min-h-dvh max-w-[800px]">
  <Outlet/>
  </div>
  </>
}
