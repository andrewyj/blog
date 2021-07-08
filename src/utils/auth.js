import Cookies from 'js-cookie'

const TokenKey = 'andrew_blog_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

