# Healthcare App

Responsive patient and provider-facing healthcare booking application built with React, TypeScript, and Vite. The current milestone implements the public authentication and account onboarding experience and is designed to communicate with backend services only through an API gateway.

## Frontend flow and roadmap

See [DESIGN.md](./DESIGN.md) for the user journeys, screen flow, gateway contract, offline behavior, and phased product plan.

### Current milestone

- Choose a Patient, Doctor, or Hospital account type.
- Register with the fields accepted by the authentication service.
- Activate a pending account with its Health ID and emailed token.
- Sign in with an email, phone number, or Health ID.
- Keep the public app shell available offline and clearly explain when network access is required.
- Show a signed-in welcome page based on the authenticated profile.

Appointment discovery, appointment management, medical-record synchronization, password reset, and provider subscriptions are not represented as working features until their APIs are available.

## Requirements

- Node.js 24+
- pnpm (the package manager used by this repository)
- The Traefik API gateway, configured to route `/auth/*` requests to the auth microservice and strip the `/auth` prefix before forwarding, and `/users/*` requests to the auth service without rewriting. The auth NestJS controllers expose `/login`, `/signup`, `/activate`, `/refresh`, `/logout`, `/google`, and `/resend-activation` at their service root.

The browser must never call internal microservice addresses directly. For local development, create an untracked `.env.local` file:

```dotenv
# Same-origin gateway path (recommended) or an absolute gateway URL ending in /auth.
VITE_API_BASE_URL=/auth
```

For local development, Vite forwards `/auth/*` to the gateway on the Docker network. When running Vite directly on the host, its proxy target defaults to `http://localhost:8080`; set `VITE_API_GATEWAY_URL` in `.env.local` only to override that target. The gateway is bound to `127.0.0.1:8080` in the local Compose setup. Do not put secrets in `VITE_*` variables.

## Development

Run the development server directly:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Or start the hot-reloading Docker development environment:

```bash
make start
```

Start the gateway and frontend first with `make start`; then start the auth and notification services from their repositories. The shared `healthcare-internal` Docker network lets the gateway reach Auth and Auth reach Notification without exposing either API port publicly. The app is available at `http://localhost:5173`, and the gateway at `http://localhost:8080`. Use `make stop` to stop the gateway and frontend.

The Makefile shortcuts require GNU Make and Docker Compose v2. Without GNU Make, start the same development stack with `docker compose up --detach --build`.

## Checks

```bash
pnpm run typecheck
pnpm test
pnpm build
pnpm lint
pnpm test:e2e
```

The same checks are available through `make typecheck`, `make test`, and other Makefile targets. Build before running Playwright locally; the browser suite uses the production preview so it exercises the same service worker and asset caching as the container.

## Container

Build and run the static production frontend container:

```bash
docker build --build-arg VITE_API_BASE_URL=/auth -t healthcare-app .
docker run --rm -p 8080:80 healthcare-app
```

`make build-release` and `make run-release` provide the same release workflow.

The container serves the SPA and service worker. Route browser `/auth/*` and `/users/*` requests through the API gateway; do not expose auth microservice ports directly to the browser. Notification's current API uses a service API key and is not routed to clients. Health, metrics, and observability administration endpoints remain private. The local gateway binds to loopback; production deployments should terminate TLS at the deployment ingress and apply equivalent private-network and rate-limit policies.

## Testing

- Vitest and Testing Library cover validation, API behavior, and interactive React flows.
- Playwright covers registration/authentication, responsive layout, and offline status behavior.
- GitHub Actions runs typecheck, lint, unit/integration tests, production build, end-to-end tests, Docker Compose validation, and a Docker build for pushes and pull requests to `main` and `master`.

## Figma

The supplied [Medical APP community design](https://www.figma.com/design/DhURQRAJVUA6XhUelK7VL2/Medical-APP--Community-?node-id=11-562) requires Figma access to inspect. The implementation follows the repository's existing Medical branding and responsive direction.
