import * as z from 'zod'

// Step 1: Identity (The "Who")
const identitySchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  gender: z.enum(['male', 'female', 'other'], {
    error: () => ({ message: 'Please select your gender at birth' }),
  }),
})

// Step 2: Contact & Security (The "Access")
const contactSchema = z.object({
  email: z.string().email('Invalid medical email address'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  password: z.string().min(8, 'Security requires at least 8 characters'),
})

// Step 3: Clinical Baseline (The "Safety")
const medicalSchema = z.object({
  bloodGroup: z.string().min(1, 'Blood group is required for your Health ID'),
  allergies: z.string().optional(),
  emergencyContact: z.string().min(10, 'Emergency contact is required'),
})

// The Final Master Schema
export const registrationSchema = identitySchema
  .merge(contactSchema)
  .merge(medicalSchema)
export type RegistrationValues = z.infer<typeof registrationSchema>
