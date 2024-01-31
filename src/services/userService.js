import api from './api'
import {ElNotification} from "element-plus";

const ENDPOINT = '/users/'

export default {
  list () {
    return api.get(ENDPOINT + 'list')
  },
}
