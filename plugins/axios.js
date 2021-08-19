import Cookies from 'js-cookie'
import { Message } from 'element-ui'

export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    let token = Cookies.get('fpAuthToken')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      if (error.response.data.code === -9) {
        Message.error(error.response.data.message)
        redirect('/login')
      } else if (error.response.data.code === -8) {
        window.location.href = 'https://team.easyapi.com/new?from=https://fapiao.easyapi.com'
      } else {
        Message.error(error.response.data.message)
      }
    }
  })
}
