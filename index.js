const express = require('express')
const app = express()
const PORT = 8000
require('dotenv').config()
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const DiscordOauth2 = require('discord-oauth2')
const oauth = new DiscordOauth2()

app.get('/', (req, res) => {
  res.redirect(
    'https://discord.com/api/oauth2/authorize?client_id=715369389485981726&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fredirect&response_type=code&scope=identify%20email%20connections'
  )
})

app.get('/redirect', (req, res) => {
  oauth
    .tokenRequest({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      code: req.query.code,
      scope: 'identify email connections',
      grantType: 'authorization_code',
      redirectUri: 'http://localhost:8000/redirect'
    })
    .then(data => {
      res.json(data)
    })
})

app.listen(PORT, () => {
  console.log('Eris is listening on port ' + PORT)
})
