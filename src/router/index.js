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
    component: () => import('@/views/login/Login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/Index'),
      meta: { title: '考勤管理系统控制台', icon: 'dashboard' }
    }]
  }

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: {title: 'Example'},
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/dashboard/Index'),
  //       meta: {title: 'Table'}
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/dashboard/Index'),
  //       meta: {title: 'Tree'}
  //     }
  //   ]
  // }
]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    name: 'Permission',
    redirect: '/permission/admin',
    alwaysShow: true,
    meta: {
      title: '权限测试页面',
      icon: 'nested',
      role: ['admin']
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/permission/RootPermission'),
        name: 'AdminPage',
        meta: {
          role: ['admin', 'super_editor'],
          title: '权限测试',
          icon: 'checklist',
          noCache: true
          // 页面需要的权限
        }
      },
      {
        path: 'child',
        component: () => import('@/views/permission/AdminPage'),
        name: 'AdminPage',
        meta: {
          role: ['admin', 'super_editor'],
          title: '子权限测试页',
          icon: 'addteam',
          noCache: true
        } // 页面需要的权限
      }
    ]
  },

  {
    path: '/person',
    component: Layout,
    redirect: '/person/list',
    name: 'Person',
    alwaysShow: true,
    meta: { title: '员工管理', icon: 'example', role: ['admin'] },
    children: [
      {
        path: 'add',
        name: 'NewPerson',
        component: () => import('@/views/person/NewPerson'),
        meta: { title: '新增员工', icon: 'form', role: ['admin'] }
      },
      {
        path: 'list',
        name: 'PersonList',
        component: () => import('@/views/person/PersonList'),
        meta: { title: '员工列表', icon: 'table', role: ['admin'] }
      }
    ]
  },

  {
    path: '/my',
    component: Layout,
    redirect: '/my/edit',
    name: 'My',
    alwaysShow: true,
    meta: { title: '个人信息', icon: 'example', role: ['editor'] },
    children: [
      {
        path: 'edit',
        name: 'EditPerson',
        component: () => import('@/views/person/EditPerson'),
        meta: { title: '查看编辑', icon: 'form', role: ['editor'] }
      }
    ]
  },

  {
    path: '/attendance',
    component: Layout,
    redirect: '/attendance/list',
    alwaysShow: true,
    name: 'Attendance',
    meta: { title: '考勤管理', icon: 'tree', role: ['editor', 'admin'] },
    children: [
      {
        path: 'add',
        name: 'NewAttendance',
        component: () => import('@/views/attendance/NewAttendance'),
        meta: { title: '考勤打卡', icon: 'form', role: ['editor'] }
      },
      {
        path: 'list',
        name: 'AttendanceList',
        component: () => import('@/views/attendance/AttendanceList'),
        meta: { title: '考勤列表', icon: 'table', role: ['admin'] }
      },
      {
        path: 'my',
        name: 'MyHistoryAttendance',
        component: () => import('@/views/attendance/MyHistoryAttendance'),
        meta: { title: '历史考勤', icon: 'table', role: ['editor'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
