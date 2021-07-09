import request from '@/utils/request'

export function fetchPhotos(query) {
  return request({
    url: '/v1/photos',
    method: 'get',
    params: query
  })
}
export function photoAccessLog(id) {
  return request({
    url: '/v1/photo/access-log/' + id,
    method: 'post'
  })
}
