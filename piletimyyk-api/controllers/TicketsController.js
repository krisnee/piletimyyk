const { db } = require("../db");
const Utils = require("./utils"); // Kui sul on utils fail, muidu saad selle osa eemaldada

exports.create = async (req, res) => {
    // Kontrolli, et kõik vajalikud parameetrid on olemas
    if (!req.body.EventID || !req.body.UserID || !req.body.Quantity) {
        return res.status(400).send({ error: "Üks või mitu parameetrit on puudu" });
    }

    let newTicket = {
        EventID: req.body.EventID,
        UserID: req.body.UserID,
        Quantity: req.body.Quantity,
    };

    try {
        // Loo uus pilet
        const createdTicket = await db.Ticket.create(newTicket);
        
        // Otsi ürituse andmed
        const event = await db.Event.findByPk(createdTicket.EventID);
        
        // Tagasta pileti ja ürituse andmed
        res.status(201).send({
            TicketID: createdTicket.TicketID,
            EventID: event.EventID,
            EventName: event.Name,
            EventDate: event.Date,
            EventTime: event.Time,
            Price: event.Price,
            Quantity: createdTicket.Quantity,
            PurchaseDate: createdTicket.PurchaseDate,
        });
    } catch (error) {
        res.status(500).send({ error: "Pileti loomine ebaõnnestus" });
    }
};

exports.getAll = async (req, res) => {
    try {
        const tickets = await db.Ticket.findAll();
        res.send(tickets.map(({ TicketID, EventID, UserID, Quantity, PurchaseDate }) => {
            return { TicketID, EventID, UserID, Quantity, PurchaseDate };
        }));
    } catch (error) {
        res.status(500).send({ error: "Sisemine serveri viga" });
    }
};

exports.getById = async (req, res) => {
    const ticket = await getTicket(req, res);
    if (!ticket) { return; }
    return res.send(ticket);
};

exports.deleteById = async (req, res) => {
    const ticket = await getTicket(req, res);
    if (!ticket) { return; }
    await ticket.destroy();
    res.status(204).send();
};

const getTicket = async (req, res) => {
    const idNumber = parseInt(req.params.id);
    if (isNaN(idNumber)) {
        res.status(400).send({ error: `Vale pileti ID ${req.params.id}` });
        return null;
    }
    const ticket = await db.Ticket.findByPk(idNumber);
    if (!ticket) {
        res.status(404).send({ error: "Piletit ei leitud" });
        return null;
    }
    return ticket;
};