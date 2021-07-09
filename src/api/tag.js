import request from '@/utils/request'

export function fetchArticleTag(id) {
  return request({
    url: '/v1/article-tag/'+id,
    method: 'get',
  })
}

export function fetchArticleTags() {
  return request({
    url: '/v1/article-tags',
    method: 'get',
  })
}

export function fetchPhotoTag(id) {
  return request({
    url: '/v1/photo-tag/'+id,
    method: 'get',
  })
}