import { act, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import NetworkStatus from './NetworkStatus'

describe('network status', () => {
  it('announces when the browser loses its connection', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    })
    render(<NetworkStatus />)

    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: false,
    })
    act(() => {
      window.dispatchEvent(new Event('offline'))
    })

    expect(screen.getByRole('status')).toHaveTextContent(
      'You are offline. The app shell is available'
    )
  })
})
