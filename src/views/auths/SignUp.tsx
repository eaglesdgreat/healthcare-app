import Stepper from '@/components/Stepper'
import Title from '@/components/Title'
import { type RegistrationValues } from '@/lib/signup.utils'

export default function SignUp() {
  const onSubmit = async (data: RegistrationValues) => {
    console.log('Submitting...', data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <div className="responsive flex flex-col gap-5 md:gap-10 justify-center items-center px-5">
      <Title animated className="font-normal!">
        Medical
      </Title>

      <Stepper onSubmit={onSubmit} />
    </div>
  )
}
