const express = require('express');
const app = express();
const port = 8080;

const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const path = require('path');
const swaggerDocument = yamljs.load(path.join(__dirname, 'docs', 'swagger.yaml'));

app.use(express.json());
const cors = require('cors');
app.use(cors({
     origin: 'http://localhost:5173'
}));

// Korrektne events massiivi definitsioon
const events = [
    { name: "Laulu- ja tantsupidu XX", ticketsAvailable: 100 },
    { name: "Tallinna Maraton", ticketsAvailable: 50 },
    { name: "Simple Session", ticketsAvailable: 30 },
    // Lisage siia teised sündmused
];

app.get('/events', (req, res) => {
    res.send(events);
});

app.post('/events', async (req, res) => {
    const { title, date, price, location } = req.body;
    if (!title || !date || !price || !location) {
      return res.status(400).send('Kõik väljad on kohustuslikud');
    }
    
    try {
      const newEvent = { title, date, price, location };
      await db.query('INSERT INTO events SET ?', newEvent);
      res.status(201).send('Üritus lisatud');
    } catch (error) {
      res.status(500).send('Viga andmebaasi salvestamisel');
    }
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
});