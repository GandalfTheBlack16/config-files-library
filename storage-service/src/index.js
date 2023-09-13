import express from 'express'
import { fileRouter } from './routes/FileRouter.js'

const app = express()

app.use('/api/file', fileRouter)

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`[Express] -- Application running on port ${process.env.PORT ?? 3000}`)
})
