import { useSearchLocation } from "@/shared/hooks/useSearchLocation";
import { Input } from "@/shared/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Loader } from "@/shared/components/icons/Loader";
import { AlertCircle, MapPinCheckInside, Search } from "lucide-react";
import type { UseFormSetValue } from "react-hook-form";
import { InputWrapper } from "./InputWrapper";
import { useTranslations } from "@/shared/hooks/useTranslations";

interface Props {
  setValue: UseFormSetValue<any>;
  city?: string;
}

export function InputLocation({ setValue, city }: Props) {
  const [address, setAddress] = useState('');
  const [department, setDepartment] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const t = useTranslations()
  
  const { fetchLocationStructured, data, error, isLoading } = useSearchLocation();

  useEffect(() => {
    if (data && !isLoading) {
      setValue('longitude', data.longitude, { shouldValidate: true });
      setValue('latitude', data.latitude, { shouldValidate: true });
      localStorage.setItem('LOCATION_DATA', JSON.stringify(data));
    }
  }, [data, isLoading, setValue]);

  const handleSearch = () => {
    if (!city || address.trim().length < 3) return;
    
    fetchLocationStructured({
      address: address.trim(),
      city,
      department: department.trim() || undefined,
      postalCode: postalCode.trim() || undefined
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && city && address.trim().length >= 3) {
      handleSearch();
    }
  };

  const canSearch = city && address.trim().length >= 3;

  return (
    <div className="space-y-4 mb-3 animate-fade-in">
      <InputWrapper
      labelHeading={t.form.address.label}
      >
        <Input
          value={address}
          placeholder="Carrera 45 # 20-34, Avenida Las Vegas con Calle 10"
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={handleKeyPress}
          className="mt-1"
        />
      </InputWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWrapper
        labelHeading={t.form.departament.label}
        >
          <Input
            value={department}
            placeholder="Antioquia..."
            onChange={(e) => setDepartment(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mt-1"
          />
        </InputWrapper>
        <InputWrapper
        labelHeading={t.form.postalCode.label}
        >
          <Input
            value={postalCode}
            placeholder="050001..."
            onChange={(e) => setPostalCode(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mt-1"
          />
        </InputWrapper>
      </div>

      <Button
        disabled={isLoading || !canSearch}
        onClick={handleSearch}
        className="w-full flex flex-wrap h-fit"
      >
        {isLoading ? (
          <Loader className="size-5 " />
        ) : (
          <>
            <Search className="size-5 mr-2" />
            {city? t.buttons.searchLocation : t.validations.city.notFoundOnSearch}
          </>
        )}
      </Button>

      {/* Resultado */}
      {data && !isLoading && (
        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-md border">
          <MapPinCheckInside className="size-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-medium">{data.name}</p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/30 rounded-md border">
          <AlertCircle className="size-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

    </div>
  );
}
