import Sequelize from 'sequelize'
import createUserEntity from './user.mjs'
import createAnimalEntity from './animal.mjs'
import createHealthRecordEntity from './health-record.mjs'
import createAdoptionRequestEntity from './adoption-request.mjs'
import createDonationEntity from './donation.mjs'
import createMessageEntity from './message.mjs'
import createFavoriteEntity from './favorite.mjs'
import createNewsEntity from './news.mjs'

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
const Message = createMessageEntity(sequelize, Sequelize)
const Favorite = createFavoriteEntity(sequelize, Sequelize)
const News = createNewsEntity(sequelize, Sequelize)

Animal.hasMany(HealthRecord)
HealthRecord.belongsTo(Animal)

User.hasMany(AdoptionRequest)
AdoptionRequest.belongsTo(User)

Animal.hasMany(AdoptionRequest)
AdoptionRequest.belongsTo(Animal)

User.hasMany(Donation)
Donation.belongsTo(User)

User.hasMany(Favorite)
Favorite.belongsTo(User)

Animal.hasMany(Favorite)
Favorite.belongsTo(Animal)

User.hasMany(News)
News.belongsTo(User)

try {
  await sequelize.sync()
} catch (err) {
  console.warn(err)
}

export default {
  sequelize,
  User,
  Animal,
  HealthRecord,
  AdoptionRequest,
  Donation,
  Message,
  Favorite,
  News
}