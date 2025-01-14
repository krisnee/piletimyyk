const app = require('express')();
const port = 8080;

const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

const events = [
    "Laulu- ja tantsupidu XX",
    "Tallinna Maraton",
    "Simple Session",
    "Tallinna Vanalinna Päevad",
    "Jõulujazz",
    "Tallinn Music Week",
    "Tallinna Merepäevad"
]

app.get('/events', (req, res) => {
    res.send([events]);
});
app.get('/events/:id', (req, res) => {
    res.send(games[req.params.id]);
});

app.listen(port, () => {
    console.log(`Server töötab aadressil http://localhost:${port}`);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));