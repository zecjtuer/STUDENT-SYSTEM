<template>
  <div class="login-box">
    <h2>校园活动系统登录</h2>
    <div>
      <label>账号</label>
      <input v-model="username" placeholder="输入账号">
    </div>
    <div>
      <label>密码</label>
      <input v-model="password" type="password" placeholder="输入密码">
    </div>
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useActivityStore } from '../stores/activity.js'

const router = useRouter()
const activityStore = useActivityStore()

const username = ref('')
const password = ref('')

const handleLogin = () => {
  // 学生账号
  if (username.value === 'student' && password.value === '123') {
    // 先存入用户信息！再跳转（顺序不能反）
    activityStore.user = {
      id: 1,
      name: "学生小明",
      role: "student"
    }
    router.push('/student')
  }
  // 教师账号
  else if (username.value === 'teacher' && password.value === '123') {
    activityStore.user = {
      id: 1001,
      name: "王老师",
      role: "teacher"
    }
    router.push('/teacher')
  }
  else {
    alert('账号或密码错误！')
  }
}
</script>

<style scoped>
.login-box {
  width: 320px;
  margin: 80px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
div {
  margin:12px 0;
}
input {
  width:100%;
  box-sizing: border-box;
  padding:6px;
  margin-top:4px;
}
button {
  width:100%;
  padding:8px;
  background:#409eff;
  color:white;
  border:none;
  border-radius:4px;
  cursor:pointer;
}
</style>
