import { useEffect, useState } from "react";
import { useAuthentication } from "./useAuthentication";
import type { PredictionData } from "../types/PredictionSchema";
import { generatePrediction } from "../services/generatePrediction";
import { useTranslations } from "./useTranslations";

export function usePrediction(fields:PredictionData){
  const [isLoading,setIsLoading] = useState(false)
  const [data,setData] = useState<any|null|undefined>(null)
  const [error,setError] = useState<string|null|undefined>(null)
  const [isLatest,setIsLatest] = useState(false)
  const [statusCode,setStatusCode] = useState<number|null>(null)

  const {getAuthToken} = useAuthentication()

  const t = useTranslations()
  
  const fetchPrediction = async()=>{
    try {
      console.info('Fields sent for prediction: ',fields)
      setIsLoading(true)
      setData(null)
      setError(null)
      setStatusCode(null)
      if(JSON.stringify(fields) == '{}') {
        console.log(localStorage.getItem('LATEST_PREDICTION'))
        setData(localStorage.getItem('LATEST_PREDICTION'))
        setIsLatest(true)
        return
      }
      const {data:prediction,statusCode} = await generatePrediction(fields,getAuthToken() as string)
      if(prediction.detail){
        setError(prediction.detail)
        setStatusCode(statusCode)
      } else {
        setData(prediction)
        localStorage.setItem('LATEST_PREDICTION',prediction)
      }
    } catch(e){
      console.log('Error generating prediction',e)
      setError(t.results.errors.unknown.title)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    fetchPrediction()
  },[])


  return {isLoading,isLatest,data,statusCode,error,fetchPrediction}
}
