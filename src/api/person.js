import request from '@/utils/request'

export function getPersonList() {
  return request({
    url: '/getPersonList',
    method: 'get'
  })
}

export function getPersonDetail(id) {
  return request({
    url: '/getPersonDetail',
    method: 'get',
    params: {
      id
    }
  })
}

export function addPerson(form) {
  return request({
    url: '/addPerson',
    method: 'post',
    data: {
      form
    }
  })
}
