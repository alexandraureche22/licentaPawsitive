const initialState = {
  data: [],
  count: 0,
  selectedAnimal: null,
  loading: false,
  error: null
}

export default function animalReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_ANIMALS_PENDING':
    case 'GET_ONE_ANIMAL_PENDING':
      return { ...state, loading: true, error: null }

    case 'GET_ALL_ANIMALS_FULFILLED':
      return { ...state, loading: false, error: null, data: action.payload.data, count: action.payload.count }

    case 'GET_ONE_ANIMAL_FULFILLED':
      return { ...state, loading: false, error: null, selectedAnimal: action.payload }

    case 'GET_ALL_ANIMALS_REJECTED':
    case 'GET_ONE_ANIMAL_REJECTED':
      return { ...state, loading: false, error: action.payload || 'Eroare animale' }

    default:
      return state
  }
}
