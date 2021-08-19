/**
 * 获取用户信息
 *
 * @see https://www.easyapi.com
 */
export const getUser = (context) => {
  return context.$axios.get(`${process.env.baseUrl}/api/account`)
}

/**
 * 修改密码
 *
 * @see https://www.easyapi.com
 */
export const changePassword = (data, context) => {
  return context.$axios.post(`${process.env.baseUrl}/api/account/change-password`, {
    ...data
  })
}
