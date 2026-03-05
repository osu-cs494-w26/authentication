import { useState } from 'react'

export default function Login() {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")

  async function handleLogin(e) {
    e.preventDefault()
    console.log("== Logging in with these credentials:", username, password)
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const resBody = await res.json()
    console.log("== response body:", resBody)
    // window.localStorage.setItem("token", resBody.token)
    console.log("== document.cookie:", document.cookie)
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}
