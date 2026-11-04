import { describe, expect, it } from 'vitest'
import { getRegistrationPayload, registrationSchema } from './signup.utils'

const validRegistration = {
  firstName: 'Ada',
  lastName: 'Okafor',
  email: 'ada@example.com',
  phoneNumber: '+2348012345678',
  role: 'PATIENT' as const,
  password: 'StrongPass1!',
  confirmPassword: 'StrongPass1!',
}

describe('registration validation', () => {
  it('accepts a valid account for each supported role', () => {
    for (const role of ['PATIENT', 'DOCTOR', 'HOSPITAL'] as const) {
      expect(
        registrationSchema.safeParse({ ...validRegistration, role }).success
      ).toBe(true)
    }
  })

  it('rejects mismatched passwords and invalid international phone numbers', () => {
    expect(
      registrationSchema.safeParse({
        ...validRegistration,
        confirmPassword: 'DifferentPass1!',
      }).success
    ).toBe(false)
    expect(
      registrationSchema.safeParse({
        ...validRegistration,
        phoneNumber: '123',
      }).success
    ).toBe(false)
  })

  it('rejects fields the auth service does not accept', () => {
    expect(
      registrationSchema.safeParse({
        ...validRegistration,
        bloodGroup: 'A+',
      }).success
    ).toBe(false)
  })

  it('omits the client-only password confirmation from the API payload', () => {
    const values = registrationSchema.parse(validRegistration)
    expect(getRegistrationPayload(values)).toEqual({
      firstName: 'Ada',
      lastName: 'Okafor',
      email: 'ada@example.com',
      phoneNumber: '+2348012345678',
      role: 'PATIENT',
      password: 'StrongPass1!',
    })
  })
})
