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
import { useEffect, useState } from "react"

interface ComboBoxOption {
  value:string,
  label:string
}

interface Props {
  label:string,
  notFound:string,
  options:ComboBoxOption[],
  triggerClassName?:string,
  popoverClassName?:string,
  popoverItemClassName:string,
  onValueChange?:(value:string)=>void
}

export function Combobox({label,notFound,options,onValueChange,triggerClassName,popoverItemClassName,popoverClassName}:Props) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  useEffect(()=>{
    if(onValueChange) onValueChange(value)
  },[value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`justify-between ${triggerClassName}`}
        >
          {value
            ? options.find((option) => option.value === value)?.label
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
                  key={option.value}
                  value={option.value}
                  className={`${popoverItemClassName}`}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
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
