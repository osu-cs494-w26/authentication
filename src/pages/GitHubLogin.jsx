import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'

import GitHubLoginLink from '../components/GitHubLoginLink'

export default function GitHubLogin() {
  const [ error, setError ] = useState("")
  const [ searchParams ] = useSearchParams()
  const authCode = searchParams.get("code")
  console.log("== code:", authCode)

  useEffect(() => {
    async function exchangeCodeForToken(code) {
      const res = await fetch("/api/tokenExchange", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json"
        }
      })
    }
    if (authCode) {
      exchangeCodeForToken(authCode)
    }
  }, [ authCode ])

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <GitHubLoginLink />
    </div>
  )
}
