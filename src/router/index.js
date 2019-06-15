import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/Test'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/person/PersonList'),
      meta: { title: '人事管理系统', icon: 'checklist' }
    }]
  }
]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/person',
    component: Layout,
    redirect: '/person/list',
    name: 'Person',
    alwaysShow: true,
    meta: { title: '员工管理', role: ['admin'] },
    children: [
      {
        path: 'add',
        name: 'NewPerson',
        component: () => import('@/views/person/NewPerson'),
        meta: { title: '新增员工', icon: 'nested', role: ['admin'] }
      },
      {
        path: 'list',
        name: 'PersonList',
        component: () => import('@/views/person/PersonList'),
        meta: { title: '员工列表', icon: 'nested', role: ['admin'] }
      }
    ]
  },

  {
    path: '/my',
    component: Layout,
    redirect: '/my/edit',
    name: 'My',
    alwaysShow: true,
    meta: { title: '个人信息', role: ['editor'] },
    children: [
      {
        path: 'edit',
        name: 'EditPerson',
        component: () => import('@/views/person/EditPerson'),
        meta: { title: '信息编辑', icon: 'nested', role: ['editor'] }
      }
    ]
  },
  {
    path: '/salary',
    component: Layout,
    alwaysShow: true,
    name: 'Salary',
    meta: { title: '薪酬管理', role: ['editor', 'admin'] },
    children: [
      {
        path: 'add/:id',
        name: 'NewSalary',
        hidden: true,
        component: () => import('@/views/salary/NewSalary'),
        meta: { title: '发放工资', icon: 'nested', role: ['admin'] }
      },
      {
        path: 'performance/list',
        name: 'SetSalary',
        component: () => import('@/views/performance/PerformanceList'),
        meta: { title: '选择发放人员', icon: 'nested', role: ['admin'] }
      },
      {
        path: 'list',
        name: 'SalaryList',
        component: () => import('@/views/salary/SalaryList'),
        meta: { title: '员工工资列表', icon: 'nested', role: ['admin'] }
      },
      {
        path: 'my',
        name: 'MyHistorySalary',
        component: () => import('@/views/salary/MyHistorySalary'),
        meta: { title: '我的工资', icon: 'nested', role: ['editor'] }
      }
    ]
  },

  {
    path: '/vacation',
    component: Layout,
    alwaysShow: true,
    name: 'Vacation',
    meta: { title: '请假管理', role: ['editor', 'admin'] },
    children: [
      {
        path: 'add',
        name: 'NewVacation',
        component: () => import('@/views/vacation/NewVacation'),
        meta: { title: '申请请假', icon: 'nested', role: ['editor'] }
      },
      {
        path: 'list',
        name: 'VacationList',
        component: () => import('@/views/vacation/VacationList'),
        meta: { title: '请假列表', icon: 'nested', role: ['admin'] }
      },
      {
        path: 'my',
        name: 'MyHistoryVacation',
        component: () => import('@/views/vacation/MyHistoryVacation'),
        meta: { title: '请假历史', icon: 'nested', role: ['editor'] }
      }
    ]
  },

  {
    path: '/performance',
    component: Layout,
    alwaysShow: true,
    name: 'Performance',
    meta: { title: '绩效管理', role: ['editor', 'admin'] },
    children: [
      {
        path: 'add/:id',
        name: 'NewPerformance',
        hidden: true,
        component: () => import('@/views/performance/NewPerformance'),
        meta: { title: '设置员工业绩', icon: 'nested', role: ['admin'] }
      },
      {
        path: 'person/list',
        name: 'SetPerformance',
        component: () => import('@/views/performance/PersonList'),
        meta: { title: '设置员工业绩', icon: 'nested', role: ['admin'] }
      },
      {
        path: 'my',
        name: 'MyHistoryPerformance',
        component: () => import('@/views/performance/MyHistoryPerformance'),
        meta: { title: '我的业绩', icon: 'nested', role: ['editor'] }
      },
      {
        path: 'list',
        name: 'PerformanceList',
        component: () => import('@/views/performance/PerformanceList'),
        meta: { title: '员工业绩列表', icon: 'nested', role: ['admin'] }
      }
    ]
  },
  {
    path: '/attendance',
    component: Layout,
    alwaysShow: true,
    name: 'Attendance',
    meta: { title: '考勤管理', role: ['editor', 'admin'] },
    children: [
      {
        path: 'add',
        name: 'NewAttendance',
        component: () => import('@/views/attendance/NewAttendance'),
        meta: { title: '考勤打卡', icon: 'nested', role: ['editor'] }
      },
      {
        path: 'list',
        name: 'AttendanceList',
        component: () => import('@/views/attendance/AttendanceList'),
        meta: { title: '考勤列表', icon: 'nested', role: ['admin'] }
      },
      {
        path: 'my',
        name: 'MyHistoryAttendance',
        component: () => import('@/views/attendance/MyHistoryAttendance'),
        meta: { title: '历史考勤', icon: 'nested', role: ['editor'] }
      }
    ]
  }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
