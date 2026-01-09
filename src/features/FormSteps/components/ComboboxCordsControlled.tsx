import { Combobox } from "@/shared/components/Combobox";
import citiesAndTownsCords from '@/shared/data/citiesAndTownsCords.json'
import type {UseFormSetValue, UseFormWatch } from "react-hook-form";

export type CitiesAndTownsCords = typeof citiesAndTownsCords

export type Cities = keyof CitiesAndTownsCords

export type TownKeys = {
  [K in Cities]: keyof CitiesAndTownsCords[K]
}[Cities]

export type TownsWithCords = {
  latitude:number,
  longitude:number
} 

interface Props {
  label:string,
  notFound:string,
  city:Cities|null|undefined,
  setValue:UseFormSetValue<any>,
  watch:UseFormWatch<any>
}

export function ComboboxCordsControlled({label,watch,setValue,city,notFound}:Props){

  
  const lat = watch?.('latitude');
  const lon = watch?.('longitude');

  const getCurrentValue = () => {
    if (!city) return '';
    
    const fallbackValue = Object.keys(citiesAndTownsCords[city])[0] || '';
    
    if (!lat || !lon) return fallbackValue;

    const town = Object.entries(citiesAndTownsCords[city]).find(([, cords]: any[]) => {
      return cords.latitude === lat && cords.longitude === lon;
    });
   
    return town ? town[0] : fallbackValue;
  };

  if (!city) {
    return <Combobox
      notFound={notFound}
      label={label}
      options={[]}
      value=""
      onValueChange={() => {}}
    />;
  }

  const options = Object.keys(citiesAndTownsCords[city]);

  return <Combobox
    label={label}
    notFound={notFound}
    options={options}
    value={getCurrentValue()}
    onValueChange={(currentValue)=>{
      const {latitude,longitude} = (citiesAndTownsCords as any)[city][currentValue]
      setValue('latitude',latitude,{shouldValidate:true})
      setValue('longitude',longitude,{shouldValidate:true})
    }}
  />
}
