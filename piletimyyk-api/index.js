require('dotenv').config();

const express = require('express'); // Ainult üks kord
const cors = require('cors'); // CORS moodul
const bodyParser = require('body-parser'); // Lisa see rida
const port = process.env.PORT || 8080; // Kasuta keskkonnamuutujat või vaikimisi 3001
const host = 'localhost'; // Host

const app = express(); // Rakenduse loomine

const { sync } = require('./db');

app.use(cors());
app.use(bodyParser.json());
// app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`Tere tulemast piletimüügi rakendusse! <a href="http://${host}:${port}/docs">/docs</a>`);
});

app.listen(port, async () => {
    if (process.env.SYNC === 'true') {
        await sync();
    }
    console.log(`Api on saadaval aadressil: http://${host}:${port}`);
});