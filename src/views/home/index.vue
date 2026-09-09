<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="page">
    <h2>首页</h2>
    <p>欢迎，{{ userStore.username || '游客' }}（角色：{{ userStore.role || '无' }}）</p>
    <p>此为占位页面，暂无具体业务功能。</p>
  </div>
</template>

<style scoped>
.page {
  background: #fff;
  padding: 24px;
  border-radius: 4px;
}
</style>
