import request from '@/utils/request'

export function login(username, password,role) {
  return request({
    url: '/LoginApi/login',
    method: 'post',
    data: {
      username,
      password,
      role
    }
  })
}

export function getUserInfo(token) {
  return request({
    url: '/LoginApi/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/LoginApi/logout',
    method: 'get',
    params: {
      token
    }
  })
}
