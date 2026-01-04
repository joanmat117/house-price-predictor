import { Header } from "@/features/Header";
import { Outlet } from "react-router-dom";

export default function Layout(){
  return <>
  <Header/>
  <div className="mx-auto min-h-dvh max-w-[900px]">
  <Outlet/>
  </div>
  </>
}
