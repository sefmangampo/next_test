import React from "react"

import Head from "next/head"
import { useRouter } from "next/router"
import { Card } from "react-bootstrap"

import { SignUpForm } from "components/SessionForms"
import {
  CardWrapper,
  FooterLinkContainer,
  StyledCard,
  StyledLink,
} from "components/SessionForms/styles"

const SignIn = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CardWrapper>
        <StyledCard>
          <Card.Body>
            <SignUpForm />
          </Card.Body>
          <Card.Footer>
            <FooterLinkContainer>
              <StyledLink onClick={() => router.push("/signin")}>
                Sign in
              </StyledLink>
              <StyledLink onClick={() => router.push("/forgot-password")}>
                Forgot Password
              </StyledLink>
            </FooterLinkContainer>
          </Card.Footer>
        </StyledCard>
      </CardWrapper>
    </>
  )
}

export default SignIn
