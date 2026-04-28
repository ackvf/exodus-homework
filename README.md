This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

### Shadcn UI

This project uses [shadcn/ui](https://ui.shadcn.com/) with [base-ui primitives](https://base-ui.com/react/overview/about) for UI components.

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

Then, install dependencies:
```bash
pnpm install
```

And start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### API Routes and tRPC

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/health](http://localhost:3000/api/health). This endpoint can be edited in [`pages/api/health.ts`](src/pages/api/health.ts).

The rest of the API layer uses [tRPC](https://trpc.io/) for type-safe client-server communication. Manage tRPC routers in [`server/routers`](src/server/routers) and call them from the client using the auto-generated React hooks exported from [`lib/trpc.ts`](src/lib/trpc.ts).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

## Agents

This project supports AI agents. Refer to [AGENTS.md](AGENTS.md) for guidelines - also useful for **humans**.
