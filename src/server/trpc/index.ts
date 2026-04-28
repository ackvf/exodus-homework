import { initTRPC } from "@trpc/server"

import { logger } from "@/server/lib/logger.server"

const t = initTRPC.create()

const loggingMiddleware = t.middleware(async ({ path, type, next }) => {
	const start = Date.now()

	try {
		const result = await next()

		logger.info("[trpc] request", {
			path,
			type,
			ok: result.ok,
			durationMs: Date.now() - start,
		})

		return result
	} catch (error) {
		logger.error("[trpc] request failed", {
			path,
			type,
			durationMs: Date.now() - start,
			error,
		})

		throw error
	}
})

export const router = t.router
export const procedure = t.procedure.use(loggingMiddleware)
