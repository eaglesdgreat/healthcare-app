import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, LoaderCircle, LockKeyhole } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import * as z from 'zod'
import { useState } from 'react'
import { signIn } from '@/api/auth'
import { useAuth } from '@/context/auth/useAuth'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'

const signInSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Enter your email, phone number, or Health ID'),
  password: z.string().min(1, 'Enter your password'),
})

type SignInValues = z.infer<typeof signInSchema>

const roleLabels: Record<string, string> = {
  patient: 'Patient',
  doctor: 'Doctor',
  hospital: 'Hospital',
}

export default function SignIn() {
  const [searchParams] = useSearchParams()
  const role = roleLabels[searchParams.get('type')?.toLowerCase() ?? '']
  const navigate = useNavigate()
  const { establishSession } = useAuth()
  const isOnline = useNetworkStatus()
  const [submitError, setSubmitError] = useState('')
  const [requestId, setRequestId] = useState('')
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { username: '', password: '' },
  })

  async function onSubmit(values: SignInValues) {
    setSubmitError('')
    setRequestId('')
    try {
      const response = await signIn(values.username, values.password)
      establishSession(response)
      navigate('/appointments', { replace: true })
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message)
        if ('requestId' in error && typeof error.requestId === 'string') {
          setRequestId(error.requestId)
        }
      } else {
        console.error('Sign-in failed with a non-error value.', error)
        setSubmitError('Something went wrong. Please try again.')
      }
    }
  }

  const labelClass = 'mb-2 block text-sm font-medium text-white'
  const inputClass =
    'h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-base text-white outline-none transition placeholder:text-text/60 focus:border-primary focus:ring-2 focus:ring-primary/30'

  return (
    <main className="container-custom flex min-h-screen items-center justify-center py-10">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 sm:p-9">
        <Link
          to="/login/options"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text transition hover:text-white"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Choose another account type
        </Link>

        <div className="mb-8">
          <span className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary">
            <LockKeyhole aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-3xl font-semibold text-white">
            Welcome back{role ? `, ${role.toLowerCase()}` : ''}
          </h1>
          <p className="mt-2 leading-6 text-text">
            Sign in with the email, phone number, or Health ID on your account.
          </p>
        </div>

        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <label className={labelClass} htmlFor="username">
              Email, phone, or Health ID
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="name@example.com or PAT-12345678"
              aria-invalid={Boolean(form.formState.errors.username)}
              aria-describedby={
                form.formState.errors.username ? 'username-error' : undefined
              }
              className={inputClass}
              {...form.register('username')}
            />
            {form.formState.errors.username && (
              <p id="username-error" className="mt-2 text-sm text-rose-300">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                className="text-sm font-medium text-white"
                htmlFor="password"
              >
                Password
              </label>
              <Link
                to="/forget-password"
                className="text-sm text-purple-200 underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={Boolean(form.formState.errors.password)}
              aria-describedby={
                form.formState.errors.password ? 'password-error' : undefined
              }
              className={inputClass}
              {...form.register('password')}
            />
            {form.formState.errors.password && (
              <p id="password-error" className="mt-2 text-sm text-rose-300">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {submitError && (
            <div
              role="alert"
              className="rounded-xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm text-rose-100"
            >
              <p>{submitError}</p>
              {requestId && (
                <p className="mt-1 text-xs text-rose-100/70">
                  Support reference: {requestId}
                </p>
              )}
              {submitError.toLowerCase().includes('activat') && (
                <Link
                  to="/activate"
                  className="mt-2 inline-block font-medium text-white underline underline-offset-4"
                >
                  Activate your account
                </Link>
              )}
            </div>
          )}

          {!isOnline && (
            <p className="text-sm text-amber-200">
              Reconnect to sign in. Your password is not saved for later.
            </p>
          )}

          <button
            type="submit"
            disabled={!isOnline || form.formState.isSubmitting}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-title-gradient px-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {form.formState.isSubmitting && (
              <LoaderCircle
                size={18}
                className="animate-spin"
                aria-hidden="true"
              />
            )}
            {form.formState.isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text">
          New to Medical?{' '}
          <Link
            to={`/signup${role ? `?type=${role.toLowerCase()}` : ''}`}
            className="font-semibold text-purple-200 underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  )
}
