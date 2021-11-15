export type User = {
  email: string
}

export type SignInResponse = {
  data: {
    email: string
    auth_token: string
  }
}

export type WhoamiResponse = {
  data: User
}

export type ApiError = {
  errors: {
    [key: string]: string[]
  }
}
