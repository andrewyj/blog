import request from '@/utils/request'

export function fetchArticleTag(id) {
  return request({
    url: '/article-tag/'+id,
    method: 'get',
  })
}

export function fetchArticleTags() {
  return request({
    url: '/article-tags',
    method: 'get',
  })
}

export function fetchPhotoTag(id) {
  return request({
    url: '/photo-tag/'+id,
    method: 'get',
  })
}