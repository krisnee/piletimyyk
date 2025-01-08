module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
  });
  return Event;
};