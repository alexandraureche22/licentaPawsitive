export default (sequelize, DataTypes) => {
  return sequelize.define('favorite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
}