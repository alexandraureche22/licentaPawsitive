import { combineReducers } from 'redux'
import userReducer from './user-reducer'
import animalReducer from './animal-reducer'
import adoptionReducer from './adoption-reducer'
import donationReducer from './donation-reducer'
import favoritesReducer from './favorites-reducer'
import adminReducer from './admin-reducer'

const rootReducer = combineReducers({
  user: userReducer,
  animal: animalReducer,
  adoption: adoptionReducer,
  donation: donationReducer,
  favorites: favoritesReducer,
  admin: adminReducer
})

export default rootReducer