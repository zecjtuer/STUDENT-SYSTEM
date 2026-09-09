<template>
  <div class="teacher-container">
    <h2>教师后台 - 活动管理</h2>
    <div class="form-box">
      <h3>新建活动</h3>
      <div>活动名称：<input v-model="newAct.title"/></div>
      <div>活动时间：<input v-model="newAct.time"/></div>
      <div>活动地点：<input v-model="newAct.place"/></div>
      <div>活动描述：<input v-model="newAct.desc"/></div>
      <div>最大人数：<input v-model.number="newAct.maxNum"/></div>
      <button @click="addActivity">创建活动</button>
    </div>

    <h3>我创建的活动列表</h3>
    <div v-for="act in myActivityList" :key="act.id" class="act-item">
      <h4>{{ act.title }}</h4>
      <p>时间：{{ act.time }}</p>
      <p>地点：{{ act.place }}</p>
      <p>{{ act.desc }}</p>
      <p>已报名：{{ act.signUpStudents.length }}/{{ act.maxNum }}</p>
      <button @click="showSignList(act)">查看报名学生</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useActivityStore } from '../stores/activity.js'
const activityStore = useActivityStore()

// 新建活动表单
const newAct = ref({
  title: '',
  time: '',
  place: '',
  desc: '',
  maxNum: 50
})

// 筛选：只展示当前老师自己创建的活动
const myActivityList = computed(() => {
  const teacherId = activityStore.user?.id
  if (!teacherId) return []
  return activityStore.activityList.filter(item => item.createTeacherId === teacherId)
})

// 创建活动按钮事件
const addActivity = () => {
  const teacherId = activityStore.user?.id
  const teacherName = activityStore.user?.name
  if (!teacherId) {
    alert("用户信息异常，请重新登录！")
    return
  }
  activityStore.addActivity({
    ...newAct.value,
    createTeacherId: teacherId,
    createTeacherName: teacherName,
    signUpStudents: [],
    id: Date.now()
  })
  alert("活动创建成功")
  newAct.value = { title:'',time:'',place:'',desc:'',maxNum:50 }
}

// 查看报名学生
const showSignList = (act) => {
  let names = act.signUpStudents.map(s => s.name).join('、')
  alert("报名学生：" + (names || "暂无学生报名"))
}
</script>

<style scoped>
.teacher-container{
  padding:20px;
}
.form-box{
  border:1px solid #ccc;
  padding:16px;
  margin-bottom:20px;
}
.act-item{
  border:1px solid #ccc;
  padding:10px;
  margin:8px 0;
}
input{
  margin:4px 0;
  padding:4px;
  width:300px;
}
button{
  padding:5px 10px;
  margin-top:6px;
}
</style>
