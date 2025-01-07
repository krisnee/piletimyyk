const express = require('express');
const app = express();
const port = 8080;

// Lisa JSON andmete töötlemiseks
app.use(express.json());

// Teeninda staatilisi faile
app.use(express.static('frontend/index.html'));

// Ajutine andmestruktuur piletite hoidmiseks
let tickets = [];

// Piletite loetlemine
app.get('/tickets', (req, res) => {
  res.json(tickets);
});

// Pileti lisamine
app.post('/tickets', (req, res) => {
  const ticket = req.body;
  tickets.push(ticket);
  res.status(201).json(ticket);
});

app.delete('/tickets/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  tickets = tickets.filter((ticket, index) => index !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Api on saadaval aadressil: http://localhost:${port}`);
});