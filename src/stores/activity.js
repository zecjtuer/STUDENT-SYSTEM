import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    // 当前登录用户
    currentUser: {
      id: null,
      name: '',
      role: '' // 角色：student 学生 / teacher 教师
    },
    // 全局共享的活动数据
    activityList: [
      {
        id: 1,
        title: "校园读书分享会",
        time: "2026-10-10",
        place: "图书馆三楼报告厅",
        desc: "读书交流活动",
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
        desc: "校园田径运动会",
        maxNum: 200,
        createTeacherId: 1001,
        status: "报名中",
        signUpStudents: []
      }
    ]
  }),

  actions: {
    // 设置登录用户信息
    setUser(userInfo) {
      this.currentUser = userInfo
    },
    // 清空用户，退出登录
    clearUser() {
      this.currentUser = { id: null, name: '', role: '' }
    },

    // 学生报名活动
    signUpActivity(actId, student) {
      const act = this.activityList.find(item => item.id === actId)
      if (!act) return { ok: false, msg: "活动不存在" }
      if (act.signUpStudents.length >= act.maxNum) return { ok: false, msg: "名额已满" }
      const exist = act.signUpStudents.some(s => s.id === student.id)
      if (exist) return { ok: false, msg: "你已经报名" }
      act.signUpStudents.push(student)
      return { ok: true, msg: "报名成功！" }
    },

    // 学生退选活动
    cancelSignUp(actId, studentId) {
      const act = this.activityList.find(item => item.id === actId)
      if (!act) return
      const idx = act.signUpStudents.findIndex(s => s.id === studentId)
      if (idx > -1) act.signUpStudents.splice(idx,1)
    },

    // 教师新增活动
    addNewActivity(actObj) {
      const newId = Date.now()
      this.activityList.push({
        id: newId,
        ...actObj,
        signUpStudents: []
      })
    },

    // 教师删除活动
    deleteActivity(actId) {
      const index = this.activityList.findIndex(item => item.id === actId)
      if (index > -1) this.activityList.splice(index,1)
    }
  }
})
