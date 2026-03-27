import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from './input'
import { Label } from './label'

export interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="group relative z-0 w-full rounded-md">
        <Input
          {...props}
          ref={ref}
          placeholder=" " // Keep a space so peer-placeholder-shown works
          className={cn(
            'peer block w-full appearance-none rounded-lg border bg-background px-5 pb-4 pt-6 text-sm text-text focus:border-primary focus:outline-none focus:ring-0',
            className
          )}
        />
        <Label
          className={cn(
            'absolute left-5 top-5 z-10 origin-left -translate-y-4 scale-75 transform text-sm text-text/40 duration-300',
            'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
            'peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-text',
            'font-outfit font-medium text-text text-sm'
          )}
        >
          {label}
        </Label>
      </div>
    )
  }
)
FloatingInput.displayName = 'FloatingInput'

export { FloatingInput }
