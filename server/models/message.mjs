export default (sequelize, DataTypes) => {
  return sequelize.define('message', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fromUserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    toUserId: {
      type: DataTypes.INTEGER
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
}