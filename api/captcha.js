/**
 * 发送验证码
 *
 * @see https://www.easyapi.com
 */
export const sendCaptcha = (params, context) => {
  return context.$axios.get(`${process.env.baseUrl}/captcha/send`, {
    params: {
      ...params,
    },
  })
}
