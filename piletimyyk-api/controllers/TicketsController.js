const { db } = require("../db");
const Utils = require("./utils"); // Kui sul on utils fail, muidu saad selle osa eemaldada

exports.getAll = async (req, res) => {
    try {
        const tickets = await db.Ticket.findAll();
        res.send(tickets.map(({ TicketID, EventName, UserID, PurchaseDate, Price }) => {
            return { TicketID, EventName, UserID, PurchaseDate, Price };
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

exports.create = async (req, res) => {
    if (!req.body.EventName || !req.body.UserID || !req.body.Price) {
        return res.status(400).send({ error: "Üks või mitu parameetrit on puudu" });
    }

    let newTicket = {
        EventName: req.body.EventName,
        UserID: req.body.UserID,
        Price: req.body.Price,
        QRCode: req.body.QRCode // Kui QR-kood on valikuline
    };

    try {
        const createdTicket = await db.Ticket.create(newTicket);
        res.status(201)
            .location(`${Utils.getBaseURL(req)}/tickets/${createdTicket.TicketID}`)
            .send(createdTicket.TicketID);
    } catch (error) {
        res.status(500).send({ error: "Pileti loomine ebaõnnestus" });
    }
};

exports.editById = async (req, res) => {
    const ticket = await getTicket(req, res);
    if (!ticket) { return; }
    
    if (!req.body.EventName || !req.body.UserID || !req.body.Price) {
        return res.status(400).send({ error: "Üks või mitu parameetrit on puudu" });
    }

    ticket.EventName = req.body.EventName;
    ticket.UserID = req.body.UserID;
    ticket.Price = req.body.Price;
    ticket.QRCode = req.body.QRCode; // Kui QR-kood on valikuline

    await ticket.save();
    return res.status(200)
        .location(`${Utils.getBaseURL(req)}/tickets/${ticket.TicketID}`)
        .send(ticket);
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