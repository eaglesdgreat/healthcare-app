import * as z from 'zod'

export const userRoles = ['PATIENT', 'DOCTOR', 'HOSPITAL'] as const
export const userRoleSchema = z.enum(userRoles)
export type UserRole = z.infer<typeof userRoleSchema>

export const registrationSchema = z
  .object({
    firstName: z.string().trim().min(1, 'Enter your first name').max(100),
    lastName: z.string().trim().min(1, 'Enter your last name').max(100),
    email: z.email('Enter a valid email address').max(255),
    phoneNumber: z
      .string()
      .trim()
      .regex(
        /^\+?[0-9]{10,15}$/,
        'Enter a valid phone number, including country code'
      ),
    role: userRoleSchema,
    password: z
      .string()
      .min(8, 'Use at least 8 characters')
      .max(72, 'Password must be 72 characters or fewer')
      .regex(/[A-Z]/, 'Add at least one uppercase letter')
      .regex(/[a-z]/, 'Add at least one lowercase letter')
      .regex(/[0-9]/, 'Add at least one number')
      .regex(/[^A-Za-z0-9]/, 'Add at least one special character'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .strict()
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegistrationValues = z.infer<typeof registrationSchema>

export function getRegistrationPayload(values: RegistrationValues) {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phoneNumber: values.phoneNumber,
    role: values.role,
    password: values.password,
  }
}
