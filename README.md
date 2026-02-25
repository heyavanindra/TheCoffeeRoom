# TheCoffeeRoom (DoodleJam)

A collaborative drawing / whiteboard app with **rooms**, **real-time updates** over WebSockets, and **persistence** in Postgres.

This repository is a **pnpm + Turborepo monorepo** with:

- **Frontend**: Next.js app
- **Backend API**: Express server (Better Auth + REST endpoints)
- **WebSocket server**: `ws` server for realtime collaboration
- **Worker**: BullMQ worker that persists shape updates to Postgres

---

## What’s inside

### Apps

- **`apps/frontend`**: Next.js (React) UI
- **`apps/backend`**: Express API (`/room`, `/shapes`, and Better Auth routes under `/api/auth/*`)
- **`apps/ws`**: WebSocket server (validates JWT via JWKS from the backend auth endpoint)
- **`apps/worker`**: Background worker consuming BullMQ jobs and updating the `Room.shapes` JSON array in Postgres

### Packages

- **`packages/database` (`@repo/db`)**: Prisma + generated client
- **`packages/auth` (`@repo/auth`)**: Better Auth server/client setup (Prisma adapter)
- **`packages/queue` (`@repo/queue`)**: BullMQ + Redis connection helpers
- **`packages/common` (`@repo/common`)**: Shared Zod schemas
- **`packages/ui`**: Shared UI primitives

---

## Tech stack

- **Language**: TypeScript
- **Monorepo**: pnpm workspaces, Turborepo
- **Frontend**: Next.js 15, React 19, Tailwind CSS, Radix UI
- **API**: Express 5, Better Auth
- **Realtime**: `ws` + `jose` (JWT verification + JWKS)
- **DB**: Postgres + Prisma
- **Queue/Worker**: Redis + BullMQ + ioredis
- **Build**: esbuild (API/WS/worker bundling)

---

## Prerequisites (local development)

- **Node.js**: \(>= 18\) (recommended: a recent LTS)
- **pnpm**: enabled via Corepack
- **Postgres** and **Redis** (either installed locally or run via Docker)

Enable pnpm once:

```bash
corepack enable
```

Install dependencies:

```bash
pnpm install
```

---

## Setup with Docker (recommended)

This repo includes a dev compose file that runs everything you need: Postgres, Redis, backend, ws, worker, and frontend.

### 1) Create `.env`

Copy the root env template and fill the values:

```bash
cp .env.example .env
```

At minimum, you’ll want sensible local values like:

- **`CLIENT_URL`**: `http://localhost:3000`
- **`NEXT_PUBLIC_BASE_URL`**: `http://localhost:4000`
- **`BETTER_AUTH_URL`**: `http://localhost:4000`
- **`AUTH_URL`** (used by WS server to fetch JWKS): `http://backend:4000` in Docker

The compose file also injects defaults for DB/Redis URLs for containers.

### 2) Start all services

```bash
docker compose -f docker-compose.yaml up --build
```

### 3) Run database migrations (first time)

With Postgres running, apply Prisma migrations from your host machine:

```bash
pnpm --filter @repo/db db:migrate
pnpm --filter @repo/db db:generate
```

### 4) Open the app

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:4000`
- **WebSocket**: `ws://localhost:8000`

---

## Setup without Docker (run everything locally)

### 1) Start Postgres + Redis

Make sure you have:

- Postgres running (default: `localhost:5432`)
- Redis running (default: `localhost:6379`)

### 2) Create env files

Some services load env from their working directory. The repo provides templates:

- Root: `.env.example`
- Backend: `apps/backend/.env.example`
- WS: `apps/ws/.env.example`
- Worker: `apps/worker/.env.example`
- Auth package: `packages/auth/.env.example`
- Database package: `packages/database/.env.example`

Create the `.env` files you need:

```bash
cp .env.example .env
cp apps/backend/.env.example apps/backend/.env
cp apps/ws/.env.example apps/ws/.env
cp apps/worker/.env.example apps/worker/.env
cp packages/auth/.env.example packages/auth/.env
cp packages/database/.env.example packages/database/.env
```

Minimum values you typically need for local dev:

- **Postgres**: `DATABASE_URL=postgresql://<user>:<pass>@localhost:5432/<db>`
- **Frontend**:
  - `NEXT_PUBLIC_BASE_URL=http://localhost:4000`
  - `NEXT_PUBLIC_WEB_SOCKET_URL=ws://localhost:8000` (or `http://localhost:8000` depending on your client usage)
  - `NEXT_PUBLIC_BETTER_AUTH_REDIRECT_URL=http://localhost:4000` (used in the login flow)
- **Backend**:
  - `PORT=4000`
  - `CLIENT_URL=http://localhost:3000`
  - `BETTER_AUTH_URL=http://localhost:4000`
  - `BETTER_AUTH_SECRET=...`
- **WS**:
  - `PORT=8000`
  - `AUTH_URL=http://localhost:4000`
  - `BETTER_AUTH_URL=http://localhost:4000`
- **Worker / Queue**:
  - `REDIS_HOST=localhost`
  - `REDIS_PORT=6379`

### 3) Migrate + generate Prisma client

```bash
pnpm --filter @repo/db db:migrate
pnpm --filter @repo/db db:generate
```

### 4) Run the dev stack

From the repo root, start everything with Turborepo:

```bash
pnpm dev
```

Notes:

- `apps/ws` runs in watch mode.
- `apps/frontend` runs `next dev`.
- `apps/backend` and `apps/worker` build then start (you may need to restart them to pick up changes).
- The worker relies on environment variables being present in its process; if you’re not using Docker Compose, ensure your shell exports the needed variables (or start it with an env loader).

---

## Useful commands

From the repo root:

```bash
pnpm dev          # run all apps (Turbo)
pnpm build        # build all packages/apps
pnpm lint         # lint across the monorepo
pnpm check-types  # typecheck across the monorepo
pnpm format       # prettier over ts/tsx/md
```

Database (Prisma):

```bash
pnpm --filter @repo/db db:migrate
pnpm --filter @repo/db db:generate
pnpm --filter @repo/db db:deploy
```

---

## Production / Docker images

There’s also `docker-compose.prod.yaml` which references published images (GitHub Container Registry) for:

- backend
- ws
- worker
- frontend

To run it:

```bash
docker compose -f docker-compose.prod.yaml up
```

Make sure your `.env` is configured for production (DB connection, auth secrets, URLs, Redis, etc.).

---

## Contributing

Contributions are welcome.

### Development workflow

- **Install**: `pnpm install`
- **Run**: `pnpm dev`
- **Before opening a PR**:
  - `pnpm lint`
  - `pnpm check-types`
  - `pnpm format`

### PR guidelines

- Keep PRs **small and focused**
- Include a clear description of **what** changed and **why**
- If your change touches API/WS behavior, include a short **manual test plan** (what you clicked / what you verified)

---

## Troubleshooting

- **Prisma can’t connect**: verify `DATABASE_URL` and that Postgres is reachable.
- **WS auth fails**: ensure `AUTH_URL` points to the backend base URL (WS server fetches JWKS from `AUTH_URL/api/auth/jwks`).
- **Nothing persists**: confirm Redis is running and the **worker** is up (it consumes the shapes queue and writes to Postgres).