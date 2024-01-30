import api from './api'
import {ElNotification} from "element-plus";

const ENDPOINT = '/my-blogs/'

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

  async add(data) {
    const response = await api.post(ENDPOINT + 'add', data)

    let responseTitle = response.data?.title
    let responseMessage = response.data?.message

    ElNotification({ type: 'success', title: responseTitle ?? 'Added!', message: responseMessage ?? 'Success!' })
  },

  async update(id, data) {
    const response = await api.post(ENDPOINT + 'update/' + id, data)

    let responseTitle = response.data?.title
    let responseMessage = response.data?.message

    ElNotification({ type: 'success', title: responseTitle ?? 'Updated!', message: responseMessage ?? 'Success!' })
  },

  async delete(id) {
    const response = await api.delete(ENDPOINT + 'delete/' + id)

    let responseTitle = response.data?.title
    let responseMessage = response.data?.message

    ElNotification({type: 'success', title: responseTitle ?? 'Deleted!', message: responseMessage ?? 'Success!'})
  },

  async deleteImage(blogId, id) {
    const response = await api.delete(ENDPOINT + 'delete/image/' + blogId + '/' + id)

    let responseTitle = response.data?.title
    let responseMessage = response.data?.message

    ElNotification({type: 'success', title: responseTitle ?? 'Deleted!', message: responseMessage ?? 'Success!'})
  },
}
