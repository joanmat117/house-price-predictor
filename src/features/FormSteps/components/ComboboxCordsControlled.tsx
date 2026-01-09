/**
 * Controlled Neighborhood/Coordinates Combobox
 *
 * A specialized combobox that synchronizes neighborhood selection with
 * latitude/longitude coordinates. When a user selects a neighborhood,
 * it automatically updates the corresponding coordinates in the form.
 *
 * Key Features:
 * - City-dependent neighborhood options
 * - Automatic coordinate synchronization
 * - Type-safe city and town key definitions
 * - Fallback handling for invalid cities
 * - Bidirectional sync: coordinates can determine selected neighborhood
 *
 * Data Flow:
 * 1. User selects city (from another field)
 * 2. Component loads neighborhoods for that city
 * 3. User selects neighborhood → coordinates auto-populate
 * 4. If coordinates exist → neighborhood auto-selects
 *
 * Type Definitions:
 * - Cities: Valid city keys from citiesAndTownsCords.json
 * - TownKeys: Neighborhood keys within each city
 * - TownsWithCords: Coordinate data structure
 */
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

  // Watch coordinate fields for bidirectional sync
  const lat = watch?.('latitude');
  const lon = watch?.('longitude');

  // Validate city exists in our data (TypeScript + runtime check)
  const isValidCity = city && city in citiesAndTownsCords;

  // Determine current selected neighborhood based on coordinates
  const getCurrentValue = () => {
    if (!isValidCity) return '';

    // Fallback to first neighborhood if no coordinates
    const fallbackValue = Object.keys(citiesAndTownsCords[city])[0] || '';

    if (!lat || !lon) return fallbackValue;

    // Find neighborhood that matches current coordinates
    const town = Object.entries(citiesAndTownsCords[city]).find(([, cords]: any[]) => {
      return cords.latitude === lat && cords.longitude === lon;
    });

    return town ? town[0] : fallbackValue;
  };

  // Don't render combobox for invalid cities
  if (!isValidCity) {
    return <Combobox
      notFound={notFound}
      label={label}
      options={[]}
      value=""
      onValueChange={() => {}}
    />;
  }

  // Get neighborhood options for selected city
  const options = Object.keys(citiesAndTownsCords[city]);

  return <Combobox
    label={label}
    notFound={notFound}
    options={options}
    value={getCurrentValue()}
    onValueChange={(currentValue)=>{
      // Update coordinates when neighborhood is selected
      const {latitude,longitude} = (citiesAndTownsCords as any)[city][currentValue]
      setValue('latitude',latitude,{shouldValidate:true})
      setValue('longitude',longitude,{shouldValidate:true})
    }}
  />
}
