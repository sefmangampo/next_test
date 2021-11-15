import wretch from "wretch"

export const base = wretch()
  .url(process.env.NEXT_PUBLIC_API_URL!)
  .options({ mode: "cors" })
  .headers({ "Content-Type": "application/json;charset=utf-8" })

export const baseWithAuth = () => {
  const token = localStorage.getItem("userToken")
  if (token) {
    return base.auth(`Bearer ${token}`)
  }
  return base
}
