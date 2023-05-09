import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://192.168.1.106:3000/api',
  headers: {
    'Content-type': 'application/json'
  }
})

export default apiClient
