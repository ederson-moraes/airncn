const express = require('express')
const routes = require('./routes')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

const app = express()
app.use(express.json())

app.use(routes)

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('MongoDB connected')
}).catch(err => {
    console.error('MongoDB connection error:', err)
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})