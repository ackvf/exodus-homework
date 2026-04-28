import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"

import type { AppRouter } from "@/server/trpc/routers/_app"

export default createTRPCNext<AppRouter>({
  config(config) {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @see https://trpc.io/docs/client/nextjs/pages-router/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,

          async headers() {
            return {}
          },
        }),
      ],
    }
  },
  /**
   * @see https://trpc.io/docs/client/nextjs/pages-router/ssr
   **/
  ssr: false,
})

function getBaseUrl() {
  if (typeof window !== "undefined") return "" // browser should use relative path

  return `http://localhost:${process.env.PORT ?? 3000}`
}
