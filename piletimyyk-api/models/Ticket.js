module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define(
        'Ticket',
        {
            TicketID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            EventID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Events', // Seondub Event mudeliga
                    key: 'EventID'
                }
            },
            UserID: {
                type: DataTypes.INTEGER,
                allowNull: true, // Kui kasutajad on valikulised
                references: {
                    model: 'Users', // Seondub User mudeliga
                    key: 'UserID'
                }
            },
            Quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1, // Vaikimisi ostetud piletite arv
            },
            PurchaseDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW, // Vaikimisi ostu kuupäev
            }
        }
    );
  
    console.log(Ticket === sequelize.models.Ticket);
    return Ticket;
  }