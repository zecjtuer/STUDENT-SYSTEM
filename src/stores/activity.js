import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
  state() {
    return {
      user: null,
      activityList: [
        {
          id:1,
          title:"校园读书分享会",
          time:"2026-10-10",
          place:"图书馆三楼报告厅",
          desc:"读书交流活动",
          maxNum:50,
          createTeacherId:1001,
          createTeacherName:"王老师",
          signUpStudents:[]
        },
        {
          id:2,
          title:"秋季运动会",
          time:"2026-11-01",
          place:"学校操场",
          desc:"校园田径运动会",
          maxNum:200,
          createTeacherId:1001,
          createTeacherName:"王老师",
          signUpStudents:[]
        }
      ]
    }
  },
  actions:{
    signActivity(act, studentInfo){
      const index = this.activityList.findIndex(item => item.id === act.id)
      if(index === -1) return

      const targetAct = this.activityList[index]
      const hasSigned = targetAct.signUpStudents.some(s => s.id === studentInfo.id)
      if(hasSigned){
        alert("你已经报名该活动！")
        return
      }
      if(targetAct.signUpStudents.length >= targetAct.maxNum){
        alert("活动人数已满！")
        return
      }
      targetAct.signUpStudents = [...targetAct.signUpStudents, studentInfo]
    },
    addActivity(newActData){
      this.activityList.push(newActData)
    }
  }
})
