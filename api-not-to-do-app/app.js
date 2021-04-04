import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()
import cors from 'cors'
import path from 'path'

const PORT = process.env.PORT || 5000

import router from './router.js'

//importing and connecting MongoDB
import mongoClient from './config/db.js'
mongoClient()

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use('/api/v1', router)
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/react-not-to-do-list/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/react-not-to-do-list/build/index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('Welcome to my app')
  })
}

app.use((error, req, res, next) => {
  console.log(error)
  res.code(500).send(error.message)
})

app.listen(PORT, (error) => {
  error && console.log(error)

  console.log(`Server is running at http://localhost:${PORT}`)
})
