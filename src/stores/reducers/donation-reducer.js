const initialState = {
  loading: false,
  error: null,
  success: false
}

export default function donationReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_DONATION_PENDING':
      return { ...state, loading: true, error: null, success: false }

    case 'CREATE_DONATION_FULFILLED':
      return { ...state, loading: false, error: null, success: true }

    case 'CREATE_DONATION_REJECTED':
      return { ...state, loading: false, error: action.payload || 'Eroare donație' }

    default:
      return state
  }
}
