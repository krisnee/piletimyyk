const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATANAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: 'mariadb',
    logging: console.log,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Connection failed: ' + error);
  }
})();

// Mudelite määratlemine
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.events = require("../src/models/Event")(sequelize, DataTypes);
db.tickets = require("../src/models/Ticket")(sequelize, DataTypes);
db.users = require("../src/models/User")(sequelize, DataTypes);

// Relatsioonide määratlemine
db.events.hasMany(db.tickets);
db.tickets.belongsTo(db.events);

db.events.belongsTo(db.users, { as: 'organizer' });
db.users.hasMany(db.events, { as: 'organizedEvents' });

const sync = async () => {
  await sequelize.sync({ force: true });
  console.log("Models have been synchronized successfully");
};

module.exports = { db, sync };