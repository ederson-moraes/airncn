const express = require('express')

const app = express()


app.use(express.json())

app.get('/', (req, res) => {
    return res.json({
        message: 'Hello, World Express!'
    })
}
)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
}
)