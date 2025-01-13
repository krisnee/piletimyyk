require('dotenv').config();

const port = process.env.PORT || 8080;
const host = 'localhost';
const express = require('express');
const cors = require('cors');
const app = express();

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');

const { sync } = require('./db');

// Suvalised Eesti kasutajad
const users = [
    {
        ID: 1,
        Username: "kristjan123",
        Firstname: "Kristjan",
        Lastname: "Kask",
        Email: "kristjan.kask@example.com",
        SecureLevel: 0,
        LevelKey: "0-0"
    },
    {
        ID: 2,
        Username: "liisak",
        Firstname: "Liisa",
        Lastname: "Kärner",
        Email: "liisa.karner@example.com",
        SecureLevel: 0,
        LevelKey: "0-1"
    },
    {
        ID: 3,
        Username: "mattias99",
        Firstname: "Mattias",
        Lastname: "Mägi",
        Email: "mattias.magi@example.com",
        SecureLevel: 0,
        LevelKey: "1-0"
    },
    {
        ID: 4,
        Username: "admin123",
        Firstname: "Admin",
        Lastname: "Adminson",
        Email: "admin.adminson@example.com",
        SecureLevel: 1,
        LevelKey: "0-0"
    },
];

app.use(cors());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());

app.get('/event', (req, res) => {
    const events = [
        { title: 'Sündmus 1', description: 'Kirjeldus 1' },
        { title: 'Sündmus 2', description: 'Kirjeldus 2' }
    ];
    res.json(events); // Tagastab JSON-andmed
});


app.get("/", (req, res) => {
    res.send(`Server töötab. Dokumentatsioon on kättesaadav siit: <a href="http://${host}:${port}/docs">/docs</a>`);
});

require("./routes/ticketRoutes")(app);

app.get("/users", (req, res) => { res.status(200).send(users) });

app.get("/users/:id", (req, res) => {
    if (typeof users[req.params.id - 1] === "undefined") {
        return res.status(404).send({ error: "Kasutajat ei leitud" });
    }
    if (req.params.id == null) {
        return res.status(400).send({ error: "Vale kasutaja ID" });
    }
    res.status(200).send(users[req.params.id - 1]);
});

app.post('/users', (req, res) => {
    if (!req.body.Username ||
        !req.body.Firstname ||
        !req.body.Lastname ||
        !req.body.Email ||
        !req.body.SecureLevel ||
        !req.body.LevelKey) 
    {
        return res.status(400).send({ error: "Üks või mitu parameetrit on puudu" });
    }

    let user = {
        ID: users.length + 1,
        Username: req.body.Username,
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Email: req.body.Email,
        SecureLevel: req.body.SecureLevel,
        LevelKey: req.body.LevelKey,
    };
    users.push(user);
    res.status(201)
        .location(`${getBaseURL(req)}/users/${users.length}`)
        .send(user);
});

app.put('/users/:id', (req, res) => {
    if (req.params.id == null) {
        return res.status(404).send({ error: "Kasutajat ei leitud" });
    }
    if (!req.body.Username ||
        !req.body.Firstname ||
        !req.body.Lastname ||
        !req.body.Email ||
        !req.body.SecureLevel ||
        !req.body.LevelKey) 
    {
        return res.status(400).send({ error: "Üks või mitu parameetrit on puudu" });
    }
    let user = {
        ID: parseInt(req.body.id + 1),
        Username: req.body.Username,
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Email: req.body.Email,
        SecureLevel: req.body.SecureLevel,
        LevelKey: req.body.LevelKey,
    };
    user.ID = parseInt(req.body.ID);
    users.splice((req.body.ID - 1), 1, user);
    res.status(201)
        .location(`${getBaseURL(req)}/users/${users.length}`)
        .send(user);
});

app.delete('/users/:id', (req, res) => {
    if (typeof users[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Kasutajat ei leitud" });
    }
    users.splice(req.params.id - 1, 1);

    res.status(204).send({ error: "Ei sisu" });
});

app.listen(port, async () => {
    if (process.env.SYNC === 'true') {
        await sync();
    }
    console.log(`API on saadaval aadressil: http://${host}:${port}`);
});