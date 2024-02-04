import axios from 'axios'

const API_URL = 'http://localhost:3000/api/dashboard'

export const getCount = () => {
  return axios.get(API_URL + '/getDashboardCount')
}
