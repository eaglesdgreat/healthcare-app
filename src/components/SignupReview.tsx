import { Button } from '@/components/ui/button'
import { type RegistrationValues } from '@/lib/signup.utils'

export default function SignupReview({
  data,
  setCurrentStep,
}: {
  data: RegistrationValues
  setCurrentStep: (step: 'identity' | 'contact' | 'medical') => void
}) {
  return (
    <div className="space-y-6 py-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-outfit font-medium text-text">
          Verify Health Record
        </h3>
        <p className="text-text/40 text-sm">
          This data will be used to generate your permanent Health ID.
        </p>
      </div>

      {/* Identity Section */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <span className="text-primary text-xs font-bold uppercase tracking-wider">
            Identity
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep('identity')}
            className="h-7 text-xs text-text/40 hover:text-primary"
          >
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-text/40 text-[10px] uppercase">Full Name</p>
            <p className="text-text text-sm font-medium">
              {data.firstName} {data.lastName}
            </p>
          </div>
          <div>
            <p className="text-text/40 text-[10px] uppercase">Date of Birth</p>
            <p className="text-text text-sm font-medium">{data.dob}</p>
          </div>
          <div>
            <p className="text-text/40 text-[10px] uppercase">Gender</p>
            <p className="text-text text-sm font-medium">{data.gender}</p>
          </div>
        </div>
      </div>

      {/* Clinical Baseline - HIGHLIGHTED */}
      <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 space-y-3 shadow-[0_0_15px_rgba(101,73,213,0.1)]">
        <div className="flex justify-between items-center border-b border-primary/10 pb-2">
          <span className="text-primary text-xs font-bold uppercase tracking-wider">
            Clinical Baseline
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep('medical')}
            className="h-7 text-xs text-text/40 hover:text-primary"
          >
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-text/40 text-[10px] uppercase font-bold">
              Blood Group
            </p>
            <p className="text-primary text-xl font-bold">{data.bloodGroup}</p>
          </div>
          <div>
            <p className="text-text/40 text-[10px] uppercase font-bold">
              Genotype
            </p>
            <p className="text-primary text-xl font-bold">{data.genotype}</p>
          </div>
          <div>
            <p className="text-text/40 text-[10px] uppercase font-bold">
              Allergies
            </p>
            <p className="text-text text-sm font-medium">
              {data.allergies || 'None Reported'}
            </p>
          </div>
          <div>
            <p className="text-text/40 text-[10px] uppercase font-bold">
              Emergency Contact Name
            </p>
            <p className="text-text text-sm font-medium">
              {data.emergencyContactName}
            </p>
          </div>
          <div>
            <p className="text-text/40 text-[10px] uppercase font-bold">
              Emergency Contact Phone
            </p>
            <p className="text-text text-sm font-medium">
              {data.emergencyContactPhone}
            </p>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex justify-between items-center border-b border-primary/10 pb-2">
          <span className="text-primary text-xs font-bold uppercase tracking-wider">
            Security Access
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep('contact')}
            className="h-7 text-xs text-text/40 hover:text-primary"
          >
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-text/40 text-[10px] uppercase">Email Address</p>
            <p className="text-text text-sm font-medium">
              {data.email || 'None Reported'}
            </p>
          </div>
          <div>
            <p className="text-text/40 text-[10px] uppercase">Phone Number</p>
            <p className="text-text text-sm font-medium">{data.phone}</p>
          </div>
        </div>
      </div>

      {/* Final Immutable Acknowledgment */}
      <div className="flex items-start gap-3 p-3 bg-secondary-2/5 border border-secondary-2/20 rounded-lg">
        <input
          type="checkbox"
          id="confirm-ledger"
          required
          className="mt-1 accent-primary"
        />
        <label
          htmlFor="confirm-ledger"
          className="text-[11px] text-text/60 leading-tight"
        >
          I understand that my Blood Group and Identity are permanent clinical
          markers. I confirm the information provided is medically accurate.
        </label>
      </div>
    </div>
  )
}
