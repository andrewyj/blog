import request from '@/utils/request'

export function fetchCategory(id) {
  return request({
    url: '/category/'+id,
    method: 'get',
  })
}

export function fetchCategories() {
  return request({
    url: '/categories',
    method: 'get',
  })
}