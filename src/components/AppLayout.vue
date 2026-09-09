<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

// 退出登录
async function handleLogout() {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      type: 'warning',
      confirmButtonText: '退出',
      cancelButtonText: '取消'
    })
    await userStore.logout()
    ElMessage.success('已退出登录')
    router.replace('/login')
  } catch (e) {
    // 用户取消，忽略
  }
}
</script>

<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="logo">校园活动管理系统</div>
      <div class="user">
        <span class="name">{{ userStore.username || '未登录' }}</span>
        <el-tag v-if="userStore.role" size="small" type="info">
          {{ userStore.role === 'student' ? '学生' : '教师' }}
        </el-tag>
        <el-button link type="primary" @click="handleLogout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="210px" class="aside">
        <el-menu router :default-active="$route.path">
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item v-if="userStore.role === 'student'" index="/student">
            学生中心
          </el-menu-item>
          <el-menu-item v-if="userStore.role === 'teacher'" index="/teacher">
            教师中心
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout {
  height: 100vh;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #ebeef5;
}
.logo {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}
.user {
  display: flex;
  align-items: center;
  gap: 12px;
}
.user .name {
  color: #606266;
}
.aside {
  background: #fff;
  border-right: 1px solid #ebeef5;
}
.main {
  background: #f5f7fa;
}
</style>
