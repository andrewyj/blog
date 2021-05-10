import request from '@/utils/request'

export function fetchTag(id) {
  return request({
    url: '/tag/'+id,
    method: 'get',
  })
}