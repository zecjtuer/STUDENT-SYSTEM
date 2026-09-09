<template>
  <div class="login">
    <h2>校园活动管理系统 登录</h2>
    <div>
      <label>账号：</label>
      <input type="text" v-model="username" placeholder="请输入账号">
    </div>
    <div style="margin-top:10px">
      <label>密码：</label>
      <input type="password" v-model="password" placeholder="请输入密码">
    </div>
    <button style="margin-top:15px" @click="handleLogin">登录</button>

    <div style="margin-top:20px">
      <p>快速测试入口：</p>
      <router-link to="/student">
        <button>直接进入学生页面</button>
      </router-link>
      <router-link to="/teacher">
        <button>直接进入教师页面</button>
      </router-link>
    </div>

    <div style="margin-top:10px">
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const username = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('账号：', username.value, '密码：', password.value)
  alert('登录模拟成功，演示直接跳学生页')
  // TODO：以后对接后端登录接口
  router.push('/student')
}
</script>
