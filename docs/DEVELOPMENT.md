# DayFlow 开发说明

## 本次基础版本
- React + TypeScript + Vite 响应式 Web 工作台，手机端固定四 Tab：计划、资讯、任务、总结，右下角 AI 入口。
- 任务清单支持新增、完成/撤销、删除、搜索、优先级；API 可连接 PostgreSQL 持久化。
- API 包含健康检查、任务读取/新增/更新/删除/批量同步、真实模型聊天代理。
- PostgreSQL schema 包含 tasks、plans、reflections；迁移脚本可重复执行。

## 启动
1. 安装 Node.js 20+ 与 Docker。
2. `cp .env.example .env`
3. `docker compose up -d db`
4. `npm install`
5. `npm run db:migrate`
6. `npm run dev`

## 环境变量
- DATABASE_URL：PostgreSQL 连接串。
- PORT：API 端口，默认 3001。
- WEB_ORIGIN：开发前端地址。
- AI_API_KEY、AI_MODEL、AI_BASE_URL：可选的 OpenAI-compatible 模型服务配置。未配置时 AI 明确返回未启用，不伪造回复。

## 当前边界 / 下一阶段
此提交是可运行的工程起点，不是 V2.0 全量完成。尚未实现用户注册/登录与多租户隔离、资讯源抓取/订阅/摘要、周期任务与子任务、提醒/推送、语音识别、AI 任务逐条确认与长周期拆解、周/月总结、成就、安卓端、云端部署。当前任务批量同步接口是同一工作空间的基础同步能力，不应在公开部署中作为多用户隔离方案。

## 安全注意
不要提交真实密钥。正式部署前必须实现身份认证、授权与用户数据隔离，启用 HTTPS、限流、审计日志和生产数据库备份。AI API Key 仅保存在服务端环境变量。

## 测试状态
代码已写入 GitHub；尚未在实际 Node/PostgreSQL 环境执行安装、构建、迁移或端到端测试。不可将其视为通过测试。
