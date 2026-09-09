# campus-activity-frontend

校园活动管理系统前端

## 技术栈

- Vue 3 + `<script setup>` 语法
- Vite 5
- Vue Router 4（含登录守卫与角色权限：student / teacher）
- Pinia（状态管理）
- Element Plus（UI 组件库）
- MockJS（前端数据模拟，不对接后端）
- Axios（API 层封装）

## 目录结构

```
src
├── api                 # 接口与 mock 数据
│   ├── mock.js          # MockJS 拦截配置
│   ├── request.js       # axios 封装
│   ├── user.js          # 用户相关接口（登录、用户信息）
│   └── activity.js      # 活动相关接口
├── assets               # 静态资源
│   └── styles           # 全局样式
├── components           # 公共组件
│   └── AppLayout.vue    # 全局布局组件
├── router               # 路由配置
│   └── index.js
├── stores               # Pinia 状态
│   └── user.js          # 用户登录态与角色
├── views                # 页面
│   ├── login            # 登录页
│   ├── home             # 首页
│   ├── student          # 学生角色页面
│   └── teacher          # 教师角色页面
├── App.vue
└── main.js
```

## 安装依赖

```bash
npm install
```

## 启动开发

```bash
npm run dev
```

## 构建生产

```bash
npm run build
```

## 角色说明

- **student（学生）**：默认登录后可访问 `/student` 下页面
- **teacher（教师）**：默认登录后可访问 `/teacher` 下页面

路由守卫会根据登录态与角色自动跳转：未登录跳转 `/login`，越权访问跳转 `/home`。

> 当前为项目骨架，页面仅放占位文字，未实现具体业务功能。
