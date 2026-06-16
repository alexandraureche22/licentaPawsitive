const initialState = {
  data: [],
  loading: false,
  error: null,
  success: false
}

export default function adoptionReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_ADOPTION_REQUEST_PENDING':
    case 'GET_MY_ADOPTION_REQUESTS_PENDING':
      return { ...state, loading: true, error: null, success: false }

    case 'CREATE_ADOPTION_REQUEST_FULFILLED':
      return { ...state, loading: false, error: null, success: true }

    case 'GET_MY_ADOPTION_REQUESTS_FULFILLED':
      return { ...state, loading: false, error: null, data: action.payload }

    case 'CREATE_ADOPTION_REQUEST_REJECTED':
    case 'GET_MY_ADOPTION_REQUESTS_REJECTED':
      return { ...state, loading: false, error: action.payload || 'Eroare cerere adopție' }

    case 'RESET_ADOPTION_SUCCESS':
      return { ...state, success: false }

    default:
      return state
  }
}