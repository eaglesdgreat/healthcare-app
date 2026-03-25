import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Field,
  // FieldDescription,
  FieldError,
  FieldGroup,
  // FieldLabel,
} from '@/components/ui/field'
import { FloatingInput } from '@/components/ui/floating-input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { registrationSchema, type RegistrationValues } from '@/lib/signup.utils'

export default function Stepper(props: {
  onSubmit: (data: RegistrationValues) => void
}) {
  const [currentStep, setCurrentStep] = useState('identity')
  const [date, setDate] = useState<Date | undefined>(undefined)

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
  })

  const handleNext = async () => {
    let fieldsToValidate: unknown[] = []

    // Logic: Only validate fields for the CURRENT step
    if (currentStep === 'identity')
      fieldsToValidate = ['firstName', 'lastName', 'dob', 'gender']
    if (currentStep === 'contact')
      fieldsToValidate = ['email', 'phone', 'password']

    const isStepValid = await form.trigger(fieldsToValidate)

    if (isStepValid) {
      if (currentStep === 'identity') setCurrentStep('contact')
      else if (currentStep === 'contact') setCurrentStep('medical')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Tabs value={currentStep} className="w-full">
        {/* Progress Visuals */}
        <TabsList className="grid w-full grid-cols-3 bg-neutral border border-white/5 text-outfit">
          <TabsTrigger
            value="identity"
            disabled
            className="data-[state=active]:bg-primary"
          >
            Identity
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            disabled
            className="data-[state=active]:bg-primary"
          >
            Contact
          </TabsTrigger>
          <TabsTrigger
            value="medical"
            disabled
            className="data-[state=active]:bg-primary"
          >
            Medical
          </TabsTrigger>
        </TabsList>

        <form onSubmit={form.handleSubmit((data) => props.onSubmit(data))}>
          <TabsContent value="identity" className="py-6 space-y-4">
            {/* Use your FloatingInput components here */}
            <p className="text-base font-semibold text-text/60">
              Step 1: Legal Identity
            </p>
            <FieldGroup>
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative bg-background">
                      <FloatingInput
                        aria-invalid={fieldState.invalid}
                        placeholder="John"
                        className="h-17.5 font-outfit font-medium text-2xl text-text bg-background border-2 border-smoke/30 focus:ring-1 focus:ring-primary"
                        label="First Name"
                        {...field}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} color="red" />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative bg-background">
                      <FloatingInput
                        aria-invalid={fieldState.invalid}
                        placeholder="Doe"
                        className="h-17.5 font-outfit font-medium text-2xl text-text bg-background border-2 border-smoke/30 focus:ring-1 focus:ring-primary"
                        label="Last Name"
                        {...field}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} color="red" />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="dob"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative bg-background">
                      <Field data-invalid={fieldState.invalid}>
                        <div className="relative bg-background">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                data-empty={!date}
                                className="w-70 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                              >
                                <CalendarIcon />
                                {date ? (
                                  format(date, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                {...field}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} color="red" />
                        )}
                      </Field>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} color="red" />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </TabsContent>

          <TabsContent value="contact" className="py-6 space-y-4">
            <p className="text-text/60 text-base font-semibold">
              Step 2: Communication & Security
            </p>
          </TabsContent>

          <TabsContent value="medical" className="py-6 space-y-4">
            <p className="text-text/60 text-base font-semibold">
              Step 3: Clinical Baseline
            </p>
          </TabsContent>

          {/* Controls */}
          <div className="flex justify-between mt-8">
            {currentStep !== 'identity' && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (currentStep === 'contact') setCurrentStep('identity')
                  if (currentStep === 'medical') setCurrentStep('contact')
                }}
              >
                Back
              </Button>
            )}

            {currentStep !== 'medical' ? (
              <Button
                type="button"
                className="ml-auto bg-secondary"
                onClick={handleNext}
              >
                Next Step
              </Button>
            ) : (
              <Button type="submit" className="ml-auto bg-title-gradient">
                Create Health ID
              </Button>
            )}
          </div>
        </form>
      </Tabs>
    </div>
  )
}
