const express = require('express');
const app = express();
const port = 8080;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('./models');
const User = require('../models/User');


// Lisa JSON andmete töötlemiseks
app.use(express.json());

// Teeninda staatilisi faile
app.use(express.static('frontend'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

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

// Kasutaja registreerimine
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ firstName, lastName, email, passwordHash, role });
  res.status(201).json({ message: 'Kasutaja loodud' });
});

// Kasutaja sisselogimine
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    const token = jwt.sign({ id: user.id, role: user.role }, 'salajaneVõti');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Vale e-mail või parool' });
  }
});

app.listen(port, () => {
  console.log(`Api on saadaval aadressil: http://localhost:${port}`);
});

sequelize.sync()
    .then(() => console.log('Andmebaas on sünkroniseeritud.'))
    .catch(err => console.error('Sünkroniseerimine ebaõnnestus:', err));