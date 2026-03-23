import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as z from 'zod'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError } from '@/components/ui/field'
import { FloatingInput } from '@/components/ui/floating-input'

const schema = z.object({
  email: z.string().email('Enter a valid medical email'),
})

type FormValues = z.infer<typeof schema>

export default function ForgetPassword() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(data: FormValues) {
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
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="relative bg-background">
                <FloatingInput
                  id="form-rhf-demo-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="name@hospital.com"
                  className="h-17.5 font-outfit font-medium text-2xl text-text bg-background border-2 border-smoke/30 focus:ring-1 focus:ring-primary"
                  label="Email Address"
                  {...field}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </form>

      <Field orientation="horizontal">
        <Button
          type="submit"
          form="form-rhf-demo"
          disabled={isLoading}
          className="w-full h-17.5 bg-title-gradient hover:opacity-90 text-white text-2xl font-outfit font-medium transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit'}
        </Button>
      </Field>

      <FieldDescription className="flex justify-center items-center mt-6">
        <Link
          to="/signin"
          className="font-outfit font-medium text-lg no-underline!"
        >
          Login Back
        </Link>
      </FieldDescription>
    </div>
  )
}
