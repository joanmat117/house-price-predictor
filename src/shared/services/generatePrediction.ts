import type { PredictionData } from "../types/PredictionSchema";

export async function generatePrediction(fields:PredictionData,authToken:string){
    const res = await fetch(`/api/predict?token=${authToken}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(fields)
    })

    const data = await res.json()

    console.log('Response prediction: ',data)

    if(typeof data !== 'string') throw new Error('Unexpected response')

    return data as any

}
