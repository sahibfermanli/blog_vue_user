import api from '@/services/api'
import { ElNotification } from 'element-plus'

const ENDPOINT = '/profile/'

export default {
  checkLoggedIn() {
    return api.get(ENDPOINT + 'check-logged-in')
  },

  async changePassword(data) {
    const response = await api.post(ENDPOINT + 'change-password', data)

    let responseTitle = response.data?.title
    let responseMessage = response.data?.message

    ElNotification({ type: 'success', title: responseTitle ?? 'Success!', message: responseMessage ?? 'Success!' })
  },
}
