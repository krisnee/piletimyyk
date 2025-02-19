const { db } = require('../db');
const Utils = require("./utils");

// Get all tickets
exports.getAll = async (req, res) => {
    try {
        const tickets = await db.Ticket.findAll({
            /* include: [
                {
                    model: db.User,
                    as: "user",
                    attributes: ["UserUserId", "first_name", "last_name", "email"],
                },
                {
                    model: db.Event,
                    as: "event",
                    attributes: ["EventEventId", "title", "description", "date", "time", "price", "location"],
                }, */
            /* ], */
        });
        res.status(200).json(tickets);
    } catch (error) {
        console.error("Pileti andmete toomise viga:", error);
        res.status(500).send({ error: "Sisemine serveri viga" });
    }
};

// Get ticket by ID
exports.getById = async (req, res) => {
    try {
        const ticket = await db.Ticket.findByPk(req.params.id, {
            include: [
                { model: db.User, as: "user" },
                { model: db.Event, as: "event" },
            ],
        });

        if (!ticket) {
            return res.status(404).send({ error: 'Piletit ei leitud' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        console.error('Pileti toomise viga:', error);
        res.status(500).send({ error: 'Sisemine serveri viga' });
    }
};

// Create a new ticket
exports.create = async (req, res) => {
    const { event_id, user_id, quantity, purchase_date} = req.body;

    if (!event_id || !user_id || !quantity) {
        return res.status(400).send({ error: 'Puuduvad vajalikud väljad' });
    }

    try {
        const event = await db.Event.findByPk(event_id);
        const user = await db.User.findByPk(user_id);
        
        if (!event || !user) {
            return res.status(404).send({ error: 'Üritust või kasutajat ei leitud' });
        }
        var newTicket = {};
        newTicket.EventEventId = event_id;
        newTicket.UserUserId = user_id;
        newTicket.purchase_date = purchase_date;
        
        newTicket = await db.Ticket.create({ EventEventId, UserUserId, quantity, purchase_date: new Date() });

        res.status(201).json({ ticket_id: newTicket.ticket_id, message: 'Pilet loodud edukalt' });
    } catch (error) {
        console.error('Pileti loomise viga:', error);
        res.status(500).send({ error: 'Sisemine serveri viga' });
    }
};

// Update a ticket
exports.editById = async (req, res) => {
    try {
        const { event_id, user_id, quantity } = req.body;
        const ticket = await db.Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).send({ error: 'Piletit ei leitud' });
        }

        ticket.EventEventId = event_id || ticket.EventEventId;
        ticket.UserUserId = user_id || ticket.UserUserId;
        ticket.quantity = quantity || ticket.quantity;
        await ticket.save();

        res.status(200).json({ message: 'Pilet uuendatud edukalt', ticket });
    } catch (error) {
        console.error('Pileti uuendamise viga:', error);
        res.status(500).send({ error: 'Sisemine serveri viga' });
    }
};

// Delete a ticket
exports.deleteById = async (req, res) => {
    try {
        const ticket = await db.Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).send({ error: 'Piletit ei leitud' });
        }

        await ticket.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Pileti kustutamise viga:', error);
        res.status(500).send({ error: 'Sisemine serveri viga' });
    }
};