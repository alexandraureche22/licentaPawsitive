import store from '../store'
import { SERVER } from '../../config/global'

export const createAdoptionRequest = async (data) => {
  const token = store.getState().user.data.token
  return {
    type: 'CREATE_ADOPTION_REQUEST',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/adoption-requests`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw response
      }
      return response.json()
    }
  }
}

export const getMyAdoptionRequests = async () => {
  const token = store.getState().user.data.token
  return {
    type: 'GET_MY_ADOPTION_REQUESTS',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/adoption-requests/mine`, {
        headers: { authorization: token }
      })
      if (!response.ok) {
        throw response
      }
      return response.json()
    }
  }
}
