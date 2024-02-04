import axios from 'axios'

const API_URL = 'http://localhost:3000/api/task'

export const createTask = (task) => {
  return axios.post(API_URL + '/add', task)
}

export const updateTask = (id, task) => {
  return axios.put(API_URL + '/updateTask/' + id, task)
}

export const getTask = (id) => {
  return axios.get(API_URL + '/getTask/' + id)
}

export const searchTask = (search) => {
  return axios.post(API_URL + '/search', search)
}

// export const getAllTasks = () => {
//   return axios.get(API_URL + '/getAllTasks')
// }

export const getAllTasks = (page = 0) => {
  const params = {
    page: page,
    size: 10, // you can adjust the default size if needed
  }

  return axios.get(API_URL + '/getAllTasks', { params })
}

export const inCompleteTask = (id) => {
  return axios.patch(API_URL + 'user')
}

export const deleteTask = (id) => {
  return axios.delete(API_URL + '/deleteTask/' + id)
}

export const completeTask = (id) => {
  return axios.patch(API_URL + 'admin')
}
