import Cookies from 'js-cookie'
import { getUser } from '@/api/account'

const user = {
  state: {
    accountInfo: '',
    userId: '',
    username: '',
    nickname: '',
    photo: '',
    mobile: '',
    email: '',
    menusIds: '',
    token: Cookies.get('fpAuthToken'),
    defaultShop: '',
    type: '',
    platform: ''
  },

  mutations: {
    SET_ACCOUNT_INFO: (state, accountInfo) => {
      state.accountInfo = accountInfo
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_MENU: (state, menusIds) => {
      state.menusIds = menusIds
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_DEFAULT_SHOP: (state, shop) => {
      state.defaultShop = shop
    },
    SET_TYPE: (state, type) => {
      state.type = type
    },
    SET_PLATFORM: (state, platform) => {
      state.platform = platform
    }
  },

  actions: {
    /**
     * 获取用户信息
     */
    getUserInfo({ commit, state }, context) {
      getUser(context).then((res) => {
        if (res.data.code === 1) {
          let userInfoData = res.data.content
          commit('SET_ACCOUNT_INFO', userInfoData)
          commit('SET_USER_ID', userInfoData.id)
          commit('SET_USERNAME', userInfoData.username)
          commit('SET_NICKNAME', userInfoData.nickname)
          commit('SET_PHOTO', userInfoData.photo)
          commit('SET_MOBILE', userInfoData.mobile)
          commit('SET_EMAIL', userInfoData.email)
          //menuIds
          let menu = ''
          for (let i in userInfoData.menus) {
            menu += userInfoData.menus[i].menuId + ','
          }
          commit('SET_MENU', menu)

          commit('SET_DEFAULT_SHOP', userInfoData.shop)
          commit('SET_TYPE', userInfoData.type)
          commit('SET_PLATFORM', userInfoData.platform)
          Cookies.set('userInfo', JSON.stringify(res.data), { expires: 30 })
          localStorage.setItem('userInfo', JSON.stringify(res.data.content))
        }
      })
    },
    /**
     * 登出
     */
    logout({ commit, state }) {
      Cookies.remove('fpAuthToken', 'userInfo')
    }
  }
}

export default user
