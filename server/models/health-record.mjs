export default (sequelize, DataTypes) => {
  return sequelize.define('healthRecord', {
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('vaccin', 'sterilizare', 'deparazitare', 'control', 'tratament'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    veterinar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
}
