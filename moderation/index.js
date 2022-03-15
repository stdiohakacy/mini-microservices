const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === "CommentCreated") {
        const { id, postId, content } = data;
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://localhost:4005/events', {
            type: "CommentModerated",
            data: { id, postId, status, content }
        })
    }

    res.send({});
})

app.listen(4003, () => {
    console.log(`Moderation service running on 4003`);
})