const initialState = {
  data: null,
  loading: false,
  error: null
}

export default function statsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_STATS_PENDING':
      return { ...state, loading: true, error: null }
    case 'GET_STATS_FULFILLED':
      return { ...state, loading: false, data: action.payload }
    case 'GET_STATS_REJECTED':
      return { ...state, loading: false, error: action.payload || 'Eroare statistici' }
    default:
      return state
  }
}