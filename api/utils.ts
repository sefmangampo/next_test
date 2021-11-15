import { FormikHelpers } from "formik"
import { store } from "react-notifications-component"
import { WretcherError } from "wretch"

import { NotificationOptions } from "../components/notificationUtils"
import { ApiError } from "./types"

export const genericHandleError = (error: WretcherError) => {
  store.addNotification({
    type: "danger",
    container: "top-right",
    title: error.name,
    message: "An unexpected error has occured",
    ...NotificationOptions,
  })
}

export const setFormErrors = (
  err: WretcherError,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: FormikHelpers<any>
) => {
  const errors = JSON.parse(err.message) as ApiError
  for (const [key, value] of Object.entries(errors.errors)) {
    actions.setFieldError(key, value.join(", "))
  }
}
