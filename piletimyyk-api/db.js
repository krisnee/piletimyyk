require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

// Andmebaasi ühenduse loomine
const sequelize = new Sequelize(
  process.env.DB_DATANAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
      host: process.env.DB_HOSTNAME,
      dialect: 'mariadb',
      logging: console.log, // Muuda true, kui soovid logida SQL päringud
      dialectOptions: {
          ssl: {
              rejectUnauthorized: false, // Kui te ei usalda sertifikaati
          }
      }
  }
);

// Ühenduse testimine
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Ühendus andmebaasiga on loodud.');
    } catch (error) {
        console.error('Ühenduse loomine ebaõnnestus: ' + error);
    }
})();

// Mudelite importimine
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Siin saad importida oma mudelid
db.Ticket = require('./models/Ticket')(sequelize, DataTypes);
// db.User = require('./models/User')(sequelize, DataTypes); // Kui sul on User mudel

// Mudelite sünkroniseerimine
const sync = async () => {
    await sequelize.sync({ alter: true });
    console.log('Mudelite sünkroniseerimine on edukalt lõpetatud.');
};

module.exports = { db, sync };