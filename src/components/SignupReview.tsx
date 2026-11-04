import { Button } from '@/components/ui/button'
import type { RegistrationValues } from '@/lib/signup.utils'

interface SignupReviewProps {
  data: RegistrationValues
  setCurrentStep: (step: 'identity' | 'account') => void
}

export default function SignupReview({
  data,
  setCurrentStep,
}: SignupReviewProps) {
  const role = data.role.charAt(0) + data.role.slice(1).toLowerCase()

  return (
    <section aria-labelledby="registration-review-heading">
      <h2
        id="registration-review-heading"
        className="text-lg font-medium text-white"
      >
        Check your details
      </h2>
      <p className="mt-1 text-sm leading-6 text-text">
        We will send an account activation message to your email after
        registration.
      </p>

      <dl className="mt-5 divide-y divide-white/10 rounded-xl border border-white/10 bg-black/10 px-4">
        <ReviewRow
          label="Name"
          value={`${data.firstName} ${data.lastName}`}
          onEdit={() => setCurrentStep('identity')}
        />
        <ReviewRow
          label="Account type"
          value={role}
          onEdit={() => setCurrentStep('identity')}
        />
        <ReviewRow
          label="Email"
          value={data.email}
          onEdit={() => setCurrentStep('account')}
        />
        <ReviewRow
          label="Phone"
          value={data.phoneNumber}
          onEdit={() => setCurrentStep('account')}
        />
      </dl>
      <p className="mt-4 text-xs leading-5 text-text/70">
        Your password is never included in the review or saved on this device.
      </p>
    </section>
  )
}

function ReviewRow({
  label,
  value,
  onEdit,
}: {
  label: string
  value: string
  onEdit: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <dt className="text-xs text-text/70">{label}</dt>
        <dd className="break-all text-sm font-medium text-white">{value}</dd>
      </div>
      <Button
        type="button"
        variant="ghost"
        onClick={onEdit}
        className="shrink-0 text-purple-200 hover:bg-white/10 hover:text-white"
      >
        Edit
      </Button>
    </div>
  )
}
