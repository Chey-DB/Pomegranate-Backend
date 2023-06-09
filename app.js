const express = require('express')
const cors = require('cors')

const logger = require('./middleware/logger')
const userRouter = require('./routes/user')

const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)

app.get('/', (req, res) => {
    res.json(" Hello World ")
})

app.use("/users", userRouter)


module.exports = app
