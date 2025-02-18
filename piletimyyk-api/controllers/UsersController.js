const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
    const users = await db.User.findAll();
    res.status(200).send(users.map(({ user_id, first_name, last_name, email }) => ({ user_id, first_name, last_name, email })));
}
exports.getById = async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(user);
}
exports.create = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).send({ error: "One or multiple parameters are missing" });
    }
    const newUser = { first_name, last_name, email, password };
    const createdUser = await db.User.create(newUser);
    res.status(201)
        .location(`${Utils.getBaseURL(req)}/users/${createdUser.user_id}`)
        .send(createdUser);
}
exports.editById = async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).send({ error: "User not found" });
    }
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email) {
        return res.status(400).send({ error: "One or multiple parameters are missing" });
    }
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    await user.save();
    res.status(200).send(user);
}
exports.deleteById = async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).send({ error: "User not found" });
    }
    await user.destroy();
    res.status(204).send();
}
