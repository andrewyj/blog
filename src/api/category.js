import request from '@/utils/request'

export function fetchCategory(id) {
  return request({
    url: '/v1/category/'+id,
    method: 'get',
  })
}

export function fetchCategories() {
  return request({
    url: '/v1/categories',
    method: 'get',
  })
}