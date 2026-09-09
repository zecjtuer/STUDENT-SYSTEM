<template>
  <div class="teacher-container">
    <h2>教师活动管理后台</h2>
    <div class="form-box">
      <h3>新建活动</h3>
      <div>活动名称：<input v-model="newAct.title"/></div>
      <div>活动时间：<input v-model="newAct.time"/></div>
      <div>活动地点：<input v-model="newAct.place"/></div>
      <div>活动描述：<textarea v-model="newAct.desc"></textarea></div>
      <div>最大人数：<input type="number" v-model.number="newAct.maxNum"/></div>
      <button @click="addActivity">提交发布</button>
    </div>

    <h3>我的活动列表</h3>
    <div v-for="item in myActivityList" :key="item.id" class="activity-item">
      <h4>{{item.title}}</h4>
      <p>{{item.time}} | {{item.place}}</p>
      <p>已报名：{{item.signUpStudents.length}}/{{item.maxNum}}</p>
      <p>状态：{{item.status}}</p>
      <button @click="openStudentList(item)">查看报名学生</button>
      <button @click="editAct(item)">编辑</button>
      <button @click="deleteAct(item)">删除活动</button>
    </div>

    <div style="margin-top:30px">
      <router-link to="/login">返回登录页</router-link>
      &nbsp;|&nbsp;
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'
import { useActivityStore } from '../../stores/activity.js'
const activityStore = useActivityStore()

// 模拟当前登录教师id
const mockTeacherId = 1001

const myActivityList = computed(()=>{
  return activityStore.activityList.filter(i=>i.createTeacherId === mockTeacherId)
})

const newAct = ref({
  title:'',time:'',place:'',desc:'',maxNum:100,
  status:"报名中", createTeacherId: mockTeacherId
})

const addActivity = ()=>{
  activityStore.addNewActivity(newAct.value)
  alert("活动创建成功！")
  // TODO：对接后端新增活动接口
}
const deleteAct = (act)=>{
  activityStore.deleteActivity(act.id)
  alert("已删除活动")
  // TODO：对接后端删除接口
}
const editAct = (act)=>{
  alert(`编辑活动：${act.title}`)
  // TODO：对接后端修改活动接口
}
const openStudentList = (act)=>{
  const names = act.signUpStudents.map(s=>s.name).join('、')
  alert(`报名学生：${names || "暂无学生报名"}`)
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
  display:block;
  width:300px;
}
button{
  margin:4px;
}
</style>
