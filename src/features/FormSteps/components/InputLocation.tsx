import { useSearchLocation } from "@/shared/hooks/useSearchLocation";
import { Input } from "@/shared/components/ui/input";
import { useState, useEffect, type ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";
import { Loader } from "@/shared/components/icons/Loader";
import { AlertCircle,LucideX, MapPinCheckInside, Search } from "lucide-react";
import type { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { InputWrapper } from "./InputWrapper";
import { useTranslations } from "@/shared/hooks/useTranslations";
import { Combobox } from "@/shared/components/Combobox";
import { CITIES, TYPE_WAY } from "@/config";
import { ComboboxControlled } from "./ComboboxControlled";

interface Props {
  setValue: UseFormSetValue<any>;
  city?: string;
  control:Control<any,any,any>,
  errors:FieldErrors<any>
}

type TypeWayEnumKeys = 'calle'|'carrera'|'avenida'|'diagonal'|'transversal'

export function InputLocation({ setValue,errors,control, city }: Props) {
  const t = useTranslations();
  const { fetchLocationStructured,data, error, isLoading } = useSearchLocation();

  const [typeWay, setTypeWay] = useState("");
  const [town, setTown] = useState("");
  const [number1, setNumber1] = useState("");
  const [block1, setBlock1] = useState("");
  const [block2, setBlock2] = useState("");

  useEffect(() => {
      if(data && !isLoading){
      setValue("longitude", data?.longitude, { shouldValidate: true });
      setValue("latitude", data?.latitude, { shouldValidate: true });
      }
  }, [data, setValue]);

  const handleSearch = () => {
    if (!city || !typeWay || !town || !number1) return;

    fetchLocationStructured({
      typeWay,
      town,
      number1,
      block1: block1.trim() || undefined,
      block2: block2.trim() || undefined,
      city,
    });
  };

  const canSearch = !!city && !!typeWay && town.trim() && number1.trim();

  return (
    <section className="space-y-4 mb-3 animate-fade-in">
      <div className="grid items-end grid-cols-2 gap-2">
      {/*City*/}
      <InputWrapper
      labelHeading={t.form.city.label}
      error={errors.city?.message}
      >
        
        <ComboboxControlled
        name="city"
        control={control}
        options={CITIES}
        notFound={t.form.city.notFound}
        label={t.form.city.label}
        />
      </InputWrapper>

      {/* Tipo de vía */}
      <InputWrapper labelHeading={t.form.typeWay.label}>
        <Combobox
          onValueChange={(value) => setTypeWay(value)}
          label={t.form.typeWay.label}
          value={typeWay}
          options={TYPE_WAY}
          optionsTranslation={t.enums.typeWay}
        />
      </InputWrapper>
      </div>

      {/* Nombre de vía */}
      {typeWay && <>
        <InputWrapper 
          labelHeading={t.form.town.label.replace(
          '?',
          t.enums.typeWay[typeWay as TypeWayEnumKeys].toLowerCase()
        )}>
        <Input
          value={town}
          onChange={(e) => setTown(e.target.value)}
          placeholder={t.form.town.placeholder}
        />
      </InputWrapper>

      {/* Nº principal y secundarios */}
      <div className="flex animate-fade-in items-center gap-2">
          <Input
            value={number1}
            onChange={(e) => setNumber1(e.target.value)}
            placeholder={t.form.number1.placeholder}
            className="text-center"
          />
        <AddressSeparator>#</AddressSeparator>
          <Input
            value={block1}
            onChange={(e) => setBlock1(e.target.value)}
            placeholder={t.form.block1.placeholder}
            className='text-center'
          />
        <AddressSeparator>-</AddressSeparator>
          <Input
            value={block2}
            onChange={(e) => setBlock2(e.target.value)}
            placeholder={t.form.block2.placeholder}
            className="text-center"
          />
      </div>

      <Button disabled={isLoading || !canSearch} onClick={handleSearch}
      className="w-full flex items-center gap-2 flex-wrap h-fit"
      >
        {isLoading ? (
          <Loader className="size-5" />
        ) : (
          <>
            <Search className="size-5" />
            {t.buttons.searchLocation}
          </>
        )}
      </Button>

      </>}

      {/* Resultado */}
      {data && !isLoading && (
        <div className="flex relative flex-col gap-3 p-3 bg-green-500/10 rounded-md border">
          <div className="felx gap-1">
            <MapPinCheckInside className="size-5 text-green-600" />
            <Button variant='ghost' size={'icon-sm'} 
              className="hidden absolute rounded-full bg-transparent! right-1 top-0 m-1"
            >
              <LucideX/>
            </Button>
          </div>
          <p className="font-medium text-green-600 flex-1">{data.name}</p>
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-md border">
          <AlertCircle className="size-5 text-red-600" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </section>
  );
}


function AddressSeparator({children}:{children:ReactNode}){
  return <span className="flex items-center font-bold justify-center"
  >{children}</span>
}
