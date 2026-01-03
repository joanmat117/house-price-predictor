import { Suspense,lazy } from "react";
import {Routes,Route} from 'react-router-dom'

const Index = lazy(()=>import('./../../pages/index'))
const About = lazy(()=>import('./../../pages/about'))

export function AppRouter(){
  return <>
  <Suspense fallback={<p>Cargando...</p>}>
    <Routes>
      <Route
      path="/"
      element={<Index/>}
      />
      <Route
      path='/about'
      element={<About/>}
      />
    </Routes>
  </Suspense>
  </>
}
