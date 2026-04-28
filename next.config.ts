import type { NextConfig } from "next"

const usePolling = process.env.TURBOPACK_POLLING === "true"
const pollIntervalMs = Number(process.env.TURBOPACK_POLLING_INTERVAL ?? "1000")

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  watchOptions: usePolling ? { pollIntervalMs } : undefined,
}

export default nextConfig
