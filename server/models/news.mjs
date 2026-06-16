export default (sequelize, DataTypes) => {
  return sequelize.define('news', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('campanii', 'adoptii', 'comunitate', 'educatie'),
      allowNull: false,
      defaultValue: 'comunitate'
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  })
}