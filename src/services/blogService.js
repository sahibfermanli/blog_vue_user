import api from './api'

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
}
