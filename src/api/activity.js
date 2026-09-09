import request from './request'

// 活动列表（占位接口，当前返回空数据）
export function getActivityList(params) {
  return request({
    url: '/activity/list',
    method: 'get',
    params
  })
}
