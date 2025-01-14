module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define(
        'Event',
        {
            EventID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Description: {
                type: DataTypes.TEXT,
            },
            Location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            Time: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            Price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            }
        }
    );
  
    console.log(Event === sequelize.models.Event);
    return Event;
  }