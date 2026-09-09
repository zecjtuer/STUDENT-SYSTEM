<template>
  <div class="teacher-container">
    <h2>教师活动管理后台</h2>
    <div class="form-box">
      <h3>发布新活动</h3>
      <div>活动名称：<input v-model="newAct.title"/></div>
      <div>活动时间：<input v-model="newAct.time"/></div>
      <div>活动地点：<input v-model="newAct.place"/></div>
      <div>简介：<textarea v-model="newAct.desc"></textarea></div>
      <div>报名上限：<input type="number" v-model.number="newAct.maxNum"/></div>
      <button @click="addActivity">提交发布</button>
    </div>

    <h3>我的活动列表</h3>
    <div v-for="item in myActivityList" :key="item.id" class="activity-item">
      <h4>{{item.title}}</h4>
      <p>{{item.time}} | {{item.place}}</p>
      <p>已报名：{{item.signUpStudents.length}} / {{item.maxNum}}</p>
      <p>状态：{{item.status}}</p>
      <button @click="openStudentList(item)">查看报名学生名单</button>
      <button @click="editAct(item)">编辑活动</button>
      <button @click="deleteAct(item)">删除活动</button>
    </div>
  </div>
</template>

<script setup>
// TODO：后续对接后端接口
import { ref, computed } from 'vue'
// 当前登录教师id
const currentTeacherId = 1001

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

// 只展示当前教师自己创建的活动
const myActivityList = computed(()=>{
  return activityList.value.filter(item => item.createTeacherId === currentTeacherId)
})

const newAct = ref({
  title:'',
  time:'',
  place:'',
  desc:'',
  maxNum:100,
  status:'报名中'
})

// 新增活动
const addActivity = () => {
  const newId = Date.now()
  activityList.value.push({
    id: newId,
    ...newAct.value,
    createTeacherId: currentTeacherId,
    signUpStudents: []
  })
  alert("活动发布成功！")
  // TODO：对接后端新增活动接口
}

// 删除活动
const deleteAct = (act) => {
  const idx = activityList.value.findIndex(i=>i.id === act.id)
  if(idx !== -1) activityList.value.splice(idx,1)
  alert("已删除")
  // TODO：对接后端删除接口
}

// 编辑活动（简易弹窗思路，你可以后续细化）
const editAct = (act) => {
  alert(`编辑活动：${act.title}`)
  // TODO：对接后端修改活动接口
}

// 查看报名学生名单
const openStudentList = (act) => {
  const names = act.signUpStudents.map(s=>s.name).join('、')
  alert(`报名学生：${names || "暂无报名"}`)
  // TODO：对接后端获取报名学生接口
}
</script>

<style scoped>
.form-box{
  border:1px solid #aaa;
  padding:16px;
  margin-bottom:20px;
}
.activity-item{
  border:1px solid #ccc;
  padding:12px;
  margin:8px 0;
}
input,textarea{
  margin:4px 0;
  width:300px;
  display:block;
}
button{
  margin:4px;
}
</style>
