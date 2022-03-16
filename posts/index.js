const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    return res.send(posts);
});

app.post('/posts', async (req, res) => {
    const { title } = req.body;
    const id = randomBytes(4).toString('hex');
    posts[id] = { id, title };

    await axios.post('http://event-bus-srv:4005/events', {
        type: "PostCreated",
        data: { id, title }
    })

    return res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log(`Post service received event`, req.body.type);
    res.send({});
})

app.listen(4000, () => {
    console.log(`Post service listening on port 4000`);
});
