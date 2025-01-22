const express = require('express');
const app = express();
const port = 8081;

const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const path = require('path');
const swaggerDocument = yamljs.load(path.join(__dirname, 'docs', 'swagger.yaml'));

app.use(express.json());
const cors = require('cors');
app.use(cors());

const events = [
    "Laulu- ja tantsupidu XX",
    "Tallinna Maraton",
    "Simple Session",
    "Tallinna Vanalinna Päevad",
    "Jõulujazz",
    "Tallinn Music Week",
    "Tallinna Merepäevad"
];


app.get('/events', (req, res) => {
    res.send(events);
});


app.post('/events', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: 'Event name is required' });
    }
    events.push(req.body.name);
    res.status(201).send(events);
});


app.get('/events/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id >= events.length || isNaN(id)) {
        return res.status(404).send({ error: 'Event not found' });
    }
    res.send(events[id]);
});


app.put('/events/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id >= events.length || isNaN(id)) {
        return res.status(404).send({ error: 'Event not found' });
    }
    if (!req.body.name) {
        return res.status(400).send({ error: 'Event name is required' });
    }
    events[id] = req.body.name;
    res.send(events[id]);
});


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
    console.log(`Server töötab aadressil http://localhost:${port}`);
});
