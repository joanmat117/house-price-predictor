import { useEffect, useState } from "react";
import { useAuthentication } from "./useAuthentication";
import type { PredictionData } from "../types/PredictionSchema";
import { generatePrediction } from "../services/generatePrediction";

export function usePrediction(fields:PredictionData){
  const [isLoading,setIsLoading] = useState(false)
  const [data,setData] = useState<any|null|undefined>(null)
  const [error,setError] = useState<string|null|undefined>(null)
  const [isLatest,setIsLatest] = useState(false)

  const {authToken} = useAuthentication()
  
  const fetchPrediction = async()=>{
    try {
      console.log('Fieldsss: ',fields)
      setIsLoading(true)
      setData(null)
      setError(null)
      if(JSON.stringify(fields) == '{}') {
        console.log(localStorage.getItem('LATEST_PREDICTION'))
        setData(localStorage.getItem('LATEST_PREDICTION'))
        setIsLatest(true)
        console.log('Llego aqui')
        return
      }
      const prediction = await generatePrediction(fields,authToken as string)
      setData(prediction)
      localStorage.setItem('LATEST_PREDICTION',prediction)
    } catch(e){
      console.log('Error generating prediction',e)
      setError('Error generating prediction')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    fetchPrediction()
  },[])


  return {isLoading,isLatest,data,error,fetchPrediction}
}
