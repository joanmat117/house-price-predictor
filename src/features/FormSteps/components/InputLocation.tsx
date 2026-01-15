import { useSearchLocation } from "@/shared/hooks/useSearchLocation";
import { Input } from "@/shared/components/ui/input";
import { useEffect, useState} from "react";
import { Button } from "@/shared/components/ui/button";
import { Loader } from "@/shared/components/icons/Loader";
import { AlertCircle, MapPinCheckInside, Search } from "lucide-react";
import type { UseFormSetValue } from "react-hook-form";

interface Props {
  setValue:UseFormSetValue<any>,
  country?:string,
  city?:string
}

export function InputLocation({setValue,country = 'Colombia',city}:Props){

  const [query, setQuery] = useState('')
  
  //const t = useTranslations()

  const {fetchLocation,data,error,isLoading} = useSearchLocation()

  useEffect(()=>{
    if(data && !isLoading){
      setValue('longitude',data.longitude,{shouldValidate:true})
      setValue('latitude',data.latitude,{shouldValidate:true})
      localStorage.setItem('LOCATION_DATA',JSON.stringify(data))
    }
  },[data])


  const handleClick = ()=>{
    if(query.length < 4) return
    if(!city) return setValue('city',undefined,{shouldValidate:true})
    fetchLocation(`${query} ${city} ${country}`)
  }

  return <article className={` rounded-xl 
${data && !isLoading && 'bg-green-500/10'}
${error  && `bg-red-500/10`}
`}>
  <div className="flex">
    <Input
    value={query}
    placeholder="Carrera 52 Guayabal..."
    onChange={(e)=>{setQuery(e.currentTarget.value)}}
    className="rounded-r-none bg-background py-5"
    />
    <Button disabled={isLoading} onClick={handleClick} className="rounded-l-none py-5 ">
        {isLoading?
        <Loader className="size-6"/>:
        <Search className="size-6" />
        }
    </Button>
  </div>
  {data && !isLoading  &&
  <span className="flex items-center rounded-md  px-2 py-1 w-fit gap-1 mt-1 text-green-600">
        <MapPinCheckInside className="size-4"/>
        <p className='flex-1'>
          {data.name}
        </p>
  </span>
  }
  {error && !isLoading && <span className='flex items-center rounded-md px-2 py-1 w-fit gap-1 mt-1 text-red-500 dark:text-red-400'>
      <AlertCircle className="size-4"/>
      <p className='flex-1'>{error }</p>
  </span>}
 </article>

 }
