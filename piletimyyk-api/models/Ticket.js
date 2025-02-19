module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define(
        'Ticket',
        {
            ticket_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
/*             event_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Event",
                    key: 'event_id'
                }
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "User",
                    key: 'user_id'
                }
            }, */
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            purchase_date: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
            }
        }
    );
    console.log(Ticket === sequelize.models.Ticket);
    return Ticket;
  }