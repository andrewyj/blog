import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/articles',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id, query) {
  return request({
    url: '/v1/article/'+id,
    method: 'get',
    params: query
  })
}

export function fetchArchives() {
  return request({
    url: '/v1/archives',
    method: 'get'
  })
}