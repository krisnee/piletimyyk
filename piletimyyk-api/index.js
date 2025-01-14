const app = require('express')();
const port = 8080;

const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/tickets', (req, res) => {
    res.send(["Laulu- ja tantsupidu XX","45€","2025-07-11"]);
});

app.listen(port, () => {
    console.log(`Server töötab aadressil http://localhost:${port}`);
});
