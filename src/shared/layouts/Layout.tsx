import { Header } from "@/features/Header";
import { Outlet } from "react-router-dom";

export default function Layout({limits = true,noHeaderSpace = false}:{limits?:boolean,noHeaderSpace?:boolean}){
  return <>
  <Header/>
  <div className={`mx-auto flex flex-col justify-start min-h-dvh ${limits? 'max-w-[900px]' : ''}`}>
  <div id='header-space' className={`${noHeaderSpace ? '':'h-14'}`}></div>
  <Outlet/>
  </div>
  </>
}
