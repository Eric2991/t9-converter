const api = require(`../src/t9_conversion`)
const express = require('express')
const path = require('path')

const app = express()

app.use('/dist', express.static(path.join(process.cwd(), 'public/dist')))

app.get('/', (req: express$Request, res: express$Response) => {
  res.sendFile(path.join(process.cwd(), '/public/index.html'))
})

app.get(
  '/api/convert/:digits',
  (req: express$Request, res: express$Response) => {
    api
      .retrieveWords(req.params.digits)
      .then((response: Array<string>) => res.send(response))
  }
)

app.listen(3000, () => console.log('SERVER TURNED ON PORT 3000'))
