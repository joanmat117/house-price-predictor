import { useId} from 'react'

import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { capitalize } from '../utils/capitalize'

interface Props {
  items:Array<string|number>,
  optionsTranslation?:Record<string,string>,
  containerClassName?:string,
  labelClassName?:string,
  value:string|null|undefined,
  containsText?:boolean
  onValueChange: ((value: string) => void) | undefined
}

export const BoxRadioInput = ({onValueChange,value,containsText = true,items,optionsTranslation,containerClassName,labelClassName}:Props) => {
  const id = useId()

  return (
      <RadioGroup value={value} onValueChange={onValueChange} className={`flex flex-wrap gap-2 ${containerClassName}`} defaultValue='1'>
        {items.map(item => (
          <label
            key={`${id}-${item}`}
            className={`border-input  has-data-[state=checked]:border-primary/80 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center justify-center gap-3 rounded-md border px-2 py-3 text-center cursor-pointer shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 transition-all active:scale-95 ${containsText ? 'flex-1 max-w-[300px] min-w-[120px]' : ' min-w-10 rounded-full!'} ${labelClassName}`}
          
          >
            <RadioGroupItem
              id={`${id}-${item}`}
              value={item.toString()}
              className='sr-only after:absolute after:inset-0'
              aria-label={`size-radio-${item}`}
            />
            <p className='text-foreground text-sm leading-none font-medium'>{optionsTranslation? optionsTranslation[item.toString()] : capitalize(item.toString())}</p>
          </label>
        ))}
      </RadioGroup>
  )
}

