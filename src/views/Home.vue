<template>
  <div class="home">
    <h1>校园活动管理系统 - 首页</h1>
    <p>欢迎进入系统</p>

    <div class="nav">
      <router-link to="/login">
        <button>前往登录页面</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home{
  padding:30px;
}
.nav{
  margin-top:20px;
}
button{
  padding:8px 16px;
  font-size:16px;
}
</style>
