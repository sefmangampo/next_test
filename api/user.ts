import { ResponseChain } from "wretch"

import { baseWithAuth } from "./base"
import { SignInResponse, WhoamiResponse } from "./types"

export const whoami = () => {
  return baseWithAuth()
    .url("/whoami")
    .get()
    .json((response) => response as WhoamiResponse)
}

export interface RegisterProps {
  email: string
  password: string
}

export const register = ({ email, password }: RegisterProps) => {
  return baseWithAuth().url("/signup").post({
    user: {
      email,
      password,
    },
  }) as ResponseChain
}

export interface SignInProps {
  email: string
  password: string
}
export const signin = ({ email, password }: SignInProps) => {
  return baseWithAuth()
    .url("/signin")
    .post({
      credentials: { email, password },
    })
    .json((response) => response as SignInResponse)
}
