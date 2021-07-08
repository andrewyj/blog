import request from '@/utils/request'

export function getOptions(group) {
  let url = '/options'
  if (group) {
    url += '?group='+ group
  }
  
  return request({
    url: url,
    method: 'get',
  })
}