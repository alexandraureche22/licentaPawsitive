import store from '../store'
import { SERVER } from '../../config/global'

export const createDonation = async (data) => {
  const token = store.getState().user.data?.token
  const headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers.authorization = token
  }
  return {
    type: 'CREATE_DONATION',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/donations`, {
        method: 'post',
        headers,
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw response
      }
      return response.json()
    }
  }
}
