import { Link } from 'react-router-dom'

export default function ForgetPassword() {
  return (
    <main className="container-custom flex min-h-screen items-center justify-center py-10">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-9">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
          Account help
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Password reset is not available yet
        </h1>
        <p className="mt-4 leading-7 text-text">
          The current authentication service does not provide a password-reset
          endpoint. We have not sent or stored any account details. Contact your
          care provider or platform administrator for help.
        </p>
        <Link
          to="/signin"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-title-gradient px-5 font-medium text-white hover:opacity-90"
        >
          Return to sign in
        </Link>
      </section>
    </main>
  )
}
