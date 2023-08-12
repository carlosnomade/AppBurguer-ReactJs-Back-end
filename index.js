const express = require('express');
const uuid  = require('uuid');
const cors = require('cors');

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

const requests = [];

const checkUserId = (request, response, next) => {
    const { id } = request.params;
    const index = requests.findIndex(user => user.id === id);

    if (index < 0) {
        return response.status(404).json({ error: "User not found" });
    };

    request.userId = requests[index].id;
    request.index = index;

    next()
}

app.get('/order', (request, response) => {
    return response.json(requests);
});

app.post('/order', (request, response) => {
    const { orderUser, clientName } = request.body;
    const ask = { id: uuid.v4(), orderUser, clientName};

    requests.push(ask);
    return response.status(201).json(ask);
});


app.put('/order/:id', checkUserId, (request, response) => {
    const { orderUser, clientName } = request.body;
    const { index } = request;
    const id = request.userId; 

    const updateRequests = { id, orderUser, clientName};
 
    requests[index] = updateRequests;
    return response.json(updateRequests);
});

app.delete('/order/:id', checkUserId, (request, response) => {
    const { index } = request;
    requests.splice(index, 1);

    return response.status(204).json();
});

app.get('/order/:id', checkUserId, (request, response) => {
    const { index } = request;
    return response.json(requests[index]);
});

app.patch('/order/:id', checkUserId, (request, response) => {
    const { index } = request;
    const id = request.userId; 

    const orderUser  = requests[index].orderUser;
    const clientName  = requests[index].clientName;
    const price  = requests[index].price;
    const status = 'Finalizado';


    const updateRequests = { id, orderUser, clientName, price, status };

    requests[index] = updateRequests;
    return response.json(updateRequests);
});


app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
});