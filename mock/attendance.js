import Mock from 'mockjs'

const attendanceList = Mock.mock({
  'items|20': [{
    id: '@zip',
    name: '@cname',
    'department|1': ['行政', '人事', '财务', '业务'],
    'type|1': ['上班', '下班'],
    time: '@datetime',
    remark: '无'
  }]
})

const myAttendanceList = Mock.mock({
  'items|20': [{
    id: '@zip',
    name: '@cname',
    'department|1': ['行政', '人事', '财务', '业务'],
    'type|1': ['上班', '下班'],
    time: '@datetime',
    remark: '无'
  }]
})

export default [
  {
    url: '/getAttendanceList',
    type: 'get',
    response: config => {
      const items = attendanceList.items
      return {
        code: 20000,
        data: items
      }
    }
  },
  {
    url: '/getMyAttendanceList',
    type: 'get',
    response: config => {
      const items = myAttendanceList.items
      return {
        code: 20000,
        data: items
      }
    }
  }
]
