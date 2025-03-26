# 大屏监控项目
## 项目介绍
基于Vue3+TypeScript+Vite开发的大屏监控项目，采用Element Plus组件库，集成了Echarts图表库，实现了响应式布局和自适应缩放功能。项目使用Pinia进行状态管理，Vue Router进行路由控制，SCSS进行样式管理，postcss-pxtorem实现px到rem的自动转换。

## 技术栈
- Vue3 + TypeScript + Vite
- Element Plus
- Echarts
- Vue Router
- Pinia
- SCSS
- postcss-pxtorem
## 项目结构
```plaintext
├── public/               # 静态资源
├── src/                  # 源代码
│   ├── assets/          # 项目资源文件
│   ├── components/      # 公共组件
│   ├── router/          # 路由配置
│   ├── store/           # Pinia状态管理
│   ├── styles/          # 全局样式
│   ├── views/           # 页面组件
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
├── vite.config.ts       # Vite配置
└── package.json         # 项目依赖
 ```

## 主要功能
- 响应式布局：基于1920x1080分辨率设计，支持等比例缩放
- 数据可视化：集成Echarts实现柱状图、饼图、折线图等多种图表展示
- 状态管理：使用Pinia管理图表数据和应用状态
- 组件化开发：基于Element Plus组件库，实现界面快速搭建
- 样式管理：使用SCSS预处理器，实现样式模块化管理