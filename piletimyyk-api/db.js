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
      pool: {
        max: 5, // Maksimaalne ühenduste arv kogumis
        min: 0, // Minimaalne ühenduste arv kogumis
        acquire: 30000, // Maksimaalne aeg millisekundites, mille jooksul saab ühendust enne vea tekkimist hankida
        idle: 10000 // Maksimaalne aeg millisekundites, mille jooksul võib ühendus jõude seista enne vabastamist.
      },
  }
);

// Ühenduse testimine
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");        
    } catch (error) {
        console.error("Connection failed: " + error)
    }
})();

// Mudelite importimine
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Siin saad importida oma mudelid
db.Event = require('./models/Event')(sequelize, DataTypes);
db.User = require('./models/User')(sequelize, DataTypes);
db.Ticket = require('./models/Ticket')(sequelize, DataTypes);


db.Event.hasMany(db.Ticket,  { foreignKey: 'event_id', as: 'tickets' } );
db.User.hasMany(db.Ticket,  { foreignKey: 'user_id', as: 'tickets' } );

db.Event.belongsToMany(db.User, { through: db.Ticket });


// db.Ticket.belongsTo(db.Event /* { foreignKey: 'event_id', as: 'event_id' } */);
// db.Ticket.belongsTo(db.User /* { foreignKey: 'user_id', as: 'user_id' } */);
// db.Ticket.hasOne(() => db.User, user_id, 'user_id')
// declare User?: NonAttribute<User>;
// }



// Mudelite sünkroniseerimine
const sync = async () => {
    try {
        await sequelize.sync({ alter: true }); // Kasutage { force: true } arenduse ajal, et tabeleid täielikult uuesti luua /// alter: true 
        console.log('Models have been synchronised successfully.');
    } catch (error) {
        console.error('Models synchronization failed: ' + error);
    }
};

module.exports = { db, sync };