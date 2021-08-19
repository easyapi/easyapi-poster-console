/**
 * 获取发票列表
 *
 * @see https://www.easyapi.com
 */
export const getFeedbackList = (params, context) => {
  return context.$axios.get(`${process.env.baseUrl}/console/feedbacks`,
    {
      params: {
        ...params
      }
    }
  )
}

/**
 * 删除发票
 */
export const deleteFeedback = (id, context) => {
  return context.$axios.delete(`${process.env.baseUrl}/console/feedback/${id}`)
}

/**
 * 修改发票
 */
export const updateFeedback = (id, data, context) => {
  return context.$axios.put(`${process.env.baseUrl}/console/feedback/${id}`, data)
}

/**
 * 获取发票详情
 */
export const getFeedbackDetail = (id, params, context) => {
  return context.$axios.get(`${process.env.baseUrl}/console/feedback/${id}`, params)
}

/**
 * 获取反馈配置列表
 */
export const getFeedbackConfigs = (params, context) => {
  return context.$axios.get(`${process.env.baseUrl}/console/feedbackConfigs`, params)
}

/**
 * 提交反馈配置列表
 */
export const creatFeedbackConfig = (data, context) => {
  return context.$axios.post(`${process.env.baseUrl}/console/feedbackConfig`, data)
}

/**
 * 修改反馈配置列表
 */
export const updateFeedbackConfig = (id, data, context) => {
  return context.$axios.put(`${process.env.baseUrl}/console/feedbackConfig/${id}`, data)
}

/**
 * 获取反馈配置详情
 */
export const getFeedbackConfigDetail = (id, params, context) => {
  return context.$axios.get(`${process.env.baseUrl}/console/feedbackConfig/${id}`, params)
}
