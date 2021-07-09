import request from '@/utils/request'

export function fetchComments(articleId) {
  let url = '/v1/comments'
  if (articleId) {
    url += '?article_id='+articleId
  }
  return request({
    url: url,
    method: 'get',
  })
}
export function createComment(data) {
  return request({
    url: '/v1/comment',
    method: 'post',
    data
  })
}