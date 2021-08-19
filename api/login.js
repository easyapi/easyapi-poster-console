/**
 * 登录
 *
 * @see https://www.easyapi.com
 */
export const postLogin = (data, context) => {
  return context.$axios.post(`${process.env.baseUrl}/api/authenticate`, data)
}
