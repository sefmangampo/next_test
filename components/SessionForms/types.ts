export type SessionCardStates = "signin" | "signup" | "forgot"

export interface SessionCardProps {
  setPage: React.Dispatch<React.SetStateAction<SessionCardStates>>
}

export interface SignInFormFields {
  email: string
  password: string
}

export interface SignUpFormFields {
  email: string
  password: string
  password_confirmation: string
}
