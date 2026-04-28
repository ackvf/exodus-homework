import { procedure as p, router } from "@/server/trpc"
import { exampleRouter } from "@/server/trpc/routers/example"

export const appRouter = router({
  // http://localhost:3000/api/trpc/example.<route>
  example: exampleRouter,
  // http://localhost:3000/api/trpc/health
  health: p.query(() => {
    return {
      status: "ok",
    }
  }),
})

export type AppRouter = typeof appRouter
