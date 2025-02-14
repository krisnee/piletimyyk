const { db } = require('../db');
const Utils = require("./utils");

// Get all events
exports.getAll = async (req, res) => {
    try {
        const events = await db.Event.findAll(); // Fetch data from the database
        res.status(200).json(events.map(({title, description, date, time, price, location }) => ({
            title, description, date, time, price, location
        })));
    } catch (error) {
        console.error('Error fetching event data:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};
