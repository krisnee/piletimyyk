const express = require('express');
const router = express.Router();
const { Ticket } = require('../models'); // Importi mudelid

// Pileti loomine
router.post('/', async (req, res) => {
    try {
        const ticket = await Ticket.create(req.body);
        res.status(201).json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Piletite loetelu
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.findAll();
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;