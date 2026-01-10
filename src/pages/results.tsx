import { ReturnToHomeButton } from "@/shared/components/ReturnToHomeButton"
import { Button } from "@/shared/components/ui/button"
import { useFormFieldsStore } from "@/shared/hooks/useFormFieldsStore"
import { usePrediction } from "@/shared/hooks/usePrediction"
import type { PredictionData } from "@/shared/types/PredictionSchema"
import { formatCOP } from "@/shared/utils/formatCOP"
import { LoaderIcon } from "lucide-react"
import { useEffect } from "react"

export default function Results(){

  const {fields,resetFields} = useFormFieldsStore()

  const {isLoading,isLatest,data,error,fetchPrediction} = usePrediction(fields as PredictionData)
  
 /* 
  const isLoading = false
  const data = ''
  const error = 'Error no se pudo cargar'
  
*/
  useEffect(()=>{
  if(!isLoading && data && !error){
      console.log('Se reseteo los fields')
      resetFields()
    }
  },[data])

  return <section className="flex-1 px-4">
    <ReturnToHomeButton/>
    <h1 className="text-center text-2xl font-bold my-3">
      Resultados de la prediccion
    </h1>

    <div className={`${isLoading?'animate-pulse':''} mx-auto ${error? 'bg-red-500':'bg-green-500'} font-black text-white/90 flex flex-col items-center justify-center  rounded-xl p-4 `}>
    {data && !isLoading &&<>
      {isLatest &&
        <span>
      {'Prediccion mas reciente'}
    </span>}
    <p className="text-lg">
    {formatCOP(data)}
    </p>
    </>
    }
    {isLoading && <LoaderIcon className="animate-spin size-8"/>
    }
    {
      error && <article className="flex flex-col items-center justify-center gap-1">
          <p className="text-center">
            {error}
          </p>
          <Button
            variant={'outline'}
            size='sm'
            className='bg-transparent'
            onClick={()=>fetchPrediction()}
          >
            Reintentar
          </Button>
        </article>
    }
    </div>
  </section>
}
