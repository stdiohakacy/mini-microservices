const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    return res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const { content } = req.body;
    const commentId = randomBytes(4).toString('hex');

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id,
        }
    })

    return res.status(201).send(comments);
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log(`Comment service event received`, type);

    res.send({});
})

app.listen(4001, () => {
    console.log(`Comment service listening on port 4001`)
})