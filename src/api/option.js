import request from '@/utils/request'

export function getOptions() {
  return request({
    url: '/options',
    method: 'get',
  })
}