require('dotenv').config();

const port = process.env.PORT || 3001;
const host = 'localhost';
const express = require('express');
const cors = require('cors');
const app = express();

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');

const {sync} = require('./db');

<<<<<<< HEAD
app.post('/events', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: 'Event name is required' });
    }
    const newEvent = { name: req.body.name, ticketsAvailable: req.body.ticketsAvailable || 0 };
    events.push(newEvent);
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
    events[id].name = req.body.name;
    res.send(events[id]);
});

app.post('/tickets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id >= events.length || isNaN(id)) {
        return res.status(404).send({ error: 'Event not found' });
    }
    if (events[id].ticketsAvailable > 0) {
        events[id].ticketsAvailable -= 1;
        res.send({ message: 'Ticket purchased successfully', event: events[id] });
    } else {
        res.status(400).send({ error: 'No tickets available' });
    }
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server töötab aadressil http://localhost:${port}`);
=======

app.use(cors());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`Server running. Documentation at <a href="http://${host}:${port}/docs">/docs</a>`);
})

require("./routes/eventRoutes")(app);
require("./routes/ticketRoutes")(app);



app.listen(port, async() => {
    if (process.env.SYNC === 'true') {
        await sync();
    }
    console.log(`Api on saadaval aadressil: http://${host}:${port}`);
>>>>>>> aa7bea7 (Initialize new frontend structure with Vite, Vue, and ESLint; add essential configurations and components)
});