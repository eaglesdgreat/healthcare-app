import * as z from 'zod'

// Step 1: Identity (The "Who")
const identitySchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
    error: () => ({ message: 'Please select your gender at birth' }),
  }),
})

// Step 2: Contact & Security (The "Access")
const contactSchema = z.object({
  email: z.email('Invalid medical email address').optional().nullable(),
  phone: z.string().min(10, 'Enter a valid phone number'),
  password: z
    .string()
    .min(8, 'Security requires at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    ),
})

// Step 3: Clinical Baseline (The "Safety")
const medicalSchema = z.object({
  bloodGroup: z.string().min(1, 'Blood group is required for your Health ID'),
  genotype: z.string().min(1, 'Genotype is required for your Health ID'),
  allergies: z.string().optional(),
  emergencyContactPhone: z
    .string()
    .min(10, 'Emergency contact phone is required'),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
})

// The Final Master Schema
export const registrationSchema = identitySchema
  .extend(contactSchema.shape)
  .extend(medicalSchema.shape)
export type RegistrationValues = z.infer<typeof registrationSchema>

export const bloodGroups = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
]

export const genotypes = [
  { label: 'AA', value: 'AA' },
  { label: 'AS', value: 'AS' },
  { label: 'SS', value: 'SS' },
  { label: 'AC', value: 'AC' },
]
