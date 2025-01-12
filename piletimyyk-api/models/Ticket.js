module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
      'Ticket',
      {
          TicketID: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
          },
          EventName: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          UserID: {
              type: DataTypes.INTEGER,
              allowNull: false,
          },
          PurchaseDate: {
              type: DataTypes.DATE,
              defaultValue: DataTypes.NOW,
          },
          Price: {
              type: DataTypes.DECIMAL,
              allowNull: false,
          },
          QRCode: {
              type: DataTypes.STRING,
          }
      }
  );

  console.log(Ticket === sequelize.models.Ticket);
  return Ticket;
}