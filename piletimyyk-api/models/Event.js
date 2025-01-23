module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define(
        'Event',
        {
            event_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            time: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }
    );  
    console.log(Event === sequelize.models.Event);
    return Event;
  }