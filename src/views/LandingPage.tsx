import MedicalIcon from '@/assets/images/svgs/medical.svg?react'
import Title from '@/components/Title'

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-end items-center gap-40">
      <Title animated className="!font-normal">
        Medical
      </Title>
      <MedicalIcon className="w-full h-auto xl:h-100" />
    </div>
  )
}

export default LandingPage
