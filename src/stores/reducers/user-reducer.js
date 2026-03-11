const initialState = {
  data: {},
  loading: false,
  error: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_PENDING':
    case 'REGISTER_PENDING':
    case 'LOGOUT_PENDING':
      return { ...state, loading: true, error: null }

    case 'LOGIN_FULFILLED':
    case 'REGISTER_FULFILLED':
      return { ...state, loading: false, error: null, data: action.payload }

    case 'LOGOUT_FULFILLED':
      return { ...state, loading: false, error: null, data: {} }

    case 'LOGIN_REJECTED':
    case 'REGISTER_REJECTED':
    case 'LOGOUT_REJECTED':
      return { ...state, loading: false, error: action.payload || 'Eroare autentificare' }

    default:
      return state
  }
}
