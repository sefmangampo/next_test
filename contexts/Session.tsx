import React, { useCallback, useEffect } from "react"

import { useRouter } from "next/router"
import { store } from "react-notifications-component"
import { WretcherError } from "wretch"

import { NotificationOptions } from "components/notificationUtils"

import { User } from "../api/types"
import { whoami } from "../api/user"

export type SetCurrentUser = React.Dispatch<React.SetStateAction<User | null>>
export type SetAccessToken = React.Dispatch<React.SetStateAction<string | null>>

interface ContextType {
  currentUser: User | null
  accessToken: string | null
  setAccessToken: SetAccessToken
  isLoading: boolean
  signin: (accessToken: string) => void
  signout: () => void
}

const SessionContext = React.createContext<ContextType | undefined>(undefined)

const useSession = () => {
  const context = React.useContext(SessionContext)
  if (!context) {
    throw new Error(`useSession must be used within an SessionContext`)
  }
  return context
}

interface SessionProviderProps {
  children: React.ReactNode
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  const tokenKey = "userToken"
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [accessToken, setAccessToken] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasLoggedIn, setHasLoggedIn] = React.useState(false)
  const router = useRouter()

  const signin = (accessToken: string) => {
    setHasLoggedIn(true)
    setAccessToken(accessToken)
  }

  const signout = useCallback(() => {
    localStorage.removeItem(tokenKey)
    setAccessToken(null)
    setCurrentUser(null)
    router.push("/signin")
  }, [router])

  const fetchCurrentUser = useCallback(() => {
    setIsLoading(true)
    whoami()
      .then((response) => {
        setCurrentUser(response.data)
      })
      .catch((error: WretcherError) => {
        if (error.status === 401) {
          signout()
        }
      })
      .finally(() => setIsLoading(false))
  }, [signout])

  useEffect(() => {
    const localAccessToken = localStorage.getItem(tokenKey)

    if (accessToken && localAccessToken !== accessToken) {
      localStorage.setItem(tokenKey, accessToken)
      setAccessToken(accessToken)
    } else if (localAccessToken && localAccessToken !== accessToken) {
      setAccessToken(localAccessToken)
    } else {
      setIsLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    if (accessToken) fetchCurrentUser()
  }, [accessToken, fetchCurrentUser])

  useEffect(() => {
    if (accessToken && currentUser && hasLoggedIn) {
      setHasLoggedIn(false)
      router.push("/")

      store.addNotification({
        type: "success",
        container: "top-right",
        message: "Sign in successful",
        ...NotificationOptions,
      })
    }
  }, [accessToken, currentUser, hasLoggedIn, router])

  const value: ContextType = {
    currentUser,
    accessToken,
    setAccessToken,
    isLoading,
    signin,
    signout,
  }
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export { SessionContext, SessionProvider, useSession }
