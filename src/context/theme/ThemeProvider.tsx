import type { ReactNode } from 'react'
import { theme, ThemeContext } from './ThemeContext'

// Provider component
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={{ state: theme, dispatch: () => null }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
