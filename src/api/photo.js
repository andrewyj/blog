import request from '@/utils/request'

export function fetchPhotos(query) {
  return request({
    url: '/photos',
    method: 'get',
    params: query
  })
}