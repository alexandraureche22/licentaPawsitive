const initialState = {
  adoptionRequests: [],
  donations: [],
  loading: false,
  error: null
}

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_ADOPTION_REQUESTS_PENDING':
    case 'UPDATE_ADOPTION_STATUS_PENDING':
    case 'GET_ALL_DONATIONS_PENDING':
    case 'ADMIN_CREATE_ANIMAL_PENDING':
    case 'ADMIN_UPDATE_ANIMAL_PENDING':
    case 'ADMIN_DELETE_ANIMAL_PENDING':
    case 'ADD_HEALTH_RECORD_PENDING':
      return { ...state, loading: true, error: null }

    case 'GET_ALL_ADOPTION_REQUESTS_FULFILLED':
      return { ...state, loading: false, adoptionRequests: action.payload }

    case 'UPDATE_ADOPTION_STATUS_FULFILLED':
      return {
        ...state,
        loading: false,
        adoptionRequests: state.adoptionRequests.map(r =>
          r.id === action.payload.id ? { ...r, status: action.payload.status } : r
        )
      }

    case 'GET_ALL_DONATIONS_FULFILLED':
      return { ...state, loading: false, donations: action.payload }

    case 'ADMIN_CREATE_ANIMAL_FULFILLED':
    case 'ADMIN_UPDATE_ANIMAL_FULFILLED':
    case 'ADMIN_DELETE_ANIMAL_FULFILLED':
    case 'ADD_HEALTH_RECORD_FULFILLED':
      return { ...state, loading: false }

    case 'GET_ALL_ADOPTION_REQUESTS_REJECTED':
    case 'UPDATE_ADOPTION_STATUS_REJECTED':
    case 'GET_ALL_DONATIONS_REJECTED':
    case 'ADMIN_CREATE_ANIMAL_REJECTED':
    case 'ADMIN_UPDATE_ANIMAL_REJECTED':
    case 'ADMIN_DELETE_ANIMAL_REJECTED':
    case 'ADD_HEALTH_RECORD_REJECTED':
      return { ...state, loading: false, error: action.payload || 'Eroare admin' }

    default:
      return state
  }
}