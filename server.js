import express from 'express'
import dotenv from 'dotenv'
import { serialize } from 'cookie'

dotenv.config({ path: ".env.local" })

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

app.get("/api/githubUserEmail", async (req, res) => {
  const githubRes = await fetch("https://api.github.com/user/emails", {})
  const githubResBody = await githubRes.json()
  res.status(githubRes.status).send(githubResBody)
})

app.get("/api/tokenExchange", (req, res) => {
  res.status(200).send({ msg: "OK!" })
})

app.listen(port, () => console.log(`API server listening on port ${port}`))
