import request from '@/utils/request'

export function getSalaryList() {
  return request({
    url: '/SalaryApi/getSalaryList',
    method: 'get'
  })
}

export function getMySalaryList(username) {
  return request({
    url: '/SalaryApi/getMySalaryList',
    method: 'get',
    params: {
      username
    }
  })
}

export function addSalary(form) {
  return request({
    url: '/SalaryApi/addSalary',
    method: 'post',
    data: {
      form
    }
  })
}

export function deleteSalary(form) {
  return request({
    url: '/SalaryApi/deleteSalary',
    method: 'post',
    data: {
      form
    }
  })
}

export function updateSalary(form) {
  return request({
    url: '/SalaryApi/updateSalary',
    method: 'post',
    data: {
      form
    }
  })
}
