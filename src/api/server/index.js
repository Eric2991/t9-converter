const api = require(`${process.cwd()}/dist/api/src/api.js`)
const express = require('express')
const app = express()

app.get('/convert/:digits', (req, res) => {
  api.retrieveWords(req.params.digits).then(response => res.send(response))
})

app.listen(3000)