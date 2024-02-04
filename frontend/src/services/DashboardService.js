import axios from 'axios'

//const API_URL = 'https://393d-117-214-251-77.ngrok-free.app/api/dashboard'
const API_URL = 'http://localhost:3000/api/dashboard'

export const getCount = () => {
  return axios.get(API_URL + '/getDashboardCount')
}
