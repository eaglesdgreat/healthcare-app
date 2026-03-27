import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { FloatingDatePicker } from '@/components/ui/floating-date-picker'
import { FloatingInput } from '@/components/ui/floating-input'
import { FloatingSelect } from '@/components/ui/floating-select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { registrationSchema, type RegistrationValues } from '@/lib/signup.utils'

export default function Stepper(props: {
  onSubmit: (data: RegistrationValues) => void
}) {
  const [currentStep, setCurrentStep] = useState('identity')

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
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-orange-800"
                      />
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
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-orange-800"
                      />
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
                      <FloatingDatePicker
                        label="Date of Birth"
                        value={field.value ? new Date(field.value) : undefined}
                        className="h-17.5! font-outfit font-medium text-2xl border-2 border-smoke/30 focus:ring-1 focus:ring-primary"
                        onChange={(date) =>
                          field.onChange(date?.toISOString().split('T')[0])
                        }
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-orange-800"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative bg-background">
                      <FloatingSelect
                        label="Gender"
                        className="h-17.5! font-outfit font-medium text-2xl text-text bg-background border-2 border-smoke/30 focus:ring-1 focus:ring-primary"
                        options={[
                          { label: 'Male', value: 'MALE' },
                          { label: 'Female', value: 'FEMALE' },
                          { label: 'Others', value: 'OTHER' },
                        ]}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-orange-800"
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </TabsContent>

          <TabsContent value="contact" className="py-6 space-y-4">
            <p className="text-text/60 text-base font-semibold">
              Step 2: Contact & Security
            </p>

            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative bg-background">
                      <FloatingInput
                        aria-invalid={fieldState.invalid}
                        placeholder="name@hospital.com"
                        className="h-17.5 font-outfit font-medium text-2xl text-text bg-background border-2 border-smoke/30 focus:ring-1 focus:ring-primary"
                        label="Email"
                        {...field}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-orange-800"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative bg-background">
                      <FloatingInput
                        aria-invalid={fieldState.invalid}
                        placeholder="070XXXXXX"
                        label="Phone Number"
                        className="h-17.5 font-outfit font-medium text-2xl text-text bg-background border-2 border-white/10 focus:ring-1 focus:ring-primary"
                        {...field}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-orange-800"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative bg-background">
                      <FloatingInput
                        aria-invalid={fieldState.invalid}
                        type="password"
                        placeholder="••••••••"
                        label="Password"
                        className="h-17.5 font-outfit font-medium text-2xl text-text bg-background border-2 border-white/10 focus:ring-1 focus:ring-primary"
                        {...field}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-orange-800"
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
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
