import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Lock, Mail } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

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
    <div className="w-full min-h-screen flex flex-col gap-5 justify-center items-center">
      <Title animated className="!font-normal">
        Medical
      </Title>

      <form
        id="form-rhf-demo"
        className="w-full px-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-text/40" />
                  <Input
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="name@hospital.com"
                    className="pl-10 bg-neutral border-white/10 focus:ring-1 focus:ring-primary h-12"
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
                <FieldLabel htmlFor="form-rhf-demo-password">
                  Password
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-text/40" />
                  <Input
                    id="form-rhf-demo-password"
                    aria-invalid={fieldState.invalid}
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-neutral border-white/10 focus:ring-1 focus:ring-primary h-12"
                    {...field}
                  />
                </div>
                <FieldDescription>forget password</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Field orientation="horizontal" className="px-5">
        <Button
          type="submit"
          form="form-rhf-demo"
          disabled={isLoading}
          className="w-full h-[70px] bg-title-gradient hover:opacity-90 text-white text-[24px] font-outfit font-medium transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In'}
        </Button>
      </Field>
    </div>
  )
}
