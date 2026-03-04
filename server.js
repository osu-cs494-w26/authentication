import express from 'express'
import dotenv from 'dotenv'

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

function generateAuthToken(username) {
    return TOKEN
}

function authTokenIsValid(token) {
    return token === TOKEN
}

app.use(express.json())

app.get("/api/user", (req, res) => {
  const { password, ...body } = USER
  res.status(200).send(body)
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
