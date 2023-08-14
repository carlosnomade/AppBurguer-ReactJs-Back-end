const express = require('express');
const uuid  = require('uuid');
const cors = require('cors');

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

const requests = [];


app.get('/order', (request, response) => {
    return response.json(requests);
});

app.post('/order', (request, response) => {
    const { orderUser, clientName } = request.body;
    const ask = { id: uuid.v4(), orderUser, clientName};

    requests.push(ask);
    return response.status(201).json(ask);
});


app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
});