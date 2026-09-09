import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', public: true }
  },
  {
    path: '/',
    component: () => import('@/components/AppLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/student/index.vue'),
        meta: { title: '学生中心', roles: ['student'] }
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/teacher/index.vue'),
        meta: { title: '教师中心', roles: ['teacher'] }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
    meta: { title: '页面不存在', public: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫：登录态校验 + 角色权限校验
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLogged = userStore.isLogged

  // 设置文档标题
  document.title = to.meta.title
    ? `${to.meta.title} - 校园活动管理系统`
    : '校园活动管理系统'

  // 公开页面（登录页、404 等）直接放行
  if (to.meta.public) {
    // 已登录用户访问登录页时跳转首页
    if (to.path === '/login' && isLogged) {
      return next('/home')
    }
    return next()
  }

  // 未登录：跳转登录页，并记录回跳地址
  if (!isLogged) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  // 角色权限校验：路由声明了 roles 但当前用户不匹配
  if (to.meta.roles && !to.meta.roles.includes(userStore.role)) {
    return next('/home')
  }

  next()
})

// 设置路由标题
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - 校园活动管理系统`
  }
})

export default router
