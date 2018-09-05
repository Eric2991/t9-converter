const api = require(`../src/t9_conversion`)
const express = require('express')
const path = require('path')

const app = express()
const delayIndex = process.argv.indexOf('--delay')

// Throw error if delay flag was set without a valid value
if (delayIndex !== -1)
  if (
    process.argv.length === delayIndex + 1 ||
    Number.isNaN(parseInt(process.argv[delayIndex + 1], 10))
  )
    throw Error(
      'Invalid delay parameter set. Parameter is set in the following format:\n\n\t--delay <delayDuration>\n\nwhere <delayDuration> is some duration of time in milliseconds.'
    )

const delayDuration =
  delayIndex !== -1 ? parseInt(process.argv[delayIndex + 1], 10) : undefined

app.use('/dist', express.static(path.join(process.cwd(), 'public/dist')))

app.get('/', (req: express$Request, res: express$Response) => {
  res.sendFile(path.join(process.cwd(), '/public/index.html'))
})

app.get(
  '/api/convert/:digits',
  (req: express$Request, res: express$Response) => {
    api
      .retrieveWords(req.params.digits)
      .then(
        (response: Array<string>) =>
          delayIndex !== -1
            ? setTimeout(() => res.send(response), delayDuration)
            : res.send(response)
      )
  }
)

const server: Server = app.listen(3000, () =>
  console.log('SERVER TURNED ON PORT 3000')
)

process.once('SIGTERM', () => {
  server.close()
})
