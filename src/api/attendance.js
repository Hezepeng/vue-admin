import request from '@/utils/request'

export function getAttendanceList() {
  return request({
    url: '/getAttendanceList',
    method: 'get'
  })
}

export function getMyAttendanceList(id) {
  return request({
    url: '/getMyAttendanceList',
    method: 'get',
    params: {
      id
    }
  })
}
