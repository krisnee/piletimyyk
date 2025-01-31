const EventsController = require('../controllers/EventsController');

module.exports = (app) => {
    app.route("/events")
        .get(EventsController.getAll)
        .post(EventsController.create);

    app.route("/events/:id")
        .get(EventsController.getById)
        .put(EventsController.editById)
       .delete(EventsController.deleteById);
};