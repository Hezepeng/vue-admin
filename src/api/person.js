import request from '@/utils/request'

export function getPersonList() {
  return request({
    url: '/getPersonList',
    method: 'get',
  })
}
