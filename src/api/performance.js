import request from '@/utils/request'

export function getPerformanceList() {
  return request({
    url: '/PerformanceApi/getPerformanceList',
    method: 'get'
  })
}

export function getMyPerformanceList(username) {
  return request({
    url: '/PerformanceApi/getMyPerformanceList',
    method: 'get',
    params: {
      username
    }
  })
}

export function addPerformance(form) {
  return request({
    url: '/PerformanceApi/addPerformance',
    method: 'post',
    data: {
      form
    }
  })
}

export function deletePerformance(form) {
  return request({
    url: '/PerformanceApi/deletePerformance',
    method: 'post',
    data: {
      form
    }
  })
}

export function updatePerformance(form) {
  return request({
    url: '/PerformanceApi/updatePerformance',
    method: 'post',
    data: {
      form
    }
  })
}

export function getOnePerformance(id) {
  return request({
    url: '/PerformanceApi/getOnePerformance',
    method: 'get',
    params: {
      id
    }
  })
}
