import request from '@/utils/request'

export function fetchMenuTree() {
  return request({
    url: '/menus/tree',
    method: 'get'
  })
}