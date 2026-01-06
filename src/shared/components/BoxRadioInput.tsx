import { useId, type ReactNode } from 'react'

import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'

interface Props {
  items:{
    value:string,
    label:ReactNode,
    disabled?:boolean
  }[],
  containerClassName?:string,
  labelClassName?:string
}

export const BoxRadioInput = ({items,containerClassName,labelClassName}:Props) => {
  const id = useId()

  return (
      <RadioGroup className={`grid grid-cols-3 gap-2 ${containerClassName}`} defaultValue='1'>
        {items.map(item => (
          <label
            key={`${id}-${item.value}`}
            className={`border-input has-data-[state=checked]:border-primary/80 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 ${labelClassName}`}
          >
            <RadioGroupItem
              id={`${id}-${item.value}`}
              value={item.value}
              className='sr-only after:absolute after:inset-0'
              aria-label={`size-radio-${item.value}`}
              disabled={item.disabled}
            />
            <p className='text-foreground text-sm leading-none font-medium'>{item.label}</p>
          </label>
        ))}
      </RadioGroup>
  )
}

