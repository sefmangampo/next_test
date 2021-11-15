import React, { useState } from "react"

import { Formik, Form, FormikHelpers, ErrorMessage } from "formik"
import {
  Button,
  Card,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap"
import { WretcherError } from "wretch"
import * as Yup from "yup"

import { signin } from "api/user"
import { useSession } from "contexts/Session"

import { SignInFormFields } from "./types"

interface FormFields extends SignInFormFields {
  base?: string
}

const SignIn = () => {
  const initial = { email: "", password: "" }
  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8).required("Required"),
  })
  const { signin: onSignIn, isLoading: sessionLoading } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (
    values: FormFields,
    actions: FormikHelpers<FormFields>
  ) => {
    if (sessionLoading) return

    setIsLoading(true)
    signin(values)
      .then((response) => onSignIn(response.data.auth_token))
      .catch((_error: WretcherError) => {
        actions.setFieldError(
          "base",
          "You have entered the wrong email or password"
        )
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Card.Title>Sign in</Card.Title>
      <Formik
        initialValues={initial}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur }) => (
          <Form>
            {errors.base ? (
              <FormGroup>
                <span>{errors.base}</span>
              </FormGroup>
            ) : null}
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                isValid={!errors.email && touched.email}
                isInvalid={!!errors.email && touched.email}
              />
              <ErrorMessage name="email" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                isValid={!errors.password && touched.password}
                isInvalid={!!errors.password && touched.password}
              />
              <ErrorMessage name="password" />
            </FormGroup>
            <Button type="submit" disabled={isLoading || sessionLoading}>
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default SignIn
