import Head from "next/head"
import { Container } from "react-bootstrap"

import AuthenticatedPage from "components/layouts/AuthenticatedPage"
import { useSession } from "contexts/Session"

const Home = () => {
  const { currentUser } = useSession()

  return (
    <>
      <Head>
        <title>App Client Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthenticatedPage>
        <Container>You are logged in as {currentUser?.email} </Container>
      </AuthenticatedPage>
    </>
  )
}

export default Home
