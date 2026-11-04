# Healthcare frontend design flow

## Product plan

The app is a free patient-facing booking service with paid subscriptions for doctors and hospitals. Patient booking and clinical data remain private; providers receive role-appropriate tools and subscription entitlements. This delivery is the frontend foundation for the existing identity service, not a claim that appointment or payment APIs are already implemented.

### Milestones

1. **Authentication and onboarding (this milestone):** select a role, create an account, activate it, sign in, and reach a role-aware welcome page. Integrate with the existing auth service through the API gateway.
2. **Provider discovery and booking:** add verified provider/hospital search, availability, appointment booking, cancellation, reminders, and patient appointment history after those service contracts are ready.
3. **Safe offline access:** cache a minimal, user-approved set of records in encrypted browser storage; define device unlock, expiry, consent, revocation, conflict resolution, and idempotent sync before queuing any clinical mutation. Never queue credentials or silently sync medical changes.
4. **Provider subscriptions:** add provider plan selection, checkout, billing status, renewals, and entitlement enforcement after the payment service is ready. Patient access remains free.
5. **Production readiness:** accessibility and assistive-technology review, localization, observability, performance budgets, and end-to-end testing against a staging gateway.

## User and screen flow

```text
Welcome
  ├─ Sign in ── Choose account type ── Identifier + password
  │                                        └─ Existing account ── Welcome dashboard
  └─ Create account ── Choose account type ── Identity
                                               └─ Contact + password
                                                    └─ Review and submit
                                                         └─ Pending activation
                                                              └─ Health ID + email token
                                                                   └─ Sign in
                                                                        └─ Welcome dashboard

Any screen ── Connectivity lost ── Offline banner + cached public app shell
                                      └─ Authentication writes remain unavailable
```

### Screen behavior

- **Welcome:** explain the patient/provider purpose, offer sign-in and registration, and expose an always-visible connection state.
- **Account type:** Patient, Doctor, or Hospital selection is carried into sign-in/registration and mapped to the backend's `PATIENT`, `DOCTOR`, and `HOSPITAL` roles. `ADMIN` is never user-selectable.
- **Sign-in:** accept email, international phone number, or Health ID as the backend's `username`; show inline validation, loading, server errors, and a pending-activation route when applicable.
- **Registration:** submit only `firstName`, `lastName`, `email`, `phoneNumber`, `role`, and `password`. The auth API rejects unknown fields, so dates of birth, gender, allergies, and emergency-contact details must not be sent until a profile API accepts them.
- **Activation:** submit `healthId` and the token delivered by email. The API returns a message, not a session; successful activation returns the user to sign-in.
- **Existing-user onboarding:** after successful sign-in, show the authenticated name, role, and Health ID where present, orient the user to the next service milestone, and provide sign-out. Do not fabricate appointments, providers, or medical data.
- **Password recovery:** the inspected auth service has no reset-password endpoint. Do not collect an email or display a false success state; add recovery after an API contract exists.
- **Google sign-in:** the API accepts a Google `idToken`, but the frontend OAuth client ID/setup is not part of this milestone. Enable only after the client identity flow is configured.

## API gateway integration

The frontend talks only to the API gateway. Configure `VITE_API_BASE_URL` as a same-origin `/auth` path or a public gateway origin ending in `/auth`. The current auth service controller methods are rooted at `/login`, `/signup`, `/activate`, `/refresh`, `/logout`, `/google`, and `/resend-activation`. Consequently, the gateway must match public `/auth/*` traffic, remove the `/auth` prefix, and forward the remaining path to the auth service. The gateway must also allow the frontend origin when cross-origin deployment is used.

| Frontend operation | Gateway request                | Request body                                                  | Successful response                                   |
| ------------------ | ------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------- |
| Sign in            | `POST /auth/login`             | `{ username, password }`                                      | `{ data: user, meta: { accessToken, refreshToken } }` |
| Register           | `POST /auth/signup`            | `{ firstName, lastName, email, phoneNumber, role, password }` | `{ message }` (account awaits activation)             |
| Activate           | `POST /auth/activate`          | `{ healthId, token }`                                         | `{ message }`                                         |
| Resend activation  | `POST /auth/resend-activation` | `{ identifier }`                                              | `{ message }`                                         |
| Refresh session    | `POST /auth/refresh`           | `{ refreshToken }`                                            | `{ accessToken, refreshToken }`                       |
| Sign out           | `POST /auth/logout`            | `{ refreshToken }`                                            | `{ message }`                                         |

Auth failures use the backend's structured exception response and may include a `requestId`; retain that ID in user-facing support diagnostics without exposing tokens or passwords.

## Offline and privacy behavior

- A service worker caches the application shell and static assets for repeat visits. API responses, tokens, credentials, and health records are never put in Cache Storage.
- A persistent connection banner reports offline/online transitions. Network-required actions remain available to edit but submission explains that a connection is required; credentials and clinical data are not written to local storage or an offline queue.
- Access and refresh tokens remain in the in-memory session for this milestone. A reload requires signing in again; do not move refresh tokens into local storage. A future backend cookie/session contract can improve persistence.
- Offline authentication is not claimed. A service worker cannot validate credentials or safely authorize new sessions without a server.
- Offline medical records require an explicit encrypted-storage, consent, device-lock, expiration, and revocation design before implementation. Appointment write queues also require API idempotency and conflict-resolution rules.

## Responsive and accessible design

- Mobile-first single-column forms, thumb-sized controls, visible keyboard focus, semantic labels, inline field errors, and announced connection/submission status.
- Tablet and desktop use a bounded form width and role cards that expand into a grid; small screens stack cards and actions without horizontal scrolling.
- Respect reduced-motion preferences and maintain readable contrast across the existing Medical color palette.
- Keep error messages near their fields and provide a clear, retryable network/server error state.

## Product suggestions

- Make account activation discoverable with a resend action and a clear cooldown message.
- Add accessibility, localization, and low-data testing to acceptance criteria, especially for regions with unstable mobile networks.
- Use a backend-owned provider verification process and clear subscription entitlements; never make patient access dependent on provider billing.
- Keep urgent-care messaging and emergency-service directions available without implying that the app is an emergency response channel.
