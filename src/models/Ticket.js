module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    price: DataTypes.NUMERIC,
    qrCode: DataTypes.STRING,
    purchaseDate: DataTypes.DATE,
  });
  return Ticket;
};