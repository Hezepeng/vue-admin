import request from '@/utils/request'

export function getAttendanceList() {
  return request({
    url: '/AttendanceApi/getAttendanceList',
    method: 'get'
  })
}

export function getMyAttendanceList(username) {
  return request({
    url: '/AttendanceApi/getMyAttendanceList',
    method: 'get',
    params: {
      username
    }
  })
}

export function addAttendance(form) {
  return request({
    url: '/AttendanceApi/addAttendance',
    method: 'post',
    data: {
      form
    }
  })
}

export function deleteAttendance(form) {
  return request({
    url: '/AttendanceApi/deleteAttendance',
    method: 'post',
    data: {
      form
    }
  })
}

export function updateAttendance(form) {
  return request({
    url: '/AttendanceApi/updateAttendance',
    method: 'post',
    data: {
      form
    }
  })
}
