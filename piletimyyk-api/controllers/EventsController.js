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

// Update an event
exports.editById = async (req, res) => {
    try {
        const event = await findEventById(req);

        if (!event) {
            return res.status(404).send({ error: 'Event not found' });
        }

        const { title, description, date, time, price, location } = req.body;

        if (!title && !description && !date && !time && price == null && !location) {
            return res.status(400).send({ error: 'At least one field must be updated' });
        }

        // Update event data
        Object.assign(event, { title, description, date, time, price, location });

        // Save the updated event to the database
        await event.save();

        res.status(200).json({ message: 'Event updated successfully', event });
    } catch {
        res.status(400).send({ error: 'Something went wrong while updating the event' });
    }
};

// Delete an event
exports.deleteById = async (req, res) => {
    // Ensure the user is an admin
    if (!req.user || req.user.role !== 'admin') {
        return res.status(400).send({ error: 'Ainult administraatorid saavad kustutada üritusi' });
    }

    try {
        const event = await findEventById(req);
        if (!event) {
            return;  // If no event is found, exit early
        }
        await event.destroy(); // Destroy the event from the database
        res.status(204).send(); // Send the appropriate HTTP status (No Content)
    } catch (error) {
        res.status(404).send({ error: error.message }); // Handle any errors
    }
};

// Helper function to find event by ID
const findEventById = async (req) => {
    const idNumber = parseInt(req.params.id, 10); // Ensure parsing the id as an integer
    if (isNaN(idNumber)) {
        res.status(400).send({ error: `Vale ürituse ID ${req.params.id}` });
        return null;  // Return null if the ID is invalid
    }
    const event = await db.Event.findByPk(idNumber); // Retrieve the event using the primary key
    if (!event) {
        res.status(404).send({ error: "Üritust ei leitud" });
        return null;  // Return null if no event is found
    }
    return event;  // Return the event if found
};
