import request from '@/utils/request'

export function fetchComments(articleId) {
  let url = '/comments'
  if (articleId) {
    url += '?article_id='+articleId
  }
  return request({
    url: url,
    method: 'get',
  })
}
export function createCategory(data) {
  return request({
    url: '/comment',
    method: 'post',
    data
  })
}