import api from './api'
import { ElNotification } from 'element-plus'

const ENDPOINT = '/chats/'

export default {
  load (search, page = null, limit = null) {
    let params = {
      ...search,
    }
    if (page && limit) {
      params = { ...params, page, limit }
    }

    return api.get(ENDPOINT + 'load', { params })
  },

  loadMessages (id, search, page = null, limit = null) {
    let params = {
      ...search,
    }
    if (page && limit) {
      params = { ...params, page, limit }
    }

    return api.get(ENDPOINT + id + '/messages', { params })
  },

  async sendMessage(id, data) {
    const response = await api.post(ENDPOINT + '' + id + '/messages/send', data)

    let responseTitle = response.data?.title
    let responseMessage = response.data?.message

    ElNotification({ type: 'success', title: responseTitle ?? 'Updated!', message: responseMessage ?? 'Success!' })

    return response
  },

  async startNewChat(data) {
    const response = await api.post(ENDPOINT + 'new', data)

    let responseTitle = response.data?.title
    let responseMessage = response.data?.message

    ElNotification({ type: 'success', title: responseTitle ?? 'Paid!', message: responseMessage ?? 'Success!' })

    return response.data.id
  },
}
