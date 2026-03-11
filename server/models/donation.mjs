export default (sequelize, DataTypes) => {
  return sequelize.define('donation', {
    donorName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    donationType: {
      type: DataTypes.ENUM('general', 'shelter', 'medical', 'food'),
      defaultValue: 'general'
    },
    shelterName: {
      type: DataTypes.STRING
    },
    message: {
      type: DataTypes.TEXT
    }
  })
}
