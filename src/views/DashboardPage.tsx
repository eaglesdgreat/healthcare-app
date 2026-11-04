import {
  ArrowRight,
  CalendarCheck2,
  ClipboardList,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/auth/useAuth'

const roleCopy = {
  PATIENT: {
    label: 'Patient',
    title: 'Your care journey starts here',
    description:
      'Your account is ready. Provider search and appointment booking will appear here when the booking service is connected.',
  },
  DOCTOR: {
    label: 'Doctor',
    title: 'Welcome to your care workspace',
    description:
      'Your account is ready. Provider verification and practice tools will be added in a future milestone.',
  },
  HOSPITAL: {
    label: 'Hospital',
    title: 'Welcome to your facility workspace',
    description:
      'Your account is ready. Facility verification and management tools will be added in a future milestone.',
  },
  ADMIN: {
    label: 'Account',
    title: 'Welcome to Medical',
    description:
      'Your account is signed in. Contact your platform administrator for role-specific access.',
  },
} as const

export default function DashboardPage() {
  const { session } = useAuth()
  const user = session?.user
  const content = user ? roleCopy[user.role] : roleCopy.PATIENT

  return (
    <div className="mx-auto max-w-4xl">
      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-9">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
          {content.label} workspace
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          {content.title}
          {user?.firstName ? `, ${user.firstName}` : ''}
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-text">
          {content.description}
        </p>
        {user?.healthId && (
          <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3">
            <ShieldCheck
              className="text-purple-200"
              size={19}
              aria-hidden="true"
            />
            <span>
              <span className="block text-xs text-text/70">Your Health ID</span>
              <span className="font-semibold text-white">{user.healthId}</span>
            </span>
          </div>
        )}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <CalendarCheck2 className="text-primary" aria-hidden="true" />
          <h2 className="mt-4 font-semibold text-white">Appointments</h2>
          <p className="mt-2 text-sm leading-6 text-text">
            Booking and appointment history are not connected in this milestone.
            No appointments are being shown or changed.
          </p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <ClipboardList className="text-primary" aria-hidden="true" />
          <h2 className="mt-4 font-semibold text-white">What comes next</h2>
          <p className="mt-2 text-sm leading-6 text-text">
            Verified provider discovery, care bookings, and privacy-first
            offline records are planned as their services become available.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-purple-200 hover:text-white"
          >
            Explore the platform <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </article>
      </section>
    </div>
  )
}
