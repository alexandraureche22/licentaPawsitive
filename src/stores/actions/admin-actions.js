import store from '../store'
import { SERVER } from '../../config/global'

export const createAnimal = async (data) => {
  const token = store.getState().user.data.token
  return {
    type: 'ADMIN_CREATE_ANIMAL',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/animals`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json', authorization: token },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw response
      return response.json()
    }
  }
}

export const updateAnimal = async (id, data) => {
  const token = store.getState().user.data.token
  return {
    type: 'ADMIN_UPDATE_ANIMAL',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/animals/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json', authorization: token },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw response
      return response.json()
    }
  }
}

export const deleteAnimal = async (id) => {
  const token = store.getState().user.data.token
  return {
    type: 'ADMIN_DELETE_ANIMAL',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/animals/${id}`, {
        method: 'delete',
        headers: { authorization: token }
      })
      if (!response.ok) throw response
      return id
    }
  }
}

export const getAllAdoptionRequests = async () => {
  const token = store.getState().user.data.token
  return {
    type: 'GET_ALL_ADOPTION_REQUESTS',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/adoption-requests`, {
        headers: { authorization: token }
      })
      if (!response.ok) throw response
      return response.json()
    }
  }
}

export const updateAdoptionRequestStatus = async (id, status) => {
  const token = store.getState().user.data.token
  return {
    type: 'UPDATE_ADOPTION_STATUS',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/adoption-requests/${id}/status`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json', authorization: token },
        body: JSON.stringify({ status })
      })
      if (!response.ok) throw response
      return response.json()
    }
  }
}

export const getAllDonations = async () => {
  const token = store.getState().user.data.token
  return {
    type: 'GET_ALL_DONATIONS',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/donations`, {
        headers: { authorization: token }
      })
      if (!response.ok) throw response
      return response.json()
    }
  }
}

export const addHealthRecord = async (animalId, data) => {
  const token = store.getState().user.data.token
  return {
    type: 'ADD_HEALTH_RECORD',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/animals/${animalId}/health-records`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json', authorization: token },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw response
      return response.json()
    }
  }
}