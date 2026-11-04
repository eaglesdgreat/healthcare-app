import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { register } from '@/api/auth'
import Stepper from '@/components/Stepper'
import {
  userRoles,
  type RegistrationValues,
  type UserRole,
} from '@/lib/signup.utils'

const roleByQuery: Record<string, UserRole> = {
  patient: userRoles[0],
  doctor: userRoles[1],
  hospital: userRoles[2],
}

export default function SignUp() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialRole = roleByQuery[searchParams.get('type')?.toLowerCase() ?? '']

  async function onSubmit(values: RegistrationValues) {
    await register(values)
    navigate('/activate', {
      replace: true,
      state: { email: values.email },
    })
  }

  return (
    <main className="container-custom min-h-screen py-8 sm:py-12">
      <Link to="/" className="text-sm text-text transition hover:text-white">
        ← Back to home
      </Link>
      <section className="mx-auto mt-8 w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 sm:p-9">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
            New account
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            Join the care community
          </h1>
          <p className="mt-2 leading-6 text-text">
            Create an account with the contact details you use for healthcare.
          </p>
        </div>
        <Stepper onSubmit={onSubmit} initialRole={initialRole} />
      </section>
    </main>
  )
}
