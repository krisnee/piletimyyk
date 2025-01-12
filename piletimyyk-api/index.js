require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const host = 'localhost';

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml'); // Veendu, et see fail on olemas

const { sync } = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc)); // Swaggeri dokumentatsioon

// Tere tulemast leht
app.get("/", (req, res) => {
    res.send(`Tere tulemast piletimüügi rakendusse! Dokumentatsioon aadressil <a href="http://${host}:${port}/docs">/docs</a>`);
});

// Piletite marsruudid
require("./routes/ticketRoutes")(app); // Veendu, et sul on tickets.js marsruutide fail

app.listen(port, async () => {
    if (process.env.SYNC === 'true') {
        await sync();
    }
    console.log(`API on saadaval aadressil: http://${host}:${port}`);
});