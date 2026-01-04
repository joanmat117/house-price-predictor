import { Suspense,lazy } from "react";
import {Routes,Route} from 'react-router-dom'

const Index = lazy(()=>import('./../../pages/index'))
const Page404 = lazy(()=>import('@/shared/components/Page404'))

export function AppRouter(){
  return <>
  <Suspense fallback={<p>Cargando...</p>}>

    <Routes>
      <Route
      path="/"
      element={<Index/>}
      />
      <Route
      path="*"
      element={<Page404/>}
      />
    </Routes>

  </Suspense>
  </>
}
