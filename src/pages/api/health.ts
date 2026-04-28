import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  status: "ok";
  service: string;
  timestamp: string;
  uptimeSeconds: number;
  nodeEnv: string;
  commitHash: string;
}

type ErrorData = {
  error: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  return res.status(200).json({
    status: "ok",
    service: "mnd-call-dashboard",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    nodeEnv: process.env.NODE_ENV ?? "development",
    commitHash:
      process.env.VERCEL_GIT_COMMIT_SHA ??
      process.env.GIT_COMMIT_SHA ??
      "unknown",
  })
}
