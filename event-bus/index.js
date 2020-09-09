const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const app = express()

const events = []

app.use(bodyParser.json())
app.use(cors())

app.get('/events', (rqe, res) => {
    res.send(events).status(200)
})

app.post('/events', (req, res) => {
    const event = req.body

    events.push(event)

    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)
    axios.post('http://localhost:4003/events', event)

    res.send({ status: 'OK' })
})

app.listen(4005, () => {
    console.log('Server listening on port 4005')
})
