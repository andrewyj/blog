import request from '@/utils/request'

export function fetchCategory(id) {
  return request({
    url: '/category/'+id,
    method: 'get',
  })
}