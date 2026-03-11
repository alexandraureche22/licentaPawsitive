export default (sequelize, DataTypes) => {
  return sequelize.define('animal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    species: {
      type: DataTypes.ENUM('câine', 'pisică', 'iepure', 'altele'),
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('Mascul', 'Femelă'),
      allowNull: false
    },
    size: {
      type: DataTypes.ENUM('mic', 'mediu', 'mare'),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    personality: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    goodWithKids: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    goodWithCats: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    goodWithDogs: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    energyLevel: {
      type: DataTypes.ENUM('scăzut', 'moderat', 'ridicat'),
      allowNull: false
    },
    apartmentFriendly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    shelter: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}
