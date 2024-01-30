import axios from 'axios'
import { ElNotification } from 'element-plus'
import store from "@/store"

const headers = {
  Accept: 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest',
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, withCredentials: true, headers,
})
api.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  config.headers.token = import.meta.env.VITE_API_STATIC_TOKEN
  return config
})

api.interceptors.response.use(undefined, (error) => {
  let errorMessage = error.response?.data?.message

  if (error.response && (error.response.status === 401 || error.response.status === 419)) {
    if (window.location.pathname !== '/login') {
      store.dispatch('auth/LOGOUT')
      return false
    }
    ElNotification({ type: 'error', title: 'Authorisation Error', message: 'Invalid username or password entered' })
    return Promise.reject(error)
  }
  if (error.response && error.response.status === 400) {
    ElNotification({ type: 'error', title: 'Bad request', message: errorMessage ?? 'Bad request' })
    return Promise.reject(error)
  }
  if (error.response && error.response.status === 403) {
    ElNotification({ type: 'error', title: 'Authorisation Error', message: errorMessage ?? 'No rights to take action' })
    return Promise.reject(error)
  }
  if (error.response && error.response.status === 404) {
    ElNotification({ type: 'error', title: 'Not found!', message: errorMessage ?? 'Resource missing' })
    return Promise.reject(error)
  }
  if (error.response && error.response.status === 406) {
    ElNotification({ type: 'error', title: 'Not Acceptable!', message: errorMessage ?? 'Not Acceptable' })
    return Promise.reject(error)
  }

  if (error.response && error.response.status === 413) {
    ElNotification({ type: 'error', title: 'Error', message: errorMessage ?? 'Too much data' })
    return Promise.reject(error)
  }

  if (error.response && error.response.status === 422) {
    let $validationMessage = error.response?.data?.errors
    ElNotification.error({
      title: 'Validation error', message: Object.values($validationMessage).join('\n') ?? 'Contact developers.'
    })
    return Promise.reject(error)
  }

  if (error.response && error.response.status === 500) {
    ElNotification({ type: 'error', title: 'Server error', message: errorMessage ?? 'Contact developers.' })
    return Promise.reject(error)
  }

  if (error.response?.data?.errors) {
    errorMessage = Object.values(error.response.data.errors).flat().toString()
  }
  ElNotification({ type: 'error', title: 'Error', message: errorMessage ?? 'Unrecognized error' })

  return Promise.reject(error)
})

export default api
