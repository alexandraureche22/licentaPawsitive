import { SERVER } from '../../config/global'

export const getStats = async () => {
  return {
    type: 'GET_STATS',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/stats`)
      if (!response.ok) throw response
      return response.json()
    }
  }
}