const express = require('express')
const app = express()
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body

    posts[id] = {
        id,
        title
    }

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    })

    res.status(201).send(posts[id])
})

app.post('/events', async (req, res) => {
    console.log('Receive event posts')
})

app.listen(4000, () => {
    console.log(`Listening on port 4000`)
})