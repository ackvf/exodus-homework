import { getIronSession } from 'iron-session'

import { plaidClient, sessionOptions } from '@/services/plaid'

export default function Dashboard({ balance }: { balance: any }) {
  return Object.entries(balance).map((entry, i) => (
    <>
      <hr />
      <pre key={i}>
        <code>{JSON.stringify(entry[1], null, 2)}</code>
      </pre>
    </>
  ))
}

export async function getServerSideProps({ req, res }: any) {
  const session = await getIronSession(req, res, sessionOptions)
  //@ts-expect-error
  const access_token = session.access_token

  if (!access_token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const response = await plaidClient.accountsBalanceGet({ access_token })
  return {
    props: {
      balance: response.data,
    },
  }
}
