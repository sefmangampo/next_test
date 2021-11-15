import React, { useState } from "react"

import { Formik, Form, FormikHelpers, ErrorMessage } from "formik"
import router from "next/router"
import {
  Button,
  Card,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap"
import { store } from "react-notifications-component"
import { WretcherError } from "wretch"
import * as Yup from "yup"

import { register } from "api/user"
import { genericHandleError, setFormErrors } from "api/utils"

import { NotificationOptions } from "../notificationUtils"
import { SignUpFormFields } from "./types"

const SignIn = () => {
  const initial = { email: "", password: "", password_confirmation: "" }
  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8).required("Required"),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (
    values: SignUpFormFields,
    actions: FormikHelpers<SignUpFormFields>
  ) => {
    setIsLoading(true)
    register(values)
      .error(422, (err: WretcherError) => setFormErrors(err, actions))
      .json((_response) => {
        router.push("/signin")

        store.addNotification({
          type: "success",
          container: "top-right",
          title: "Sign up successful",
          message: "Please sign in to continue",
          ...NotificationOptions,
        })
      })
      .catch(genericHandleError)
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Card.Title>Sign Up</Card.Title>
      <Formik
        initialValues={initial}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur }) => (
          <Form>
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
            <FormGroup>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="password_confirmation"
                isValid={
                  !errors.password_confirmation && touched.password_confirmation
                }
                isInvalid={
                  !!errors.password_confirmation &&
                  touched.password_confirmation
                }
              />
              <ErrorMessage name="password_confirmation" />
            </FormGroup>
            <Button type="submit" disabled={isLoading}>
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default SignIn
