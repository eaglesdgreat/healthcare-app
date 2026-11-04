import { afterEach, describe, expect, it, vi } from 'vitest'
import type { RegistrationValues } from '@/lib/signup.utils'
import {
  activateAccount,
  ApiRequestError,
  register,
  resendActivation,
  signIn,
} from './auth'

const registration: RegistrationValues = {
  firstName: 'Ada',
  lastName: 'Okafor',
  email: 'ada@example.com',
  phoneNumber: '+2348012345678',
  role: 'PATIENT',
  password: 'StrongPass1!',
  confirmPassword: 'StrongPass1!',
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('auth API client', () => {
  it('sends login identifiers and passwords to the gateway contract', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          data: {
            firstName: 'Ada',
            lastName: 'Okafor',
            role: 'PATIENT',
            healthId: 'PAT-ABCD1234',
          },
          meta: { accessToken: 'access', refreshToken: 'refresh' },
        }),
        { status: 200 }
      )
    )
    vi.stubGlobal('fetch', fetchMock)

    await signIn(' ada@example.com ', 'StrongPass1!')

    expect(fetchMock).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_BASE_URL || '/auth'}/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'ada@example.com',
          password: 'StrongPass1!',
        }),
      }
    )
  })

  it('sends only fields supported by the registration endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'Registration successful' }), {
        status: 201,
      })
    )
    vi.stubGlobal('fetch', fetchMock)

    await register(registration)

    const [, options] = fetchMock.mock.calls[0] as [
      string,
      RequestInit | undefined,
    ]
    expect(JSON.parse(String(options?.body))).toEqual({
      firstName: 'Ada',
      lastName: 'Okafor',
      email: 'ada@example.com',
      phoneNumber: '+2348012345678',
      role: 'PATIENT',
      password: 'StrongPass1!',
    })
    expect(String(options?.body)).not.toContain('confirmPassword')
  })

  it('preserves backend error messages and request IDs', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            type: 'Invalid credentials',
            requestId: 'request-123',
            response: { message: 'Invalid credentials' },
          }),
          { status: 401 }
        )
      )
    )

    await expect(signIn('ada@example.com', 'wrong')).rejects.toMatchObject({
      name: 'ApiRequestError',
      message: 'Invalid credentials',
      status: 401,
      requestId: 'request-123',
    } satisfies Partial<ApiRequestError>)
  })

  it('normalizes the Health ID when activating an account', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'Account activated' }), {
        status: 200,
      })
    )
    vi.stubGlobal('fetch', fetchMock)

    await activateAccount(' pat-abcd1234 ', 'activation-token')

    expect(JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body))).toEqual({
      healthId: 'PAT-ABCD1234',
      token: 'activation-token',
    })
  })

  it('requests a replacement activation message with the account identifier', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'Activation email queued' }), {
        status: 200,
      })
    )
    vi.stubGlobal('fetch', fetchMock)

    await resendActivation(' ada@example.com ')

    expect(fetchMock).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_BASE_URL || '/auth'}/resend-activation`,
      expect.objectContaining({
        body: JSON.stringify({ identifier: 'ada@example.com' }),
      })
    )
  })

  it('reports unreachable services instead of pretending a request succeeded', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    )

    await expect(signIn('ada@example.com', 'StrongPass1!')).rejects.toThrow(
      'Unable to reach the healthcare service'
    )
  })
})
