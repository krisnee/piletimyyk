const { db } = require('../db');

// Get all events
exports.getAll = async (req, res) => {
    try {
        const events = await db.Event.findAll(); // Fetch data from the database
        res.status(200).json(events.map(({ event_id, title, description, date, time, price, location }) => ({
            event_id, title, description, date, time, price, location
        })));
    } catch (error) {
        console.error('Ürituste andmete toomise viga:', error);
        res.status(500).send({ error: 'Sisemine serveri viga' });
    }
};

// Get event by ID
exports.getById = async (req, res) => {
    try {
        const event = await findEventById(req);  // Pass req directly to findEventById
        if (!event) {
            return;  // If no event is found, do not proceed further
        }
        res.status(200).json(event);  // Send the event data
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

// Create a new event
exports.create = async (req, res) => {
    // Ensure the user is an admin
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send({ error: 'Ainult administraatorid saavad luua üritusi' });
    }

    const { title, description, date, time, price, location } = req.body;

    if (!title || !description || !date || !time || price == null || !location) {
        return res.status(400).send({ error: 'Puuduvad vajalikud väljad' });
    }

    const newEvent = {
        title,
        description,
        date,
        time,
        price,
        location,
    };

    // Create a new event in the database
    const createdEvent = await db.Event.create(newEvent);
    res.status(201).json({ event_id: createdEvent.event_id, message: 'Üritus loodud edukalt' });
};

// Update an event
exports.editById = async (req, res) => {
    // Ensure the user is an admin
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send({ error: 'Ainult administraatorid saavad uuendada üritusi' });
    }

    try {
        const event = await findEventById(req);

        if (!event) {
            return res.status(404).send({ error: 'Üritust ei leitud' });
        }

        const { title, description, date, time, price, location } = req.body;

        // Update the event object
        Object.assign(event, { title, description, date, time, price, location });

        // Save the updated event to the database
        await event.save();

        res.status(200).json({ message: 'Üritus uuendatud edukalt', event });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Delete an event
exports.deleteById = async (req, res) => {
    // Ensure the user is an admin
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send({ error: 'Ainult administraatorid saavad kustutada üritusi' });
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