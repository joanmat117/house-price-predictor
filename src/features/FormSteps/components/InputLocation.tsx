import { useSearchLocation } from "@/shared/hooks/useSearchLocation";
import { Input } from "@/shared/components/ui/input";
import { useEffect, useState} from "react";
import { Button } from "@/shared/components/ui/button";
import { Loader } from "@/shared/components/icons/Loader";
import { AlertCircle, MapPinCheckInside, Search } from "lucide-react";
import type { UseFormSetValue } from "react-hook-form";
import { findCityOnText } from "@/shared/utils/findCityOnText";

interface Props {
  setValue:UseFormSetValue<any>,
  cityError?:any|undefined
}

export function InputLocation({setValue,cityError}:Props){

  const [query, setQuery] = useState('')
  
  //const t = useTranslations()

  const {fetchLocation,data,error,isLoading} = useSearchLocation()

  useEffect(()=>{
    if(data && !isLoading){
      const city = findCityOnText(data.name)
      setValue('city',city,{shouldValidate:true})
      setValue('longitude',data.longitude,{shouldValidate:true})
      setValue('latitude',data.latitude,{shouldValidate:true})
      localStorage.setItem('LOCATION_DATA',JSON.stringify(data))
    }
  },[data])


  const handleClick = ()=>{
    if(query.length < 4) return
    fetchLocation(query + " colombia ")
  }

  return <article className={`overflow-hidden rounded-xl 
${data && !isLoading && !cityError && 'bg-green-500/10'}
${error || cityError && `bg-red-500/10`}
`}>
  <div className="flex">
    <Input
    value={query}
    placeholder="Guayabal Medellin..."
    onChange={(e)=>{setQuery(e.currentTarget.value)}}
    className="rounded-r-none bg-background rounded-l-xl py-5"
    />
    <Button disabled={isLoading} onClick={handleClick} className="rounded-l-none py-5 rounded-r-xl">
        {isLoading?
        <Loader className="size-6"/>:
        <Search className="size-6" />
        }
    </Button>
  </div>
  {data && !isLoading && !cityError &&
  <span className="flex items-center rounded-md  px-2 py-1 w-fit gap-1 mt-1 text-green-600">
        <MapPinCheckInside className="size-4"/>
        <p className='flex-1'>
          {data.name}
        </p>
  </span>
  }
  {(error || cityError) && !isLoading && <span className='flex items-center rounded-md px-2 py-1 w-fit gap-1 mt-1 text-red-500'>
      <AlertCircle className="size-4"/>
      <p className='flex-1'>{error || cityError}</p>
  </span>}
 </article>

 }
