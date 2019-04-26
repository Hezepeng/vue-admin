import request from '@/utils/request'

export function getVacationList() {
  return request({
    url: '/AttendanceApi/getVacationList',
    method: 'get'
  })
}

export function getMyVacationList(username) {
  return request({
    url: '/AttendanceApi/getMyVacationList',
    method: 'get',
    params: {
      username
    }
  })
}

export function addVacation(form) {
  return request({
    url: '/AttendanceApi/addVacation',
    method: 'post',
    data: {
      form
    }
  })
}

export function deleteVacation(form) {
  return request({
    url: '/AttendanceApi/deleteVacation',
    method: 'post',
    data: {
      form
    }
  })
}

export function updateVacation(form) {
  return request({
    url: '/AttendanceApi/updateVacation',
    method: 'post',
    data: {
      form
    }
  })
}
