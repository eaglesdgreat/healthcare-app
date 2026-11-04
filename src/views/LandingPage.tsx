import {
  ArrowRight,
  CalendarCheck2,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Title from '@/components/Title'

export default function LandingPage() {
  return (
    <main className="container-custom flex min-h-screen flex-col py-6 sm:py-10">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold text-white no-underline!"
          aria-label="Medical home"
        >
          <HeartPulse className="text-primary" aria-hidden="true" />
          Medical
        </Link>
        <Link
          to="/login/options"
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-primary"
        >
          Sign in
        </Link>
      </header>

      <section className="grid flex-1 items-center gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-purple-100">
            <ShieldCheck size={16} aria-hidden="true" />
            Care starts with a connection
          </p>
          <Title className="mb-5 text-5xl! leading-tight sm:text-6xl!">
            Your health, <span className="text-white">better connected.</span>
          </Title>
          <p className="max-w-xl text-lg leading-8 text-text">
            Find your way to trusted care. Create a free patient account or
            connect your healthcare practice to the people who need you.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login/options"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-title-gradient px-6 font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-90"
            >
              Get started <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to="/signup?type=patient"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-6 font-medium text-white transition hover:border-primary"
            >
              Create a patient account
            </Link>
          </div>
          <p className="mt-4 text-sm text-text/70">
            Patient access is free. Provider subscriptions are planned for a
            future milestone.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-text/70">
                A simpler way to manage care
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-white">
                Care, in your corner
              </h2>
            </div>
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary">
              <HeartPulse aria-hidden="true" />
            </span>
          </div>
          <ul className="space-y-5">
            <li className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-primary">
                <CalendarCheck2 size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-medium text-white">Care that fits you</h3>
                <p className="mt-1 text-sm leading-6 text-text">
                  A clear path to appointments as provider booking comes online.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-primary">
                <ShieldCheck size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-medium text-white">
                  Your details stay yours
                </h3>
                <p className="mt-1 text-sm leading-6 text-text">
                  We never save passwords or health data for offline use.
                </p>
              </div>
            </li>
          </ul>
          <div className="mt-8 border-t border-white/10 pt-5 text-sm text-text/70">
            Built to stay clear when your connection is not.
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 pt-5 text-sm text-text/60">
        Medical care, more connected.
      </footer>
    </main>
  )
}
