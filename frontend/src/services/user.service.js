import axios from 'axios'

//const API_URL = 'https://393d-117-214-251-77.ngrok-free.app/api/test/'
const API_URL = 'http://localhost:3000/api/test/'

const getPublicContent = () => {
  return axios.get(API_URL + 'all')
}

const getUserBoard = () => {
  return axios.get(API_URL + 'user')
}

const getModeratorBoard = () => {
  return axios.get(API_URL + 'mod')
}

const getAdminBoard = () => {
  return axios.get(API_URL + 'admin')
}

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
}

export default UserService
