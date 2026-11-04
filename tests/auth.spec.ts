import { expect, test } from '@playwright/test'

test('registers a patient and routes the user to account activation', async ({
  page,
}) => {
  let submittedBody: Record<string, unknown> | undefined
  await page.route('**/auth/signup', async (route) => {
    submittedBody = route.request().postDataJSON() as Record<string, unknown>
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Registration successful. Check your email to activate.',
      }),
    })
  })
  await page.route('**/auth/activate', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Your account is activated.' }),
    })
  })

  await page.goto('/signup?type=patient')
  await page.getByLabel('First name').fill('Ada')
  await page.getByLabel('Last name').fill('Okafor')
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByLabel('Email address').fill('ada@example.com')
  await page
    .getByLabel('Phone number (include country code)')
    .fill('+2348012345678')
  await page.getByLabel('Password', { exact: true }).fill('StrongPass1!')
  await page.getByLabel('Confirm password').fill('StrongPass1!')
  await page.getByRole('button', { name: 'Continue' }).evaluate((element) => {
    if (!(element instanceof HTMLButtonElement)) {
      throw new Error('Expected the continue button.')
    }
    element.click()
  })
  await expect(
    page.getByRole('heading', { name: 'Check your details' })
  ).toBeVisible()
  await Promise.all([
    page.waitForURL('**/activate'),
    page.getByRole('button', { name: 'Create account' }).evaluate((element) => {
      if (!(element instanceof HTMLButtonElement)) {
        throw new Error('Expected the create account button.')
      }
      element.click()
    }),
  ])

  await expect(
    page.getByRole('heading', { name: 'Activate your account' })
  ).toBeVisible()
  expect(submittedBody).toEqual({
    firstName: 'Ada',
    lastName: 'Okafor',
    email: 'ada@example.com',
    phoneNumber: '+2348012345678',
    role: 'PATIENT',
    password: 'StrongPass1!',
  })

  await page.getByLabel('Health ID').fill('PAT-ABCD1234')
  await page.getByLabel('Activation token').fill('a'.repeat(64))
  await page
    .locator('form')
    .first()
    .evaluate((element) => {
      if (!(element instanceof HTMLFormElement)) {
        throw new Error('Expected the activation form.')
      }
      element.requestSubmit()
    })
  await expect(page.getByRole('status')).toContainText(
    'Your account is activated.'
  )
})

test('signs in an existing user and opens the authenticated welcome page', async ({
  page,
}) => {
  await page.route('**/auth/login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          firstName: 'Ada',
          lastName: 'Okafor',
          role: 'PATIENT',
          healthId: 'PAT-ABCD1234',
        },
        meta: { accessToken: 'access-token', refreshToken: 'refresh-token' },
      }),
    })
  })

  await page.goto('/signin')
  await page.getByLabel('Email, phone, or Health ID').fill('ada@example.com')
  await page.getByLabel('Password').fill('StrongPass1!')
  await page.getByRole('button', { name: 'Sign in' }).click()

  await expect(
    page.getByRole('heading', { name: 'Your care journey starts here, Ada' })
  ).toBeVisible()
  await expect(page.getByText('PAT-ABCD1234')).toBeVisible()
})

test('shows offline status and prevents sign-in while disconnected', async ({
  page,
  context,
}) => {
  await page.goto('/signin')
  await context.setOffline(true)

  await expect(page.getByRole('status')).toContainText('You are offline')
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeDisabled()

  await context.setOffline(false)
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeEnabled()
})

test('serves the previously visited app shell while offline', async ({
  page,
  context,
}) => {
  await page.goto('/')
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready
  })
  await page.reload()
  await expect
    .poll(() =>
      page.evaluate(() => navigator.serviceWorker.controller !== null)
    )
    .toBe(true)
  await context.setOffline(true)
  await page.goto('/signin')
  await page.goto('/signin')

  await expect(
    page.getByRole('heading', { name: /Welcome back/ })
  ).toBeVisible()
  await expect(page.getByRole('status')).toContainText('You are offline')
})

test('keeps the welcome screen within a narrow mobile viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 })
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: /Your health, better connected/ })
  ).toBeVisible()
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth)
  ).toBeLessThanOrEqual(360)
})
