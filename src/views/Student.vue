<template>
  <div class="student-container">
    <h2>学生活动列表</h2>
    <div v-for="act in activityStore.activityList" :key="act.id" class="act-item">
      <h3>{{ act.title }}</h3>
      <p>时间：{{ act.time }}</p>
      <p>地点：{{ act.place }}</p>
      <p>{{ act.desc }}</p>
      <p>已报名人数：{{ act.signUpStudents.length }}/{{ act.maxNum }}</p>
      <button @click="signUp(act)">报名活动</button>
    </div>
  </div>
</template>

<script setup>
import { useActivityStore } from '../stores/activity.js'
const activityStore = useActivityStore()

// 报名函数，不要在顶层读取user.id，放到函数内部
const signUp = (act) => {
  // 加?. 安全读取，user不存在不会报错
  const stuId = activityStore.user?.id
  const stuName = activityStore.user?.name
  if(!stuId){
    alert("用户信息异常，请重新登录")
    return
  }
  activityStore.signActivity(act, {id:stuId, name:stuName})
  alert("报名成功！")
}
</script>

<style scoped>
.student-container{
  padding:20px;
}
.act-item{
  border:1px solid #ccc;
  padding:10px;
  margin:8px 0;
}
button{
  padding:4px 10px;
}
</style>
