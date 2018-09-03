const api = require(`${process.cwd()}/dist/api/src/index.js`)
const express = require('express')
const path = require('path')

const app = express()

app.use('/dist', express.static(path.join(process.cwd(), 'dist')))

app.get('/', function(req, res) {
  res.sendFile(path.join(process.cwd(), '/public/index.html'))
})

app.get('/api/convert/:digits', (req, res) => {
  api.retrieveWords(req.params.digits).then(response => res.send(response))
})

app.listen(3000, () => console.log('SERVER TURNED ON PORT 3000'))
