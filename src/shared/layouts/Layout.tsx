import { Header } from "@/features/Header";
import { Outlet } from "react-router-dom";

export default function Layout(){
  return <>
  <Header/>
  <div className="mx-auto flex flex-col justify-start min-h-dvh max-w-[900px]">
  <div id='header-space' className=" h-14"></div>
  <Outlet/>
  </div>
  </>
}
