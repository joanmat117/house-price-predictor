import { Loader } from "@/shared/components/icons/Loader"
import { Whatsapp } from "@/shared/components/icons/WhatsApp"
import { ReturnToHomeButton } from "@/shared/components/ReturnToHomeButton"
import { Button } from "@/shared/components/ui/button"
import { useFormFieldsStore } from "@/shared/hooks/useFormFieldsStore"
import { usePrediction } from "@/shared/hooks/usePrediction"
import { useTranslations } from "@/shared/hooks/useTranslations"
import type { PredictionData } from "@/shared/types/PredictionSchema"
import { formatCOP } from "@/shared/utils/formatCOP"
import { useEffect } from "react"

export default function Results(){
  
  const t = useTranslations()

  const {fields,resetFields} = useFormFieldsStore()

  const {isLoading,statusCode,isLatest,data,error,fetchPrediction} = usePrediction(fields as PredictionData)
  
  /*
  const isLoading = false
  const data = null
  const error = 'Error desconocido'
  const statusCode:number|null = null 
  const isLatest = true
  */

  useEffect(()=>{
  if(!isLoading && data && !error){
      console.log('Se reseteo los fields')
      resetFields()
    }
  },[data])

  return <section className="flex-1 flex flex-col px-4">
    <ReturnToHomeButton/>
    <h1 className=" text-center text-2xl font-bold my-3">
    {t.results.title}
    </h1>

    <section className="flex-1 flex flex-col justify-center">
    {/* When Data */}
    {data && !isLoading && !error &&
      <article className="flex flex-col items-center gap-1">
        {isLatest &&
          <span className="text-muted-foreground text-sm font-semibold">
            {t.results.latest}
          </span>
        }
        <p className="text-4xl text-green-600 dark:text-green-500  text-shadow-lg text-shadow-green-400/20 pb-5 pt-3 font-bold">
          {formatCOP(+data)}
        </p>
      <img
      src='/analytics.svg'
      alt="house for sale image"
      className="w-full object-contain opacity-80 h-[200px] max-w-xl"
      />
      </article>
    }

    
    {/*When is Loading*/}
    {isLoading && !error && !data   && 
      <article className="flex flex-col gap-5 items-center justify-center">
        <h2 className="font-semibold animate-pulse text-xl text-center">
          {t.results.onLoading + '...'}
        </h2>
        <Loader className="text-green-500 size-15"/>
      </article>
    }

    {/*When there is an error*/}
    {error && 
      <>
        <article className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-center text-xl font-semibold py-2">
            {
              (()=>{
                if(statusCode === 429) return t.results.errors.quotaExceed.title
                if(statusCode === 401) return t.results.errors.invalidCredentials.title
                return error
              })()
            }
          </h2>
          {statusCode === 429 && 
          <a href='#'>
            <Button
          className="rounded-full flex gap-2 items-center justify-center"
          >
            <Whatsapp className='size-5'/>
            {t.results.errors.quotaExceed.contact}
          </Button>
          </a>
          }
          {statusCode !== 429 && statusCode !== 401 &&
            <Button
            size='sm'
            className='rounded-full'
            onClick={()=>fetchPrediction()}
          >
            Reintentar
          </Button> 
          }
        </article>
      </>
    }
    </section>
  </section>
}
