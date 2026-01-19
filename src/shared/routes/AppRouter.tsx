import { Suspense,lazy } from "react";
import {Routes,Route} from 'react-router-dom'

const Index = lazy(()=>import('@/pages/index'))
const Predict = lazy(()=>import('@/pages/predict'))
const NotFound = lazy(()=>import('@/pages/notFound'))
const GoogleCallback = lazy(()=>import('@/pages/googleCallback'))
const Layout = lazy(()=>import('@/shared/layouts/Layout'))
const Results = lazy(()=>import('@/pages/results'))
const Terms = lazy(()=>import('@/pages/terms'))
const PrivacyTerms = lazy(()=>import('@/pages/privacyTerms'))
const Credits = lazy(()=>import('@/pages/credits'))

export function AppRouter(){
  return <>
  <Suspense >

    <Routes>
      <Route element={<Layout limits={false} />}>

        <Route
        path="/"
        element={<Index/>}
        />
      </Route>

      <Route element={<Layout/>}>

        <Route
          path="/google/callback"
          element={<GoogleCallback/>}
        />
        <Route
        path="/results"
        element={<Results/>}
        />
        <Route
        path="/predict"
        element={<Predict/>}
        />
        <Route
        path="/terms"
        element={<Terms/>}
        />
        <Route
        path="/privacy-terms"
        element={<PrivacyTerms/>}
        />
        <Route
        path="/credits"
        element={<Credits/>}
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
