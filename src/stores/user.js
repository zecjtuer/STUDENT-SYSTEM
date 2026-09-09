import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, getUserInfo, logout as logoutApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const role = ref(localStorage.getItem('role') || '')
  const username = ref(localStorage.getItem('username') || '')

  const isLogged = computed(() => !!token.value)

  function setAuth(data) {
    token.value = data.token
    role.value = data.role
    username.value = data.username
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)
    localStorage.setItem('username', data.username)
  }

  function reset() {
    token.value = ''
    role.value = ''
    username.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('username')
  }

  // 登录
  async function login(payload) {
    const res = await loginApi(payload)
    if (res.code === 200) {
      setAuth(res.data)
    }
    return res
  }

  // 拉取用户信息（刷新页面后恢复角色）
  async function fetchUserInfo() {
    const res = await getUserInfo()
    if (res.code === 200) {
      setAuth(res.data)
    }
    return res
  }

  // 退出
  async function logout() {
    try {
      await logoutApi()
    } finally {
      reset()
    }
  }

  return {
    token,
    role,
    username,
    isLogged,
    login,
    logout,
    fetchUserInfo,
    setAuth,
    reset
  }
})
