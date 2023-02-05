import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import tickets from './routes/ticket.js'

dotenv.config()
const PORT = 8000

const app = express()
app.use(express.json())
app.use(cors())
app.listen(PORT, () => console.log(`Server running on  Port ${PORT}`))

// routes
app.use('/tickets', tickets)

// data
import { tasksData } from './data/index.js'
import Tasks from './models/Tasks.js'

// mongoose
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 9000, () =>
      console.log(`Server Port: ${PORT}`)
    )

    // Only add data once
    // Tasks.insertMany(tasksData)
  })
  .catch((error) => console.log(`${error} did not connect`))
