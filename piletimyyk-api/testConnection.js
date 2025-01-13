require('dotenv').config();
const { Sequelize } = require('sequelize');

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

// Logige keskkonnamuutujad
console.log('Keskkonnamuutujad:', {
    DB_DATANAME: process.env.DB_DATANAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_HOSTNAME: process.env.DB_HOSTNAME,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Ühendus andmebaasiga on loodud.');

        // Andmebaasi tabelite loendi saamine
        try {
            const [results, metadata] = await sequelize.query("SHOW TABLES;");
            console.log('Tabelid andmebaasis:', results);
        } catch (error) {
            console.error('Tabelite saamine ebaõnnestus: ' + error.message);
        }

    } catch (error) {
        console.error('Ühenduse loomine ebaõnnestus: ' + error.message);
        
        // Täiendav teave vea kohta
        console.error('Vea kood: ' + error.code);
        console.error('SQLState: ' + error.sqlState);
        console.error('Viga: ' + error.sql);
    }
})();