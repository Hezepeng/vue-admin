import Mock from 'mockjs'

const personList = Mock.mock({
  'items|20': [{
    id: '@zip',
    name: '@cname',
    'password|6-10': '*',
    'sex|1': ['男', '女'],
    'department|1': ['行政', '后勤', '财务', '销售'],
    'startTimes|1-30': 25,
    'endTimes|1-30': 25,
    'state|1': [1, 2, 3],
    remark: '无'
  }]
})

export default [
  {
    url: '/getPersonList',
    type: 'get',
    response: config => {
      const items = personList.items
      return {
        code: 20000,
        data: items
      }
    }
  }
]
