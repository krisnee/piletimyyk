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

// Get event by ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ error: "Event ID is required" });
        }
        const event = await findEventById(req);
        if (!event) {
            return;
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

// Create a new event
exports.create = async (req, res) => {
    const { title, description, date, time, price, location } = req.body;

    // Kontrolli, kas kõik nõutavad väljad on olemas
    if (!title || !date || !time || price == null || !location) {
        return res.status(400).send({ error: 'Required fields are missing' });
    }

    try {
        const newEvent = {
            title,
            description,
            date,
            time,
            price,
            location,
        };

        // Loo uus üritus andmebaasis
        const createdEvent = await db.Event.create(newEvent);
        res.status(201).json({ event_id: createdEvent.event_id, message: 'Event created successfully' });
    } catch (error) {
        res.status(400).send({ error: 'Something went wrong while creating the event' });
    }
};
