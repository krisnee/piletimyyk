module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      first_name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      last_name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING(100),
          unique: true,
          allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });
  return User;
};