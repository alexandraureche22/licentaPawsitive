import store from '../store'
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

export const toggleFavorite = async (animalId) => {
  const token = store.getState().user.data.token
  return {
    type: 'TOGGLE_FAVORITE_SERVER',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/favorites/${animalId}`, {
        method: 'post',
        headers: { authorization: token }
      })
      if (!response.ok) throw response
      return response.json()
    }
  }
}

export const getMyFavorites = async () => {
  const token = store.getState().user.data.token
  return {
    type: 'GET_MY_FAVORITES',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/favorites`, {
        headers: { authorization: token }
      })
      if (!response.ok) throw response
      return response.json()
    }
  }
}

export const getRecommendations = async () => {
  const token = store.getState().user.data.token
  return {
    type: 'GET_RECOMMENDATIONS',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/recommendations`, {
        headers: { authorization: token }
      })
      if (!response.ok) throw response
      return response.json()
    }
  }
}