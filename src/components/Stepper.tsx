import { zodResolver } from '@hookform/resolvers/zod'
import { Check, LoaderCircle } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import type { FieldPath } from 'react-hook-form'
import { useState } from 'react'
import SignupReview from '@/components/SignupReview'
import { Button } from '@/components/ui/button'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'
import {
  registrationSchema,
  userRoles,
  type RegistrationValues,
  type UserRole,
} from '@/lib/signup.utils'

type RegistrationStep = 'identity' | 'account' | 'review'

interface StepperProps {
  onSubmit: (data: RegistrationValues) => Promise<void>
  initialRole?: UserRole
}

const steps: { key: RegistrationStep; label: string }[] = [
  { key: 'identity', label: 'About you' },
  { key: 'account', label: 'Account' },
  { key: 'review', label: 'Review' },
]

const fieldsByStep: Record<
  Exclude<RegistrationStep, 'review'>,
  FieldPath<RegistrationValues>[]
> = {
  identity: ['firstName', 'lastName', 'role'],
  account: ['email', 'phoneNumber', 'password', 'confirmPassword'],
}

export default function Stepper({
  onSubmit,
  initialRole = 'PATIENT',
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('identity')
  const [submitError, setSubmitError] = useState('')
  const isOnline = useNetworkStatus()
  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: initialRole,
      password: '',
      confirmPassword: '',
    },
  })

  const inputClass =
    'h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-base text-white outline-none transition placeholder:text-text/60 focus:border-primary focus:ring-2 focus:ring-primary/30'

  async function handleNext() {
    if (currentStep === 'review') return
    const isValid = await form.trigger(fieldsByStep[currentStep])
    if (!isValid) return
    setCurrentStep(currentStep === 'identity' ? 'account' : 'review')
    setSubmitError('')
  }

  function handleBack() {
    setCurrentStep(currentStep === 'review' ? 'account' : 'identity')
    setSubmitError('')
  }

  async function handleSubmit(values: RegistrationValues) {
    setSubmitError('')
    try {
      await onSubmit(values)
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message)
      } else {
        console.error('Registration failed with a non-error value.', error)
        setSubmitError('Something went wrong. Please try again.')
      }
    }
  }

  const watchedValues = useWatch({ control: form.control })
  const values: RegistrationValues = {
    firstName: watchedValues.firstName ?? '',
    lastName: watchedValues.lastName ?? '',
    email: watchedValues.email ?? '',
    phoneNumber: watchedValues.phoneNumber ?? '',
    role: watchedValues.role ?? initialRole,
    password: watchedValues.password ?? '',
    confirmPassword: watchedValues.confirmPassword ?? '',
  }

  return (
    <div>
      <ol
        aria-label="Registration progress"
        className="mb-8 grid grid-cols-3 gap-2"
      >
        {steps.map((step, index) => {
          const currentIndex = steps.findIndex(
            (item) => item.key === currentStep
          )
          const isComplete = index < currentIndex
          const isCurrent = step.key === currentStep

          return (
            <li
              key={step.key}
              aria-current={isCurrent ? 'step' : undefined}
              className={`flex items-center gap-2 border-b-2 pb-3 text-xs sm:text-sm ${
                isCurrent
                  ? 'border-primary text-white'
                  : isComplete
                    ? 'border-primary/50 text-purple-200'
                    : 'border-white/10 text-text/60'
              }`}
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs">
                {isComplete ? (
                  <Check size={14} aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </span>
              {step.label}
            </li>
          )
        })}
      </ol>

      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-5"
      >
        {currentStep === 'identity' && (
          <section aria-labelledby="registration-identity-heading">
            <h2
              id="registration-identity-heading"
              className="mb-4 text-lg font-medium text-white"
            >
              Tell us who you are
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="First name"
                name="firstName"
                register={form.register}
                error={form.formState.errors.firstName?.message}
                className={inputClass}
                autoComplete="given-name"
              />
              <FormField
                label="Last name"
                name="lastName"
                register={form.register}
                error={form.formState.errors.lastName?.message}
                className={inputClass}
                autoComplete="family-name"
              />
            </div>
            <fieldset className="mt-6">
              <legend className="mb-3 text-sm font-medium text-white">
                I am joining as a
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {userRoles.map((role) => (
                  <label
                    key={role}
                    className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 text-center text-xs transition sm:text-sm ${
                      values.role === role
                        ? 'border-primary bg-primary/15 text-white'
                        : 'border-white/15 text-text hover:border-primary/60'
                    }`}
                  >
                    <input
                      type="radio"
                      value={role}
                      className="sr-only"
                      {...form.register('role')}
                    />
                    {role.charAt(0) + role.slice(1).toLowerCase()}
                  </label>
                ))}
              </div>
              {form.formState.errors.role && (
                <p className="mt-2 text-sm text-rose-300">
                  {form.formState.errors.role.message}
                </p>
              )}
            </fieldset>
          </section>
        )}

        {currentStep === 'account' && (
          <section aria-labelledby="registration-account-heading">
            <h2
              id="registration-account-heading"
              className="mb-4 text-lg font-medium text-white"
            >
              Set up your account
            </h2>
            <div className="space-y-4">
              <FormField
                label="Email address"
                name="email"
                type="email"
                register={form.register}
                error={form.formState.errors.email?.message}
                className={inputClass}
                autoComplete="email"
              />
              <FormField
                label="Phone number (include country code)"
                name="phoneNumber"
                type="tel"
                register={form.register}
                error={form.formState.errors.phoneNumber?.message}
                className={inputClass}
                placeholder="+2348012345678"
                autoComplete="tel"
              />
              <FormField
                label="Password"
                name="password"
                type="password"
                register={form.register}
                error={form.formState.errors.password?.message}
                className={inputClass}
                autoComplete="new-password"
              />
              <FormField
                label="Confirm password"
                name="confirmPassword"
                type="password"
                register={form.register}
                error={form.formState.errors.confirmPassword?.message}
                className={inputClass}
                autoComplete="new-password"
              />
              <p className="text-xs leading-5 text-text/70">
                Use at least 8 characters with uppercase and lowercase letters,
                a number, and a special character.
              </p>
            </div>
          </section>
        )}

        {currentStep === 'review' && (
          <SignupReview data={values} setCurrentStep={setCurrentStep} />
        )}

        {submitError && (
          <p
            role="alert"
            className="rounded-xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm text-rose-100"
          >
            {submitError}
          </p>
        )}

        {currentStep === 'review' && !isOnline && (
          <p className="text-sm text-amber-200">
            Reconnect before creating your account. Your details are not saved
            outside this page.
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          {currentStep !== 'identity' ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="min-h-11 border-white/20 text-white hover:bg-white/10"
            >
              Back
            </Button>
          ) : (
            <span />
          )}

          {currentStep !== 'review' ? (
            <Button
              type="button"
              onClick={() => void handleNext()}
              className="min-h-11 bg-title-gradient px-6 text-white hover:opacity-90"
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!isOnline || form.formState.isSubmitting}
              className="min-h-11 bg-title-gradient px-6 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {form.formState.isSubmitting ? (
                <>
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                  Creating account…
                </>
              ) : (
                'Create account'
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

interface FormFieldProps {
  label: string
  name: FieldPath<RegistrationValues>
  type?: string
  placeholder?: string
  autoComplete?: string
  className: string
  error?: string
  register: ReturnType<typeof useForm<RegistrationValues>>['register']
}

function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  autoComplete,
  className,
  error,
  register,
}: FormFieldProps) {
  const id = `registration-${name}`
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={className}
        {...register(name)}
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm text-rose-300">
          {error}
        </p>
      )}
    </div>
  )
}
