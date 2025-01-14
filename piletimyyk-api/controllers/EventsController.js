const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
    const allTickets = await db.tickets.findAll();
    console.log(allTickets);
    res.send(allTickets.map(({ TicketID, EventName, Price }) => {
        return { TicketID, EventName, Price };
    }));
}

exports.getById = async (req, res) => {
    const ticket = await getTicket(req, res);
    if (!ticket) { return; }
    return res.send(ticket);
}

exports.create = async (req, res) => {
    if (!req.body.EventName) {
        return res.status(400).send({ error: "Event name is required" });
    }
    if (!req.body.UserID) {
        req.body.UserID = 1; // Default user ID
    }
    let newTicket = {
        EventName: req.body.EventName,
        Price: req.body.Price,
        UserID: req.body.UserID,
    }
    const createdTicket = await db.tickets.create(newTicket);
    res
        .location(`${Utils.getBaseUrl(req)}/tickets/${createdTicket.TicketID}`)
        .sendStatus(201);
}

exports.deleteById = async (req, res) => {
    const ticket = await getTicket(req, res);
    if (!ticket) { return; }
    await ticket.destroy();
    res.status(204).send();
}

const getTicket = async (req, res) => {
    const idNumber = parseInt(req.params.TicketID);
    if (isNaN(idNumber)) {
        res.status(400).send({ error: `Invalid ticket ID ${req.params.TicketID}` });
        return null;
    }
    const ticket = await db.tickets.findByPk(idNumber);
    if (!ticket) {
        res.status(404).send({ error: `Ticket with ID ${idNumber} not found` });
        return null;
    }
    return ticket;
}