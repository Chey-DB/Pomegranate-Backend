const express = require('express')
const cors = require('cors')
const logger = require('./logger')

const taskRouter = require('./routes/task')

const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)

app.get('/', (req, res) => {
    res.json({"App": "Hello World"})
})



app.use("/task", taskRouter)


module.exports = app
