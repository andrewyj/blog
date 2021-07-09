import request from '@/utils/request'

export function getOptions() {
  return request({
    url: '/v1/options',
    method: 'get',
  })
}