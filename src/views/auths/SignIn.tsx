import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as z from 'zod'
import GoogleIcon from '@/assets/images/svgs/google.svg?react'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  // FieldLabel,
} from '@/components/ui/field'
import { FloatingInput } from '@/components/ui/floating-input'

// import { Input } from '@/components/ui/input'

const loginSchema = z.object({
  email: z.string().email('Enter a valid medical email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function SignIn() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(data: LoginFormValues) {
    console.log('Submitting...', data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <div className="responsive flex flex-col gap-5 md:gap-10 justify-center items-center px-5">
      <Title animated className="font-normal!">
        Medical
      </Title>

      <form
        id="form-rhf-demo"
        className="w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                {/* <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel> */}
                <div className="relative bg-background">
                  <FloatingInput
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="name@hospital.com"
                    className="h-17.5 font-outfit font-medium text-2xl text-text bg-background border-2 border-smoke/30 focus:ring-1 focus:ring-primary"
                    label="Email"
                    {...field}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                {/* <FieldLabel htmlFor="form-rhf-demo-password">
                  Password
                </FieldLabel> */}
                <div className="relative">
                  <FloatingInput
                    id="form-rhf-demo-password"
                    aria-invalid={fieldState.invalid}
                    type="password"
                    placeholder="••••••••"
                    label="Password"
                    className="h-17.5 font-outfit font-medium text-2xl text-text bg-background border-2 border-white/10 focus:ring-1 focus:ring-primary"
                    {...field}
                  />
                </div>
                <FieldDescription className="flex justify-end">
                  <Link
                    to="/forget-password"
                    className="font-outfit font-medium text-base no-underline!"
                  >
                    Forgot Password
                  </Link>
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Field orientation="horizontal">
        <Button
          type="submit"
          form="form-rhf-demo"
          disabled={isLoading}
          className="w-full h-17.5 bg-title-gradient hover:opacity-90 text-white text-2xl font-outfit font-medium transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In'}
        </Button>
      </Field>

      <FieldDescription className="font-outfit font-medium text-2xl mt-4">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="font-outfit font-bold text-2xl text-primary no-underline!"
        >
          Sign Up
        </Link>
      </FieldDescription>

      <FieldDescription className="flex justify-center items-center font-outfit font-medium text-2xl mt-5">
        Or Sign In With
      </FieldDescription>

      <Button
        type="submit"
        form="form-rhf-demo"
        disabled={isLoading}
        className="w-full h-17.5 relative bg-white hover:opacity-90 text-neutral text-2xl font-outfit font-medium transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
      >
        <GoogleIcon className="w-12.5! h-13! absolute left-4 md:left-8" />
        Sign In with Google
      </Button>
    </div>
  )
}
