const express = require('express')
const cors = require('cors')
const logger = require('./logger')

const taskRouter = require('./routes/pomegrenate')

const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)

app.get('/', (req, res) => {
    res.json({"App": "Hello World"})
})



app.use("/pomegrenate", taskRouter)


module.exports = app
