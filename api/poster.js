/**
 * 获取海报记录列表
 *
 * @see https://www.easyapi.com
 */
export const getPosterList = (params, context) => {
  return context.$axios.get(`${process.env.baseUrl}/posters`,
    {
      params: {
        ...params
      }
    }
  )
}

/**
 * 获取海报模板列表
 *
 * @see https://www.easyapi.com
 */
export const getPosterTemplateList = (params, context) => {
  return context.$axios.get(`${process.env.baseUrl}/poster/templates`,
    {
      params: {
        ...params
      }
    }
  )
}

/**
 * 获取海报记录详情
 */
export const getPoster = (id, params, context) => {
  return context.$axios.get(`${process.env.baseUrl}/poster/${id}`, params)
}

/**
 * 删除海报记录
 */
export const deletePoster = (id, context) => {
    return context.$axios.delete(`${process.env.baseUrl}/poster/${id}`)
  }

/**
 * 删除海报模板
 */
export const deletePosterTemplate = (id, context) => {
  return context.$axios.delete(`${process.env.baseUrl}/poster/template/${id}`)
}

/**
 * 添加海报模板信息
 */
export const createPosterTemplate = (data, context) => {
  return context.$axios.post(`${process.env.baseUrl}/poster/template`, {
    data: {
      ...data
    }
  })
}
