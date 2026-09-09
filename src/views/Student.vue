<template>
  <div class="student-container">
    <h2>学生活动中心</h2>
    <div class="activity-list">
      <div v-for="item in activityList" :key="item.id" class="activity-item">
        <h3>{{ item.title }}</h3>
        <p>时间：{{ item.time }}</p>
        <p>地点：{{ item.place }}</p>
        <p>简介：{{ item.desc }}</p>
        <p>名额：{{ item.signUpStudents.length }} / {{ item.maxNum }}</p>
        <p>状态：{{ item.status }}</p>

        <button v-if="!hasSignUp(item)" @click="handleSignUp(item)">报名活动</button>
        <button v-else @click="handleCancelSignUp(item)">退选活动</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO：后续对接后端，替换为接口获取活动列表
import { ref } from 'vue'
// 模拟活动数据，后面迁移到pinia
const activityList = ref([
  {
    id: 1,
    title: "校园读书分享会",
    time: "2026-10-10",
    place: "图书馆三楼报告厅",
    desc: "读书交流活动，欢迎同学们参加",
    maxNum: 50,
    createTeacherId: 1001,
    status: "报名中",
    signUpStudents: []
  },
  {
    id: 2,
    title: "秋季运动会",
    time: "2026-11-01",
    place: "学校操场",
    desc: "全校秋季田径运动会",
    maxNum: 200,
    createTeacherId: 1002,
    status: "报名中",
    signUpStudents: []
  }
])
// 模拟当前登录学生id
const currentStudentId = 2001

// 判断是否已经报名
const hasSignUp = (act) => {
  return act.signUpStudents.some(s => s.id === currentStudentId)
}

// 报名
const handleSignUp = (act) => {
  if(act.signUpStudents.length >= act.maxNum){
    alert("名额已满！")
    return
  }
  act.signUpStudents.push({id: currentStudentId, name:"测试学生"})
  alert("报名成功！")
  // TODO：对接后端报名接口
}

// 退选
const handleCancelSignUp = (act) => {
  const idx = act.signUpStudents.findIndex(s => s.id === currentStudentId)
  if(idx !== -1){
    act.signUpStudents.splice(idx,1)
    alert("退选成功！")
    // TODO：对接后端退选接口
  }
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
