const initialState = {
  data: [],
  recommendations: [],
  profile: null,
  loading: false
}

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const exists = state.data.find(a => a.id === action.payload.id)
      if (exists) {
        return { ...state, data: state.data.filter(a => a.id !== action.payload.id) }
      }
      return { ...state, data: [...state.data, action.payload] }
    }

    case 'GET_MY_FAVORITES_PENDING':
      return { ...state, loading: true }

    case 'GET_MY_FAVORITES_FULFILLED':
      return { ...state, loading: false, data: action.payload }

    case 'GET_RECOMMENDATIONS_FULFILLED':
      return { ...state, recommendations: action.payload.recommendations, profile: action.payload.profile }

    case 'LOGOUT_FULFILLED':
      return { ...initialState }

    default:
      return state
  }
}