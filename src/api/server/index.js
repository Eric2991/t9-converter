const api = require(`${process.cwd()}/dist/api/src/api.js`)
const express = require('express')
const app = express()

app.get('/convert/:digits', (req, res) => {
  const reqInput = req.params.digits
  api.retrieveWords(reqInput).then(response => res.send(response))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))