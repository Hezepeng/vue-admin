import request from '@/utils/request'

export function getPersonList() {
  return request({
    url: '/PersonApi/getPersonList',
    method: 'get'
  })
}

export function getPersonDetail(username) {
  return request({
    url: '/PersonApi/getPersonDetail',
    method: 'get',
    params: {
      username
    }
  })
}

export function addPerson(form) {
  return request({
    url: '/PersonApi/addPerson',
    method: 'post',
    data: {
      form
    }
  })
}

export function updatePerson(form) {
  return request({
    url: '/PersonApi/updatePerson',
    method: 'post',
    data: {
      form
    }
  })
}

export function deletePerson(form) {
  return request({
    url: '/PersonApi/deletePerson',
    method: 'post',
    data: {
      form
    }
  })
}
