This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## UI

The shadcn theme and color palette were generated with the [`--preset aInmZG6`](https://ui.shadcn.com/create?preset=aInmZG6&base=base) and [uicolors `#27632e`](https://uicolors.app/generate/27632e).

### Component Library:

- [shadcn/ui themed components](https://ui.shadcn.com/create?preset=aInmZG6&base=base)
- [shadcn/ui component library](https://ui.shadcn.com/docs/components)
- [base-ui primitives ](https://base-ui.com/react/overview/about)

### Shadcn UI

This project uses [shadcn/ui](https://ui.shadcn.com/) with [base-ui primitives](https://base-ui.com/react/overview/about) for UI components.\
Add new components from the [shadcn/ui component library](https://ui.shadcn.com/docs/components) using the CLI:

```bash
pnpm dlx shadcn@latest add <component-name>
```

Configuration file: [**components.json**](components.json)

### Tailwind CSS

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. You can customize the design system by editing the [**globals.css**](src/styles/globals.css) file.

## Getting Started

Requirements:

- Refer to [package.json](package.json)
- Node.js >= 24
- pnpm package manager >= 10

After installing Node.js, initialize `pnpm` in your terminal:

```bash
corepack enable
corepack prepare

# update pnpm
corepack up
```

Then, install dependencies and generate Prisma client:

```bash
pnpm install
pnpm db:generate
```

_note: during installation, pnpm may warn you about ignored build scripts. Allow them by running `pnpm approve-builds`._

And start the Next.js development server (without DB):

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### API Routes and tRPC

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/health](http://localhost:3000/api/health). This endpoint can be edited in [`pages/api/health.ts`](src/pages/api/health.ts).

The rest of the API layer uses [tRPC](https://trpc.io/) for type-safe client-server communication. Manage tRPC routers in [`server/routers`](src/server/routers) and call them from the client using the auto-generated React hooks exported from [`lib/trpc.ts`](src/lib/trpc.ts).

The `pages/api` directory is mapped to `/api/*` urls. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

## Local Development with Docker Compose and PostgreSQL

This repository defines two Docker services:

- `flare-app` (Node 24, Next.js dev server)
- `flare-db` (PostgreSQL 16)

It supports three local development flows.

- ~~Local app + external DB~~ _(TBD, pending remote db)_
- Local app + local Docker DB
- Full Docker stack with mounted local filesystem and live reload

### First copy the [`.env.example`](.env.example) to [`.env`](.env):

```bash
cp .env.example .env
```

### 1) Local app + external DB

> \*! **note: this flow is not set up yet\***

Develop the app locally and connect to a shared managed/remote database.

1. Set `DATABASE_URL` in `.env` to the external database
2. Then run local Next.js development server:

   ```bash
   pnpm dev

   # stop with Ctrl+C
   ```

### 2) Local app + local Docker DB

Fast local app iteration with a disposable local database.

1. Set `DATABASE_URL` in `.env` to your local Docker database
2. Start local DB container and local dev:

   ```bash
   pnpm dev:db  # runs in background
   pnpm dev

   # stop app with Ctrl+C
   # stop DB container with:
   pnpm dev:db:stop
   ```

### 3) Full Docker stack (app + db), local filesystem

For maximum environment parity and hassle-free onboarding.

In this flow, the app container **mounts** your **local project files**, so editing files in VS Code triggers Next.js live reloading/HMR inside the container.

_note: On Windows hosts, Docker bind mounts can miss filesystem events. Polling support is available as an opt-in override [below](#windows-polling-override)._

1. Set `DATABASE_URL` in `.env` to your local Docker database
2. Start full docker stack with:

   ```bash
   pnpm dev:docker  # runs in background

   # stop with:
   pnpm dev:docker:stop
   ```

   _note: the frontend app may take some time to [start](http://localhost:3000/). View logs with `pnpm logs:app`._

_note: this flow creates large docker volumes for `.pnpm-store` and `node_modules`, see [docker-compose volumes](docker-compose.yml) for details. It may take significant time on the first run and install. Subsequent runs will be faster due to caching. To "reinstall" `node_modules`, use `pnpm dev:app:reset`._

#### Windows polling override

If file changes on the host are not detected inside the app container on Windows, copy env variables for polling from [`.env.example`](.env.example).

Alternative is to check out and use the repo in **WSL**. See https://code.visualstudio.com/docs/remote/wsl

### 4) Full Docker stack (app + db), "remote" development

This flow is not implemented, but it may solve live-reload issues by running the app container without mounting the local filesystem, and connecting IDE to the container for "remote" development.

### Troubleshooting and Utility scripts

The [.dockerignore](.dockerignore) file excludes all files except those needed for the app container, which may interfere with certain workflows and tools. If you need to include or exclude additional files, add them and rebuild the app container with `pnpm dev:app:rebuild`.

Since our docker setup runs in the background, use these scripts to follow logs in real time:

- `pnpm logs`: follow logs for all compose services.
- `pnpm logs:db`: follow only database logs.
- `pnpm logs:app`: follow only app logs.

Docker:

- `pnpm dev:db:remove`: remove only `flare-db` container instance (use when container metadata/state is broken and you want a clean container).
- `pnpm dev:db:reset`: remove `flare-db` container and data volume (use when you need a fully clean local database).
- `pnpm dev:app:rebuild`: rebuild the `flare-app` image and recreate `flare-app` container (use after changing `Dockerfile`).
- `pnpm dev:app:reset`: remove `flare-app` container and its volumes (use for package troubleshooting / clean install, equivalent to deleting `node_modules`).
- `pnpm dev:docker:cleanup`: remove the full compose stack, local compose images, and volumes (use when removing/reinstalling the repo).

Database:

- `docker compose exec flare-db psql -U postgres -d flare -c "\dt"`: connect to DB container and list tables (verify DB has schema).

## Database Migrations (Prisma)

Prisma is used for schema management and migrations. The initial migration creates the `users` table with these columns:

- `id` (UUID primary key)
- `email` (unique)
- `name`
- `password`

Create or apply migrations by name:

```bash
pnpm db:migrate --name <migration_name>
```

Use `db:migrate` when you changed Prisma schema in local development and want to create/apply a new migration.

Apply already-created migration files:

```bash
pnpm db:migrate:deploy
```

Use `db:migrate:deploy` when migrations already exist in the repo and you only want to apply them (no new migration creation).

Regenerate Prisma client:

```bash
pnpm db:generate
```

Use `db:generate` after dependency/schema changes when Prisma client types need to be refreshed without running a migration.

Example workflows

- When creating new migration:
  1. Change Prisma schema in `prisma/schema.prisma`
  2. Run `pnpm db:migrate --name add_new_table` to create and apply new migration
  3. This will also regenerate Prisma client _(same as `pnpm db:generate`)_

- When applying existing migrations after pulling changes:
  1. Run `pnpm db:migrate:deploy` to apply all pending migrations
  2. Run `pnpm db:generate` to refresh Prisma client types\
     _(this is technically only needed if there were schema changes that affect types, but it's a good practice to run it to ensure types are up to date)_

- When running in CI pipeline (clean environment without existing migrations):
  1. Install dependencies (`pnpm install --frozen-lockfile`)
  2. Ensure database is reachable and empty or at expected state
  3. Run `pnpm db:migrate:deploy` to apply all migrations
  4. Run `pnpm db:generate` to ensure Prisma client is up to date

## Agents

This project supports AI agents. Refer to [./agents/README.md](.agents/README.md) for guidelines - also useful for **humans**.

### Skills

Discover new skills at https://github.com/vercel-labs/skills or with the CLI:

```sh
# Interactive search (fzf-style)
npx skills find <skill-name>
```

Install with:

```sh
pnpm dlx skills add <skill-name>
```
