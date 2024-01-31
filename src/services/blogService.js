import api from './api'
import { ElNotification } from 'element-plus'

const ENDPOINT = '/blogs/'

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

  show(id) {
    return api.get(ENDPOINT + 'show/' + id)
  },

  async addComment(id, data) {
    const response = await api.post(ENDPOINT + '' + id + '/comments/add', data)

    let responseTitle = response.data?.title
    let responseMessage = response.data?.message

    ElNotification({ type: 'success', title: responseTitle ?? 'Updated!', message: responseMessage ?? 'Success!' })

    return response
  },
}
