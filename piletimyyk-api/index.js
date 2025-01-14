const app = require('express')();
const port = 8080;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/tickets', (req, res) => {
    res.send(["Laulu- ja tantsupidu XX","45€","2025-07-11"]);
});

app.listen(port, () => {
    console.log(`Server töötab aadressil http://localhost:${port}`);
});
