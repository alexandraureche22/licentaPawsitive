import { combineReducers } from 'redux'
import userReducer from './user-reducer'
import animalReducer from './animal-reducer'
import adoptionReducer from './adoption-reducer'
import donationReducer from './donation-reducer'

const rootReducer = combineReducers({
  user: userReducer,
  animal: animalReducer,
  adoption: adoptionReducer,
  donation: donationReducer
})

export default rootReducer
