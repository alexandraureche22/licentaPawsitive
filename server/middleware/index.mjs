import genericError from './generic-error-middleware.mjs'
import auth from './auth-middleware.mjs'
import admin from './admin-middleware.mjs'

export default {
  auth,
  genericError,
  admin
}
