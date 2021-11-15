import "../styles/globals.css"
import "react-notifications-component/dist/theme.css"
import "bootstrap/dist/css/bootstrap.css"

import { AppProps } from "next/app"
import { Row, Container } from "react-bootstrap"
import ReactNotification from "react-notifications-component"

import Navbar from "../components/Navbar"
import { SessionProvider } from "../contexts/Session"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <Navbar />
      <ReactNotification />
      <Container>
        <Row>
          <Component {...pageProps} />
        </Row>
      </Container>
    </SessionProvider>
  )
}

export default MyApp
