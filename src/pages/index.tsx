import trpc from "@/lib/trpc"

export default function Home() {
  const hello = trpc.example.hello.useQuery({ text: "client" })

  if (!hello.data) {
    return <p>Loading...</p>
  }

  return <p>{hello.data.greeting}</p>
}
