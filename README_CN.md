🎨 YuKeSong 前端技术架构

面向求职者的 AI 简历工作台 · 可视化 · 可下载 · 可反馈

⚛️ React SPA | 🎭 进度模拟体验优化 | 📄 ATS 友好简历生成 | 🧠 HR 评价式反馈 | 🔐 JWT

<div align="center"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" width="110"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="90"/> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/512px-Tailwind_CSS_Logo.svg.png?20230715030042" width="110"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg" width="90"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" width="110"/> </div>
🎯 项目简介

YuKeSong 是一个 智能化、可视化、可导出 的简历生成与优化平台。
前端不仅是一个简历表单，而是一个围绕：

“简历录入 → AI 优化 → 反馈可视化 → 导出 PDF/Word”

的完整工作台（Workstation）。

✨ 前端核心功能与架构设计
1️⃣ 双模式简历输入（Form + Upload）
📌 表单式信息构建

用户按模块填写个人信息、教育、经历、项目、技能等

实时校验必填项、长度、格式

自动缓存到 localStorage，避免刷新丢失

提交后通过 Axios + JWT 调用后端 AI 优化接口

后端返回结构化 JSON → 实时渲染

📌 上传简历 + JD 模式

支持 PDF/Word 上传

支持 JD 文本粘贴

通过 Axios 发送给后端解析 Agent

解析后的结构化数据自动落到 UI 中并进入优化流程

2️⃣ 自研简历预览组件（ResumePreview）

基于 React + Tailwind CSS 实现：

根据后端 JSON 动态渲染完整简历

保持层级与格式清晰，严格符合 ATS 适配要求

实时更新（无需页面跳转）

支持一键导出 PDF / Word

模块化布局，可扩展不同模板/主题

🧩 前端在本地渲染最终布局，后端只负责生成内容，不负责展示。

3️⃣ HR Feedback 模块（模拟企业招聘评价）

后端返回：

总体匹配度评分

岗位亮点与风险点

针对每条经历的修改建议

前端通过卡片式反馈组件展示：

总分 + 标签（如“匹配度高”“可量化增强”）

每段经历的逐条建议

Tailwind 统一配色与结构分层

目的是让用户感觉像真实 HR/招人经理给出的反馈，而不是纯 LLM 文本。

4️⃣ 非流式的等待体验优化（Progress Simulation）

因为后端处理 2–3 分钟，前端专门设计：

✔️ 模拟进度条（Fake Progress Bar）

阶段显示：

Parsing resume…

Optimizing bullet points…

Evaluating JD fit…

Generating final summary…

✔️ Skeleton UI（骨架屏）

避免空白加载页面
提高用户体感速度

✔️ 动画 + 分阶段文本提示

使等待过程具有心理上的“动感反馈”

⚠️ 前端没有使用流式生成，而是用模拟渐进 UI 提升体验。

🧱 前端技术栈（Tech Stack）
技术	用途
React (JavaScript)	SPA 架构、组件化渲染
Tailwind CSS	现代化 UI、响应式、主题支持
Axios	API 调用、拦截器、JWT 注入
JWT + localStorage	前端持久化认证
React Router	路由跳转
Local Storage 缓存	自动保存用户输入内容
Docker	前端容器化部署
🔄 前后端交互流程（Mermaid 图）
graph TB
    U[用户界面<br/>React] --> F1[选择模式<br/>表单 / 上传简历+JD]

    F1 --> F2[填写信息或上传文件]
    F2 --> F3[请求 AI 优化]

    F3 --> P[伪进度条<br/>阶段提示 + Skeleton UI]
    F3 --> A[Axios + JWT 调用 FastAPI]

    A --> B[后端多 Agent 工作流<br/>LangGraph + DeepSeek + Qwen3]
    B --> C[返回结构化 JSON<br/>简历 + 评分 + 建议]

    C --> V[ResumePreview<br/>实时渲染]
    C --> R[HR Feedback<br/>展示评分]

    V --> D[点击导出 PDF/Word]
    D --> S[后端生成文件 → 前端下载]

⚙️ 前端工程实践

遵循React 设计最佳实践

Axios 拦截器统一处理：

自动附加 JWT token

响应错误统一提示

布局复用 + Tailwind 工具类抽象

本地缓存

自动保存表单内容

刷新不丢失

避免重复提交

按钮 disabled

loading 状态管理

📄 主要功能模块

个人信息

教育背景

工作经历

项目经验

技能（自动格式化）

证书

职业总结

一键导出 PDF/Word

HR 评价反馈

撰写/上传简历双模式

🚀 项目启动（React + Vite）
克隆项目
git clone https://github.com/626-Legendary/ai-resume.git
cd ai-resume

安装依赖
npm install

开发环境
npm run dev

构建生产版本
npm run build

📦 部署方式

支持：

Vercel（推荐）

Netlify

GitHub Pages

Docker 部署（附带 Nginx 配置）

传统服务器 Nginx / Apache

（已自动合并你原文中的所有部署内容）

🔒 数据安全

JWT 前端持久化

Axios 拦截器自动注入

字段校验确保安全提交

CORS 配置安全访问