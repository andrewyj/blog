import request from '@/utils/request'

export function fetchTag(id) {
  return request({
    url: '/article-tag/'+id,
    method: 'get',
  })
}

export function fetchTags() {
  return request({
    url: '/article-tags',
    method: 'get',
  })
}