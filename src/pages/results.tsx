import { Loader } from "@/shared/components/icons/Loader"
import { Whatsapp } from "@/shared/components/icons/WhatsApp"
import { ReturnToHomeButton } from "@/shared/components/ReturnToHomeButton"
import { Button } from "@/shared/components/ui/button"
import { useFormFieldsStore } from "@/shared/hooks/useFormFieldsStore"
import { usePrediction } from "@/shared/hooks/usePrediction"
import { useTranslations } from "@/shared/hooks/useTranslations"
import { useLanguage } from "@/shared/hooks/useLanguage"
import type { PredictionData } from "@/shared/types/PredictionSchema"
import { formatCOP } from "@/shared/utils/formatCOP"
import { useEffect } from "react"
import quotaExceedSvg from "@/assets/illustrations/season_change.svg"
import invalidCredentialsSvg from "@/assets/illustrations/void.svg"
import predictionSuccessSvg from "@/assets/illustrations/analytics.svg"
import { usePersistedLocation } from "@/shared/hooks/usePersistedLocation"

export default function Results(){
  
  const t = useTranslations()
  const {language} = useLanguage()

  const {fields,resetFields} = useFormFieldsStore()

  const {isLoading,statusCode,isLatest,data,error,fetchPrediction} = usePrediction(fields as PredictionData)
  const {deleteLocation} = usePersistedLocation()
  
  /*
  const isLoading = false
  const data = null
  const error = 'error'
  const statusCode:number|null = 401
  const isLatest = true
  */

  useEffect(()=>{
  if(!isLoading && data && !error){
      console.log('Se reseteo los fields')
      resetFields()
      deleteLocation()
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
        <p className="text-4xl text-green-600 dark:text-green-500  text-shadow-lg text-shadow-green-400/20 font-bold">
          {formatCOP(+data)}
        </p>
        {isLatest &&
          <span className="border px-2 py-2/3 border-border rounded-full text-xs font-medium">
            {t.results.latest}
          </span>
        }
      <img
      src={predictionSuccessSvg}
      alt="house for sale image"
      className="w-full object-contain opacity-80 mt-5 h-[200px] max-w-xl"
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
          <img
            src={
              (()=>{
                if(statusCode === 429) return quotaExceedSvg
                if(statusCode === 401) return invalidCredentialsSvg
              })()
            }
            alt="decorative image"
            className="w-full object-contain opacity-80 h-[200px] max-w-xl"
          />
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
          <a href={`https://wa.me/573126561205?text=${language === 'en' ? 'Hello%2C%20I%20ran%20out%20of%20predictions%2C%20I%27m%20going%20to%20share%20my%20email%20and%20phone%20number%20so%20you%20can%20locate%20my%20account%20and%20increase%20my%20limit%2C%20thank%20you%21' : 'Hola%2C%20me%20qued%C3%A9%20sin%20predicciones%2C%20te%20voy%20a%20pasar%20mi%20email%20y%20tel%C3%A9fono%20para%20que%20ubiques%20mi%20cuenta%20y%20aumentes%20mi%20l%C3%ADmite%2C%20gracias%21'}`} target='_blank' rel='noopener noreferrer'>
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
