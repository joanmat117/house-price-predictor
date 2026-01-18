import { useSearchLocation } from "@/shared/hooks/useSearchLocation";
import { Input } from "@/shared/components/ui/input";
import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Loader } from "@/shared/components/icons/Loader";
import { AlertCircle, MapPinCheckInside, Search, Move, MapPinPlus } from "lucide-react";
import type { Control, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { InputWrapper } from "./InputWrapper";
import { useTranslations } from "@/shared/hooks/useTranslations";
import { CITIES } from "@/config";
import { ComboboxControlled } from "./ComboboxControlled";
import { sliceRedundantLocationName } from "@/shared/utils/sliceRedundantLocationName";

interface Props {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  city?: string;
  control:Control<any,any,any>,
  errors:FieldErrors<any>
  setShowMap:(value:boolean)=>void,
  showMap:boolean
}

export function InputLocation({ setValue, watch, errors, setShowMap, showMap, control, city }: Props) {
  const t = useTranslations();
  const { 
    searchNotableLocation, 
    data, 
    alternativeResults,
    selectAlternativeResult,
    error, 
    isLoading 
  } = useSearchLocation();

  const [notableLocation, setNotableLocation] = useState("");
  const [isManualAdjustment, setIsManualAdjustment] = useState(false);

  const latitude = watch('latitude');
  const longitude = watch('longitude');

  useEffect(() => {
    if(data && !isLoading && !isManualAdjustment){
      if (data.latitude !== undefined && data.longitude !== undefined) {
        setValue("longitude", data.longitude, { shouldValidate: true });
        setValue("latitude", data.latitude, { shouldValidate: true });
        setShowMap(true);
      }
    }
  }, [data, setValue, isLoading, isManualAdjustment, setShowMap]);

  const handleSearch = () => {
    if (!city || !notableLocation.trim()) return;
    setIsManualAdjustment(false);
    searchNotableLocation(city, notableLocation);
  };

  const canSearch = !!city && notableLocation.trim().length > 2;

  return (
    <section className="space-y-4 mb-3 animate-fade-in">
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

      {city && (
        <>
          <InputWrapper labelHeading={t.form.notableLocation.label}>
            <Input
              value={notableLocation}
              onChange={(e) => setNotableLocation(e.target.value)}
              placeholder={t.form.notableLocation.placeholder}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canSearch) {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
          </InputWrapper>

          <Button 
            disabled={isLoading || !canSearch} 
            onClick={handleSearch}
            className="w-full flex items-center gap-2"
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
        </>
      )}

      {data && !isLoading && (
        <div className="space-y-2">
          <div className="flex relative gap-3 p-3 bg-green-500/10 rounded-md border">
            <MapPinCheckInside className="size-5 text-green-600 flex-shrink-0" />
            <div className="flex flex-col flex-1 items-start gap-1">
              <p className="font-medium text-green-600 text-sm">
                {t.form.location.locationFound}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2">{data.name}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {!showMap && (
              <Button 
                variant='outline' 
                size={'sm'} 
                onClick={() => setShowMap(true)}
                className="flex-1 flex items-center gap-2"
              >
                <Move className="size-4" />
                {t.buttons.adjustPin}
              </Button>
            )}
          </div>
        </div>
      )}

      {alternativeResults.length > 0 && data && !isLoading && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {alternativeResults.length === 1 
              ? (t.form.location.oneAlternative || 'We found another option:')
              : (t.form.location.multipleAlternatives || 'We found {count} more options:').replace('{count}', alternativeResults.length.toString())}
          </p>
          <div className="max-h-64 flex gap-2 flex-wrap overflow-y-auto">
            {alternativeResults.map((result, index) => (
              <button
                key={index}
                onClick={() => {
                  selectAlternativeResult(index);
                  setIsManualAdjustment(false);
                  // Show map and center it on the selected location
                  if (!showMap) {
                    setShowMap(true);
                  }
                }}
                className="w-fit flex items-center text-blue-600 dark:text-blue-500 gap-1 p-2 bg-blue-500/5 hover:bg-blue-500/10 rounded-full cursor-pointer min-w-[200px] border border-border transition-colors"
              >
                <MapPinPlus className="size-4 " />
                <div className="flex-1 text-start">
                  <p className="text-xs font-medium">{sliceRedundantLocationName(result.name) + '...'}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {latitude && longitude && showMap && (
        <div className="justify-end text-muted-foreground pr-2 flex gap-2 items-center rounded-md ">
            <Move className="size-4" />
          <p className="text-xs ">
            {t.form.location.dragPinDescription}
          </p>
        </div>
      )}

      {error && !isLoading && (
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-red-500/10 text-red-500 rounded-md border">
            <AlertCircle className="size-5 text-red-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
