import * as z from 'zod'
import type { RegistrationValues, UserRole } from '@/lib/signup.utils'
import { getRegistrationPayload } from '@/lib/signup.utils'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/auth').replace(
  /\/+$/,
  ''
)

const messageSchema = z.object({ message: z.string() })
const loginResponseSchema = z.object({
  data: z
    .object({
      id: z.string().optional(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().nullable().optional(),
      phoneNumber: z.string().nullable().optional(),
      healthId: z.string().nullable().optional(),
      role: z.enum(['PATIENT', 'DOCTOR', 'HOSPITAL', 'ADMIN']),
    })
    .passthrough(),
  meta: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
})

export type AuthUser = z.infer<typeof loginResponseSchema>['data']
export type LoginResponse = z.infer<typeof loginResponseSchema>

export class ApiRequestError extends Error {
  readonly status?: number
  readonly requestId?: string

  constructor(message: string, status?: number, requestId?: string) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.requestId = requestId
  }
}

function getErrorDetails(payload: unknown) {
  if (typeof payload !== 'object' || payload === null) return {}

  const body = payload as Record<string, unknown>
  const response =
    typeof body.response === 'object' && body.response !== null
      ? (body.response as Record<string, unknown>)
      : undefined
  const candidate = response?.message ?? body.message ?? body.type
  const message = Array.isArray(candidate)
    ? candidate
        .filter((item): item is string => typeof item === 'string')
        .join(' ')
    : typeof candidate === 'string'
      ? candidate
      : undefined
  const requestId =
    typeof body.requestId === 'string' ? body.requestId : undefined

  return { message, requestId }
}

async function post(path: string, body: unknown): Promise<unknown> {
  let response: Response

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch (error) {
    if (error instanceof TypeError) {
      throw new ApiRequestError(
        'Unable to reach the healthcare service. Check your connection and try again.'
      )
    }
    throw error
  }

  const text = await response.text()
  let payload: unknown

  if (text) {
    try {
      payload = JSON.parse(text)
    } catch (error) {
      if (response.ok) {
        throw new ApiRequestError(
          'The healthcare service returned an unreadable response.',
          response.status
        )
      }
      if (!(error instanceof SyntaxError)) throw error
    }
  }

  if (!response.ok) {
    const details = getErrorDetails(payload)
    throw new ApiRequestError(
      details.message ?? `The request failed (${response.status}).`,
      response.status,
      details.requestId
    )
  }

  return payload
}

function parseResponse<T>(schema: z.ZodType<T>, payload: unknown): T {
  const result = schema.safeParse(payload)
  if (!result.success) {
    throw new ApiRequestError(
      'The healthcare service returned an unexpected response.'
    )
  }
  return result.data
}

export async function signIn(username: string, password: string) {
  const payload = await post('/login', { username: username.trim(), password })
  return parseResponse(loginResponseSchema, payload)
}

export async function register(values: RegistrationValues) {
  const payload = await post('/signup', getRegistrationPayload(values))
  return parseResponse(messageSchema, payload)
}

export async function activateAccount(healthId: string, token: string) {
  const payload = await post('/activate', {
    healthId: healthId.trim().toUpperCase(),
    token: token.trim(),
  })
  return parseResponse(messageSchema, payload)
}

export async function resendActivation(identifier: string) {
  const payload = await post('/resend-activation', {
    identifier: identifier.trim(),
  })
  return parseResponse(messageSchema, payload)
}

export async function signOut(refreshToken: string) {
  const payload = await post('/logout', { refreshToken })
  return parseResponse(messageSchema, payload)
}

export async function refreshSession(refreshToken: string) {
  const tokenPairSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  })
  const payload = await post('/refresh', { refreshToken })
  return parseResponse(tokenPairSchema, payload)
}

export async function signInWithGoogle(idToken: string, role?: UserRole) {
  const payload = await post('/google', { idToken, role })
  return parseResponse(loginResponseSchema, payload)
}
