import { ArrowRight, Building2, HeartPulse, Stethoscope } from 'lucide-react'
import { Link } from 'react-router-dom'
import Title from '@/components/Title'
import { userRoles } from '@/lib/signup.utils'

const accountTypes = [
  {
    role: userRoles[0],
    label: 'Patient',
    description: 'Find care and manage your healthcare journey.',
    icon: HeartPulse,
  },
  {
    role: userRoles[1],
    label: 'Doctor',
    description: 'Connect with patients and manage your practice.',
    icon: Stethoscope,
  },
  {
    role: userRoles[2],
    label: 'Hospital',
    description: 'Bring your facility and care team online.',
    icon: Building2,
  },
]

export default function LoginOption() {
  return (
    <main className="container-custom flex min-h-screen flex-col justify-center py-12">
      <Link
        to="/"
        className="mb-10 self-start text-sm text-text hover:text-white"
      >
        ← Back to home
      </Link>
      <div className="mx-auto w-full max-w-4xl">
        <Title className="mb-4 text-4xl! sm:text-5xl!">
          Welcome to Medical
        </Title>
        <p className="mb-9 text-text">
          Choose how you use the platform to continue.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {accountTypes.map(({ role, label, description, icon: Icon }) => (
            <section
              key={role}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary">
                <Icon aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-white">{label}</h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-text">
                {description}
              </p>
              <div className="mt-6 grid gap-3">
                <Link
                  to={`/signin?type=${label.toLowerCase()}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-title-gradient px-4 font-medium text-white transition hover:opacity-90"
                >
                  Sign in <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  to={`/signup?type=${label.toLowerCase()}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/15 px-4 text-sm text-white transition hover:border-primary"
                >
                  Create account
                </Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
