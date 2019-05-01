import request from '@/utils/request'

export function getVacationList() {
  return request({
    url: '/VacationApi/getVacationList',
    method: 'get'
  })
}

export function getMyVacationList(username) {
  return request({
    url: '/VacationApi/getMyVacationList',
    method: 'get',
    params: {
      username
    }
  })
}

export function addVacation(form) {
  return request({
    url: '/VacationApi/addVacation',
    method: 'post',
    data: {
      form
    }
  })
}

export function deleteVacation(form) {
  return request({
    url: '/VacationApi/deleteVacation',
    method: 'post',
    data: {
      form
    }
  })
}

export function updateVacation(form) {
  return request({
    url: '/VacationApi/updateVacation',
    method: 'post',
    data: {
      form
    }
  })
}
