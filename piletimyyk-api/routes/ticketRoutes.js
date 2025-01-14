// piletimyyk-api/routes/tickets.js
const ticketController = require('../controllers/TicketsController');

module.exports = (app) => {
    app.route("/ticket")
        .get(ticketController.getAll)
        .post(ticketController.create);

    app.route("/ticket/:id")
        .get(ticketController.getById)
        .put(ticketController.editById)
        .delete(ticketController.deleteById);
};