import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import DoctorIcon from '@/assets/images/svgs/doctor.svg?react'
import HospitalIcon from '@/assets/images/svgs/hospital.svg?react'
import PatientIcon from '@/assets/images/svgs/patient.svg?react'
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
    <div className="responsive flex flex-col gap-5 md:gap-10 justify-center items-center">
      <Title animated className="font-normal!">
        Medical
      </Title>

      <p className="font-outfit font-medium text-3xl text-white">Login as a</p>

      <div className="w-full flex justify-between items-center px-5">
        {loginOptions.map((option, index) => (
          <Link to={`/signin?type=${option.name.toLowerCase()}`} key={index}>
            <div className="w-fit h-fit flex flex-col gap-2 justify-center items-center">
              <div
                className={`w-27 h-27 rounded-[50%] ${option.bgColor} grid place-items-center`}
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
