import axios from 'axios'

//const API_URL = 'https://393d-117-214-251-77.ngrok-free.app/api/auth'
const API_URL = 'http://localhost:3000/api/auth'

const register = (name, username, email, password) => {
  return axios.post(API_URL + '/register', {
    name,
    username,
    email,
    password,
  })
}

const login = (username, password) => {
  return axios
    .post(API_URL + '/login', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    })
}

const logout = () => {
  localStorage.removeItem('user')
  return axios.post(API_URL + '/logout').then((response) => {
    return response.data
  })
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService
