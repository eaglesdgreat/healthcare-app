import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import * as z from 'zod'
import { useState } from 'react'
import { activateAccount, resendActivation } from '@/api/auth'

const activationSchema = z.object({
  healthId: z
    .string()
    .trim()
    .regex(
      /^(PAT|HOS|DOC)-[A-Z0-9]{8,16}$/i,
      'Enter the Health ID sent with your activation email'
    ),
  token: z
    .string()
    .trim()
    .regex(
      /^(?:[a-f0-9]{16}|[a-f0-9]{48}|[a-f0-9]{64})$/i,
      'Enter the activation token from your email'
    ),
})

type ActivationValues = z.infer<typeof activationSchema>

export default function ActivateAccount() {
  const location = useLocation()
  const locationState =
    typeof location.state === 'object' && location.state !== null
      ? (location.state as { email?: unknown })
      : undefined
  const initialEmail =
    typeof locationState?.email === 'string' ? locationState.email : ''
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [resendIdentifier, setResendIdentifier] = useState(initialEmail)
  const [resendMessage, setResendMessage] = useState('')
  const [resendError, setResendError] = useState('')
  const [isResending, setIsResending] = useState(false)

  const form = useForm<ActivationValues>({
    resolver: zodResolver(activationSchema),
    defaultValues: { healthId: '', token: '' },
  })

  async function onSubmit(values: ActivationValues) {
    setErrorMessage('')
    setMessage('')
    try {
      const response = await activateAccount(values.healthId, values.token)
      setMessage(response.message)
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        console.error(
          'Account activation failed with a non-error value.',
          error
        )
        setErrorMessage('Something went wrong. Please try again.')
      }
    }
  }

  async function handleResend() {
    setResendMessage('')
    setResendError('')
    setIsResending(true)
    try {
      const response = await resendActivation(resendIdentifier)
      setResendMessage(response.message)
    } catch (error) {
      if (error instanceof Error) {
        setResendError(error.message)
      } else {
        console.error('Activation resend failed with a non-error value.', error)
        setResendError('Something went wrong. Please try again.')
      }
    } finally {
      setIsResending(false)
    }
  }

  const inputClass =
    'h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-base text-white outline-none transition placeholder:text-text/60 focus:border-primary focus:ring-2 focus:ring-primary/30'

  return (
    <main className="container-custom flex min-h-screen items-center justify-center py-10">
      <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 sm:p-9">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
          One more step
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Activate your account
        </h1>
        <p className="mt-3 leading-6 text-text">
          Use the Health ID and activation token from your email. Activation
          completes account setup; sign in afterward to continue.
        </p>
        {initialEmail && (
          <p className="mt-3 text-sm text-text">
            Registration email:{' '}
            <span className="text-white">{initialEmail}</span>
          </p>
        )}

        {message ? (
          <div
            role="status"
            className="mt-6 rounded-xl border border-emerald-300/30 bg-emerald-300/10 p-4 text-emerald-100"
          >
            <p>{message}</p>
            <Link
              to="/signin"
              className="mt-3 inline-block font-medium text-white underline underline-offset-4"
            >
              Continue to sign in
            </Link>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            <div>
              <label
                htmlFor="healthId"
                className="mb-2 block text-sm font-medium text-white"
              >
                Health ID
              </label>
              <input
                id="healthId"
                autoComplete="off"
                placeholder="PAT-ABCD1234"
                aria-invalid={Boolean(form.formState.errors.healthId)}
                className={inputClass}
                {...form.register('healthId')}
              />
              {form.formState.errors.healthId && (
                <p className="mt-2 text-sm text-rose-300">
                  {form.formState.errors.healthId.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="activation-token"
                className="mb-2 block text-sm font-medium text-white"
              >
                Activation token
              </label>
              <input
                id="activation-token"
                autoComplete="one-time-code"
                aria-invalid={Boolean(form.formState.errors.token)}
                className={inputClass}
                {...form.register('token')}
              />
              {form.formState.errors.token && (
                <p className="mt-2 text-sm text-rose-300">
                  {form.formState.errors.token.message}
                </p>
              )}
            </div>
            {errorMessage && (
              <p
                role="alert"
                className="rounded-xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm text-rose-100"
              >
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="min-h-12 w-full rounded-xl bg-title-gradient px-4 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {form.formState.isSubmitting ? 'Activating…' : 'Activate account'}
            </button>
          </form>
        )}

        {!message && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <h2 className="font-medium text-white">
              Didn&apos;t get the email?
            </h2>
            <p className="mt-1 text-sm leading-6 text-text">
              Request another activation message. The service applies a resend
              cooldown.
            </p>
            <form
              className="mt-4 space-y-3"
              onSubmit={(event) => {
                event.preventDefault()
                void handleResend()
              }}
            >
              <label
                htmlFor="resend-identifier"
                className="mb-2 block text-sm font-medium text-white"
              >
                Registration email or phone
              </label>
              <input
                id="resend-identifier"
                type="text"
                autoComplete="email"
                value={resendIdentifier}
                onChange={(event) => setResendIdentifier(event.target.value)}
                required
                className={inputClass}
              />
              {resendMessage && (
                <p role="status" className="text-sm text-emerald-200">
                  {resendMessage}
                </p>
              )}
              {resendError && (
                <p role="alert" className="text-sm text-rose-300">
                  {resendError}
                </p>
              )}
              <button
                type="submit"
                disabled={!resendIdentifier || isResending}
                className="min-h-11 w-full rounded-xl border border-white/15 px-4 font-medium text-white transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isResending ? 'Sending…' : 'Resend activation email'}
              </button>
            </form>
          </div>
        )}
      </section>
    </main>
  )
}
