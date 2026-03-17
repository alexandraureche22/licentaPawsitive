const initialState = {
  data: []
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
    default:
      return state
  }
}