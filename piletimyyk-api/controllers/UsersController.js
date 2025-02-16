const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
    const users = await db.User.findAll();
    res.status(200).send(users.map(({ user_id, first_name, last_name, email }) => ({ user_id, first_name, last_name, email })));
}