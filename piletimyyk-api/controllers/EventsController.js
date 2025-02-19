const { db } = require('../db');
const Utils = require("./utils");

// Get all events
exports.getAll = async (req, res) => {
    try {
        const events = await db.Event.findAll(); // Fetch data from the database
        res.status(200).json(events.map(({event_id, title, description, date, time, price, location }) => ({
           event_id, title, description, date, time, price, location
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
        const forTicket = createdEvent.event_id;
        try { 
            await createTicketforEvent( forTicket, quantity = 69);
        }
        catch (error) {
            console.error('Error creating ticket for event:', error);
        }
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
    try {
        const event = await findEventById(req);
        if (!event) {
            return res.status(404).send({ error: 'Event not found' });
        }
        await event.destroy(); // Kustuta sündmus andmebaasist
        res.status(204).send(); // Saada sobiv HTTP staatus (No Content)
    } catch (error) {
        res.status(404).send({ error: error.message }); // Käsitle vigu
    }
};

// Helper function to find event by ID
const findEventById = async (req) => {
    const idNumber = parseInt(req.params.id, 10); // Ensure parsing the id as an integer
    if (isNaN(idNumber)) {
        res.status(400).send({ error: `Wrong event ID ${req.params.id}` });
        return null;  // Return null if the ID is invalid
    }
    const event = await db.Event.findByPk(idNumber); // Retrieve the event using the primary key
    if (!event) {
        res.status(404).send({ error: "Event not found" });
        return null;  // Return null if no event is found
    }
    return event;  // Return the event if found
};

// Helper function
const createTicketforEvent = async (event_id, quantity, user_id=1) => {
    const ticket = await db.Ticket.create({ event_id, quantity, user_id});
};
