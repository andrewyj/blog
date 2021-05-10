import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/articles',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id, query) {
  return request({
    url: '/article/'+id,
    method: 'get',
    params: query
  })
}