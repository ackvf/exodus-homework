// server only env (thanks to eslint configuration)

import { z } from "zod"

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
})

// This will throw if the required env is invalid.
export const serverEnv = serverEnvSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
})
