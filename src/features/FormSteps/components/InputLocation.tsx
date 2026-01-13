import { useSearchLocation } from "@/shared/hooks/useSearchLocation";
import { Input } from "@/shared/components/ui/input";
import { useState} from "react";
import { Button } from "@/shared/components/ui/button";
import { Loader } from "@/shared/components/icons/Loader";
import { AlertCircle, MapPinCheckInside, Search } from "lucide-react";


export function InputLocation(){

  const [query, setQuery] = useState('')
  
  //const t = useTranslations()

  const {fetchLocation,data,error,isLoading} = useSearchLocation()


  const handleClick = ()=>{
    if(query.length < 4)
    console.log('Handleclick: ',query)
    fetchLocation(query)
  }

  return <article>
  <div className="flex">
    <Input
    value={query}
    placeholder="Your location..."
    onChange={(e)=>{setQuery(e.currentTarget.value)}}
    className="rounded-r-none"
    />
    <Button onClick={handleClick} className="rounded-l-none">
        {isLoading?
        <Loader/>:
        <Search/>
        }
    </Button>
  </div>
  {data && !isLoading &&
  <span className="flex items-center gap-1 my-2 text-green-600">
        <MapPinCheckInside className="size-4"/>
        <p>
          {data.name}
        </p>
  </span>
  }
  {error && !isLoading && <span className='flex items-center gap-1 my-2 text-red-600'>
      <AlertCircle className="size-4"/>
      <p>{error}</p>
  </span>}
 </article>

 }
