<template>
  <div class="student-container">
    <h2>学生活动中心</h2>
    <div class="activity-list">
      <div v-for="item in activityStore.activityList" :key="item.id" class="activity-item">
        <h3>{{ item.title }}</h3>
        <p>时间：{{ item.time }}</p>
        <p>地点：{{ item.place }}</p>
        <p>介绍：{{ item.desc }}</p>
        <p>报名人数：{{ item.signUpStudents.length }} / {{ item.maxNum }}</p>
        <p>状态：{{ item.status }}</p>

        <button v-if="!hasSignUp(item)" @click="handleSignUp(item)">报名活动</button>
        <button v-else @click="handleCancel(item)">取消报名</button>
      </div>
    </div>

    <div style="margin-top:30px">
      <router-link to="/login">返回登录页</router-link>
      &nbsp;|&nbsp;
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
// 注意路径，两层 ../
import { useActivityStore } from '../../stores/activity.js'
const activityStore = useActivityStore()

// 模拟登录学生，后续对接后端替换
const mockStudent = { id:2001, name:"测试学生" }

const hasSignUp = (act)=>{
  return act.signUpStudents.some(s=>s.id === mockStudent.id)
}

const handleSignUp = (act)=>{
  const res = activityStore.signUpActivity(act.id, mockStudent)
  alert(res.msg)
  // TODO：对接后端报名接口
}
const handleCancel = (act)=>{
  activityStore.cancelSignUp(act.id, mockStudent.id)
  alert("已取消报名")
  // TODO：对接后端退选接口
}
</script>

<style scoped>
.activity-item{
  border:1px solid #ccc;
  padding:16px;
  margin:10px 0;
  border-radius:8px;
}
button{
  margin-right:8px;
  padding:4px 12px;
}
</style>
