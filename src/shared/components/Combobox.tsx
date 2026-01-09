import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/shared/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { useState } from "react"
import { capitalize } from "../utils/capitalize"

interface Props {
  label:string,
  notFound:string,
  options:string[],
  triggerClassName?:string,
  popoverClassName?:string,
  popoverItemClassName?:string,
  optionsTranslation?:Record<string,string>
  onValueChange?:(value:string)=>void,
  value?:string
}

export function Combobox({label,value,notFound,optionsTranslation,options,onValueChange,triggerClassName,popoverItemClassName,popoverClassName}:Props) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`justify-between cursor-pointer ${triggerClassName}`}
        >
          {value
            ? (optionsTranslation? optionsTranslation[value] : capitalize(value))
            : label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`p-0 ${popoverClassName}`}>
        <Command>
          <CommandInput placeholder={label} className="h-9" />
          <CommandList>
            <CommandEmpty>{notFound}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  className={`${popoverItemClassName}`}
                  onSelect={(currentValue) => {
                    if(onValueChange)onValueChange(currentValue) 
                    setOpen(false)
                  }}
                >
                  {optionsTranslation? optionsTranslation[option] : capitalize(option)}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
