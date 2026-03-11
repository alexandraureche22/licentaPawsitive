export default (sequelize, DataTypes) => {
  return sequelize.define('adoptionRequest', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    housingType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hasYard: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasOtherPets: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    otherPetsDetails: {
      type: DataTypes.STRING
    },
    hasChildren: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    childrenAges: {
      type: DataTypes.STRING
    },
    experience: {
      type: DataTypes.TEXT
    },
    motivation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    }
  })
}
