import { useEffect } from 'react'

export default function GitHubHome() {

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/githubUserEmail')
      console.log("== API response status:", res.status)
      console.log("== API response body:", await res.json())
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>GitHub login required</h1>
    </div>
  )
}
