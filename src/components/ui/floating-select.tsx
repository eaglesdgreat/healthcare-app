import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Label } from './label'

interface FloatingSelectProps {
  label: string
  options: { label: string; value: string }[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export function FloatingSelect({
  label,
  options,
  value,
  onValueChange,
  className,
}: FloatingSelectProps) {
  return (
    <div className="group relative z-0 w-full">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={cn(
            'peer flex w-full appearance-none items-center justify-between rounded-lg border-2 border-smoke/30 bg-background px-5 pb-4 pt-6 text-lg font-medium text-text outline-none focus:border-primary focus:ring-0',
            className
          )}
        >
          <SelectValue placeholder=" " />
        </SelectTrigger>
        <SelectContent className="bg-neutral border-white/10 text-text">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label
        className={cn(
          'absolute left-5 top-5 z-10 origin-left -translate-y-4 scale-75 transform text-sm text-text/40 duration-300 pointer-events-none',
          // If a value exists, keep it in the "floating" position
          !value &&
            'peer-data-placeholder:translate-y-0 peer-data-placeholder:scale-100 peer-data-placeholder:text-text',
          'peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-text',
          'font-outfit font-medium text-sm text-text'
        )}
      >
        {label}
      </Label>
    </div>
  )
}
