import type { AppProps } from "next/app"
import { Geist, Geist_Mono } from "next/font/google"

import trpc from "@/lib/trpc"

import "@/styles/globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <Component {...pageProps} />
    </main>
  )
}

export default trpc.withTRPC(App)
