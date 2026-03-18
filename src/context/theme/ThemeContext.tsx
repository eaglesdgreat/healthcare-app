// import { ReactNode } from 'react'
import { contextFactory } from '../contextFactory'

// Define theme type
type Theme = {
  colors: {
    primary: string
    secondary: string
    secondary2: string
    neutral: string
    white: string
    background: string
    text: string
    border: string
  }
  fonts: {
    versatylo: string
    outfit: string
  }
  gradients: {
    title: string
  }
}

// Theme values
export const theme: Theme = {
  colors: {
    primary: '#6549D5',
    secondary: '#E33FA1',
    secondary2: '#FB5343',
    neutral: '#0F0F11',
    white: '#FFFFFF',
    background: '#060606',
    text: '#ACACAC',
    border: '#FFFFFF',
  },
  fonts: {
    versatylo: 'Versatylo Rounded, sans-serif',
    outfit: 'Outfit, sans-serif',
  },
  gradients: {
    title: 'linear-gradient(135deg, #6549D5, #E33FA1, #FB5343)',
  },
}

// Custom hook to use theme and them context to be used by provider
export const [useTheme, ThemeContext] = contextFactory<Theme, null>(theme)
