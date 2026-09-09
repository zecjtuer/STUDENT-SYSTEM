import Mock from 'mockjs'

// 当前登录用户（模块级变量，仅用于 mock）
let currentUser = null

// 模拟登录：student/123 为学生；teacher/123 为教师
Mock.mock('/api/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body || '{}')

  if (username === 'student' && password === '123') {
    currentUser = {
      token: 'mock-student-token',
      role: 'student',
      username: 'student',
      nickname: '学生用户'
    }
    return { code: 200, data: currentUser }
  }

  if (username === 'teacher' && password === '123') {
    currentUser = {
      token: 'mock-teacher-token',
      role: 'teacher',
      username: 'teacher',
      nickname: '教师用户'
    }
    return { code: 200, data: currentUser }
  }

  return { code: 401, message: '用户名或密码错误' }
})

// 模拟获取当前用户信息
Mock.mock('/api/user/info', 'get', () => {
  if (!currentUser) {
    return { code: 401, message: '未登录' }
  }
  return { code: 200, data: currentUser }
})

// 模拟登出
Mock.mock('/api/logout', 'post', () => {
  currentUser = null
  return { code: 200 }
})

// 模拟活动列表（占位空数据）
Mock.mock('/api/activity/list', 'get', () => ({
  code: 200,
  data: { list: [], total: 0 }
}))

// 关闭 mock 控制台提示
Mock.setup({ timeout: '200-500' })
