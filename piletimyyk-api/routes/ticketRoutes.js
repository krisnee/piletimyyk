// piletimyyk-api/routes/tickets.js
const ticketController = require('../controllers/ticketController');

module.exports = (app) => {
    app.route("/tickets")
        .get(ticketController.getAll)
        .post(ticketController.create);

    app.route("/tickets/:id")
        .get(ticketController.getById)
        .put(ticketController.editById)
        .delete(ticketController.deleteById);
};