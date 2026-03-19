import type { ReactNode } from 'react'

interface TitleProps {
  children: ReactNode
  animated?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
}

const Title = ({
  children,
  animated = false,
  as: Component = 'h1',
  className = '',
}: TitleProps) => {
  const baseClasses = 'font-versatylo font-bold heading-1'
  const gradientClasses = animated ? 'text-gradient-animated' : 'text-gradient'

  return (
    <Component className={`${baseClasses} ${gradientClasses} ${className}`}>
      {children}
    </Component>
  )
}

export default Title
