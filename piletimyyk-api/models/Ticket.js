module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define(
        'Ticket',
        {
            ticket_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            event_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Events', // Seondub Event mudeliga
                    key: 'EventID'
                }
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true, // Kui kasutajad on valikulised
                references: {
                    model: 'Users', // Seondub User mudeliga
                    key: 'UserID'
                }
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1, // Vaikimisi ostetud piletite arv
            },
            purchase_date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW, // Vaikimisi ostu kuupäev
            }
        }
    );
  
    console.log(Ticket === sequelize.models.Ticket);
    return Ticket;
  }