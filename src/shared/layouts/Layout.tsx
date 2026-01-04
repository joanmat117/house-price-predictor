import { Outlet } from "react-router-dom";

export default function Layout(){
  return <>
  <div className="mx-auto min-h-dvh max-w-[900px]">
  <Outlet/>
  </div>
  </>
}
