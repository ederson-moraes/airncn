const express = require('express')
const routes = require('./routes')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const { Server } = require('socket.io')
const http = require('http')
dotenv.config()



const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

const connectedUsers = {}

io.on('connection', socket => {

    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id

    console.log(`User connected: ${user_id}`)

    console.log(`Socket connected: ${socket.id}`)

    socket.emit('message', 'Welcome to the server!')

    socket.on('messagefe', data => {
        console.log(data)
    })
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers
    return next()
})

app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(cors())
app.use(routes)

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('MongoDB connected')
}).catch(err => {
    console.error('MongoDB connection error:', err)
})


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
