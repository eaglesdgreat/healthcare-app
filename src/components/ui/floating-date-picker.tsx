import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Label } from './label'

interface FloatingDatePickerProps {
  label: string
  value?: Date
  onChange?: (date: Date | undefined) => void
  className?: string
}

export function FloatingDatePicker({
  label,
  value,
  onChange,
  className,
}: FloatingDatePickerProps) {
  return (
    <div className="group relative z-0 w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'peer flex h-17.5 w-full items-center justify-start rounded-lg border-2 border-smoke/30 bg-background px-5 pb-3 pt-7 text-left text-lg font-medium text-text ring-0 focus:border-primary hover:bg-[#0a0a0a] hover:text-text',
              !value && 'text-text/40',
              className
            )}
          >
            {value ? format(value, 'PPP') : ' '}
            <CalendarIcon className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-text/40" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-neutral border-white/10"
          align="start"
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Label
        className={cn(
          'absolute left-5 top-5 z-10 origin-left -translate-y-4 scale-75 transform duration-300 pointer-events-none',
          !value &&
            'peer-aria-expanded:scale-75 peer-aria-expanded:-translate-y-4 peer-[&:not(:has(span))]:scale-100 peer-[&:not(:has(span))]:translate-y-0',
          value && '-translate-y-4 scale-75 text-text/40',
          'font-outfit font-medium text-sm'
        )}
      >
        {label}
      </Label>
    </div>
  )
}
