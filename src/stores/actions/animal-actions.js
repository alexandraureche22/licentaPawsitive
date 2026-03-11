import { SERVER } from '../../config/global'

export const getAllAnimals = async ({ search = '', species = '', pageSize = '', pageNumber = '', sortField = '', sortOrder = '' } = {}) => {
  return {
    type: 'GET_ALL_ANIMALS',
    payload: async () => {
      const url = `${SERVER}/api/animals` +
        `?search=${search}` +
        `&species=${species}` +
        `&pageSize=${pageSize}` +
        `&pageNumber=${pageNumber}` +
        `&sortField=${sortField}` +
        `&sortOrder=${sortOrder}`

      const response = await fetch(url)
      if (!response.ok) {
        throw response
      }
      return response.json()
    }
  }
}

export const getOneAnimal = async (id) => {
  return {
    type: 'GET_ONE_ANIMAL',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/animals/${id}`)
      if (!response.ok) {
        throw response
      }
      return response.json()
    }
  }
}
