import type { NextApiRequest, NextApiResponse } from "next"

import { prisma } from "@/server/prisma"

type Data = {
  status: "ok" | "degraded"
  service: string
  timestamp: string
  uptimeSeconds: number
  nodeEnv: string
  commitHash: string
  db: {
    status: "ok" | "error"
    error?: string
  }
}

type ErrorData = {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  const basePayload = {
    service: "mnd-call-dashboard",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    nodeEnv: process.env.NODE_ENV ?? "development",
    commitHash:
      process.env.VERCEL_GIT_COMMIT_SHA ??
      process.env.GIT_COMMIT_SHA ??
      "unknown",
  }

  try {
    await prisma.$queryRaw`SELECT 1`

    return res.status(200).json({
      status: "ok",
      ...basePayload,
      db: {
        status: "ok",
      },
    })
  } catch (error) {
    return res.status(503).json({
      status: "degraded",
      ...basePayload,
      db: {
        status: "error",
        error: error instanceof Error ? error.message : "Database unavailable",
      },
    })
  }
}
