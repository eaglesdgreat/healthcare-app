import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import DoctorIcon from '@/assets/images/svgs/doctor.svg'
import HospitalIcon from '@/assets/images/svgs/hospital.svg'
import PatientIcon from '@/assets/images/svgs/patient.svg'
import Title from '@/components/Title'

interface Login {
  icon: ReactNode
  name: string
  bgColor: string
  textColor: string
}

export default function LoginOption() {
  const loginOptions: Login[] = [
    {
      icon: <PatientIcon />,
      name: 'Patient',
      bgColor: 'bg-primary',
      textColor: 'text-white',
    },
    {
      icon: <DoctorIcon />,
      name: 'Doctor',
      bgColor: 'bg-secondary',
      textColor: 'text-white',
    },
    {
      icon: <HospitalIcon />,
      name: 'Hospital',
      bgColor: 'bg-secondary-2',
      textColor: 'text-white',
    },
  ]

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 justify-center items-center">
      <Title animated className="!font-normal">
        Medical
      </Title>

      <p className="font-outfit font-medium text-3xl text-white">Login as a</p>

      <div className="w-full flex justify-between items-center px-5">
        {loginOptions.map((option, index) => (
          <Link to={`/signin?type=${option.name.toLowerCase()}`} key={index}>
            <div className="w-fit h-fit flex flex-col gap-2 justify-center items-center">
              <div
                className={`w-[108px] h-[108px] rounded-[50%] ${option.bgColor} grid place-items-center`}
              >
                {option.icon}
              </div>
              <p
                className={`font-outfit font-medium text-1xl ${option.textColor}`}
              >
                {option.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
