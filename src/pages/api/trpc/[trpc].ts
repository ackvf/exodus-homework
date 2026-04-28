import * as trpcNext from "@trpc/server/adapters/next"

import { logger } from "@/server/lib/logger.server"
import { appRouter } from "@/server/trpc/routers/_app"

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
  onError: ({ path, error, type }) => {
    logger.error("[trpc] unhandled error", {
      path,
      type,
      message: error.message,
      code: error.code,
      cause: error.cause,
    })
  },
})
