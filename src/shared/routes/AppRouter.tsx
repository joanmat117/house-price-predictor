import { Suspense,lazy } from "react";
import {Routes,Route} from 'react-router-dom'

const Index = lazy(()=>import('@/pages/index'))
const Predict = lazy(()=>import('@/pages/predict'))
const NotFound = lazy(()=>import('@/pages/notFound'))
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
        path="/predict"
        element={<Predict/>}
        />
        <Route
        path="*"
        element={<NotFound/>}
        />

      </Route>
    </Routes>

  </Suspense>
  </>
}
