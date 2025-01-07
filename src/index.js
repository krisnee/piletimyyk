const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Tere tulemast piletimüügi rakendusse!');
});

app.listen(PORT, () => {
    console.log(`Server töötab porti ${PORT} peal.`);
});