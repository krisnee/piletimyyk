const { db } = require("../db");
const Utils = require("./utils");
const { getBaseURL } = require("./utils"); // Lisa see rida

exports.getAll = async (req, res) => {
    const users = await db.User.findAll();
    console.log(users);
    res.status(200).send(users.map(({ user_id, first_name, last_name }) => ({ user_id, first_name, last_name })));
}

exports.getById = async (req, res) => {
    const user = await getUser(req, res);
    if (!user) { return; }
    return res.send(user);
}

exports.create = async (req, res) => {
    if (!req.body.first_name || !req.body.last_name || !req.body.email) {
        return res.status(400).send({ error: "One or multiple parameters are missing" });
    }
    let newUser = {
        Firstname: req.body.first_name,
        Lastname: req.body.last_name,
        Email: req.body.email,
    }
    const createdUser = await db.User.create(newUser);
    res.status(201)
        .location(`${Utils.getBaseURL(req)}/users/${createdUser.ID}`)
        .send(createdUser.user_id);
}

exports.editById = async (req, res) => {
    const user = await getUser(req, res);
    if (!user) { return; }
    if (!req.body.first_name || !req.body.last_name || !req.body.email) {
        return res.status(400).send({ error: "One or multiple parameters are missing" });
    }
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    await user.save();
    res.status(201)
        .location(`${Utils.getBaseURL(req)}/users/${user.user_id}`)
        .send(user);
}

exports.deleteById = async (req, res) => {
    const user = await getUser(req, res);
    if (!user) { return; }
    await user.destroy();
    res.status(204).send();
}
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Kontrolli, kas email ja parool on õiged
    // Tagasta vastus vastavalt tulemusele
    console.log("Sisselogimise lõpp");
};