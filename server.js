import express from 'express'
import dotenv from 'dotenv'
import { serialize } from 'cookie'
import cookieParser from 'cookie-parser'

dotenv.config({ path: ".env.local" })

const clientId = process.env.VITE_CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
let accessToken = null

console.log("== clientId:", clientId)
console.log("== clientSecret:", clientSecret)

const USER = {
  username: "luke",
  password: "hunter2",
  name: "Luke Skywalker",
  email: "OriginalLastJedi@hotmail.com"
}
const TOKEN = "abcd1234"

const app = express()
const port = 8000

function credentialsAreValid(username, password) {
    return username === USER.username && password === USER.password
}

function generateAuthToken(username) {
    return TOKEN
}

function authTokenIsValid(token) {
    return token === TOKEN
}

function requireAuth(req, res, next) {
  if (req.cookies && authTokenIsValid(req.cookies.auth)) {
    next()
  } else {
    res.status(401).send({
      err: "Unauthorized"
    })
  }
}

function setAuthCookie(res, token) {
  res.setHeader("Set-Cookie", serialize("auth", token, {
    path: "/",
    httpOnly: true,
    // secure: true,
    expires: new Date(Date.now() + 8 * 60 * 60 * 1000)
  }))
}

app.use(express.json())
app.use(cookieParser())

app.get("/api/user", requireAuth, (req, res) => {
  const { password, ...body } = USER
  res.status(200).send(body)
})

app.post("/api/login", (req, res) => {
  const { username, password } = req.body
  if (credentialsAreValid(username, password)) {
    setAuthCookie(res, generateAuthToken(username))
    res.status(200).send({ msg: "OK!" })
  } else {
    res.status(401).send({ err: "Invalid credentials" })
  }
})

app.get("/api/githubUserEmail", requireAuth, async (req, res) => {
  const githubRes = await fetch("https://api.github.com/user/emails", {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const githubResBody = await githubRes.json()
  res.status(githubRes.status).send(githubResBody)
})

app.post("/api/tokenExchange", async (req, res) => {
  const { code } = req.body
  if (code) {
    const githubRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: code
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
    )
    const githubResBody = await githubRes.json()
    if (githubResBody.access_token) {
      accessToken = githubResBody.access_token
      setAuthCookie(res, generateAuthToken())
      res.status(200).send({ msg: "OK!" })
    } else {
      res.status(401).send({ err: githubResBody.error_description })
    }
  } else {
    res.status(400).send({ err: "Must provide auth code" })
  }
})

app.listen(port, () => console.log(`API server listening on port ${port}`))
