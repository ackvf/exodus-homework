import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { procedure as p, router } from "@/server/trpc"

export const exampleRouter = router({
  // http://localhost:3000/api/trpc/example.hello?input={%22text%22:%22world%22}
  hello: p
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async (opts) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        greeting: `hello ${opts.input.text}`,
      }
    }),
  // http://localhost:3000/api/trpc/example.bye
  bye: p.query(() => {
    // Throw an error to test error handling and logging
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Intentional test failure",
    })
  }),
})
