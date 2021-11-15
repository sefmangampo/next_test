import { FC } from "react"

import { useRouter } from "next/router"

import { useSession } from "contexts/Session"

const AuthenticatedPage: FC = ({ children }) => {
  const { isLoading, currentUser } = useSession()
  const router = useRouter()

  if (!isLoading && !currentUser) {
    router.push("/signin")
  }
  if (isLoading || !currentUser) return <></>

  return <>{children}</>
}

export default AuthenticatedPage
