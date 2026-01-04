import { Suspense,lazy } from "react";
import {Routes,Route} from 'react-router-dom'

const Index = lazy(()=>import('@/pages/index'))
const Page404 = lazy(()=>import('@/shared/components/Page404'))
const Layout = lazy(()=>import('@/shared/layouts/Layout'))

export function AppRouter(){
  return <>
  <Suspense >

    <Routes>
      <Route element={<Layout/>}>

        <Route
        path="/"
        element={<Index/>}
        />
        <Route
        path="*"
        element={<Page404/>}
        />

      </Route>
    </Routes>

  </Suspense>
  </>
}
