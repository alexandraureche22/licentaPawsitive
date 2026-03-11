import Sequelize from 'sequelize'
import createUserEntity from './user.mjs'
import createAnimalEntity from './animal.mjs'
import createHealthRecordEntity from './health-record.mjs'
import createAdoptionRequestEntity from './adoption-request.mjs'
import createDonationEntity from './donation.mjs'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logQueryParameters: true
})

const User = createUserEntity(sequelize, Sequelize)
const Animal = createAnimalEntity(sequelize, Sequelize)
const HealthRecord = createHealthRecordEntity(sequelize, Sequelize)
const AdoptionRequest = createAdoptionRequestEntity(sequelize, Sequelize)
const Donation = createDonationEntity(sequelize, Sequelize)

// Un animal are mai multe inregistrari de sanatate
Animal.hasMany(HealthRecord)
HealthRecord.belongsTo(Animal)

// Un user poate face mai multe cereri de adoptie
User.hasMany(AdoptionRequest)
AdoptionRequest.belongsTo(User)

// O cerere de adoptie e pentru un animal
Animal.hasMany(AdoptionRequest)
AdoptionRequest.belongsTo(Animal)

// Un user poate face mai multe donatii
User.hasMany(Donation)
Donation.belongsTo(User)

try {
  await sequelize.sync({ alter: true })
} catch (err) {
  console.warn(err)
}

export default {
  sequelize,
  User,
  Animal,
  HealthRecord,
  AdoptionRequest,
  Donation
}
