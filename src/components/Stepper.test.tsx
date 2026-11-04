import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Stepper from './Stepper'

describe('registration stepper', () => {
  it('validates each step and submits the selected role and account details', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(<Stepper onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('First name'), 'Ada')
    await user.type(screen.getByLabelText('Last name'), 'Okafor')
    await user.click(screen.getByLabelText('Doctor'))
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(
      screen.getByRole('heading', { name: 'Set up your account' })
    ).toBeInTheDocument()
    await user.type(screen.getByLabelText('Email address'), 'ada@example.com')
    await user.type(
      screen.getByLabelText('Phone number (include country code)'),
      '+2348012345678'
    )
    await user.type(screen.getByLabelText('Password'), 'StrongPass1!')
    await user.type(screen.getByLabelText('Confirm password'), 'StrongPass1!')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(
      screen.getByRole('heading', { name: 'Check your details' })
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Create account' }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'Ada',
        lastName: 'Okafor',
        role: 'DOCTOR',
        email: 'ada@example.com',
      })
    )
  })

  it('does not advance when the current step is invalid', async () => {
    const user = userEvent.setup()
    render(<Stepper onSubmit={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(
      screen.getByRole('heading', { name: 'Tell us who you are' })
    ).toBeInTheDocument()
    expect(screen.getByText('Enter your first name')).toBeInTheDocument()
  })
})
