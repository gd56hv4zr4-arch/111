# 🎫 Ticket Intelligence System — 智能工单分类/评测/推荐系统

> 一个专为 Vibe Coding 设计的全栈项目模板。适合 Cursor / Claude Code / v0 等 AI 编程工具一键生成。

## 🎯 项目定位

**数据处理 + 工单流程 + 智能分类 + 质量评测 + 智能推荐** 的一站式系统。

适合场景：
- 客服工单自动分流
- IT运维事件处理
- 内容审核与分类
- 任务智能分配

## 🏗️ 技术架构（2026 推荐栈）

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端框架 | Next.js 16 (App Router) | 全栈 React，API Routes 直接写后端 |
| UI 组件 | shadcn/ui + Tailwind CSS | 复制即用，零设计负担 |
| 状态管理 | Zustand + TanStack Query | 轻量、高效 |
| 数据库 | SQLite (dev) → PostgreSQL (prod) | Prisma ORM 管理 |
| 数据可视化 | Recharts | 工单趋势、分类分布 |
| AI 能力 | 本地规则引擎 + OpenAI API 可选 | 分类/推荐/摘要 |
| 部署 | Vercel | 一键部署 |

## 📁 项目结构

```
ticket-intelligence/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── tickets/           # 工单列表页
│   ├── dashboard/         # 数据看板
│   ├── classify/          # 分类评测页
│   ├── recommend/         # 推荐面板
│   └── page.tsx           # 首页
├── components/
│   ├── ui/                # shadcn 组件
│   ├── ticket-card.tsx    # 工单卡片
│   ├── ticket-form.tsx    # 提交表单
│   ├── classify-panel.tsx # 分类面板
│   ├── recommend-panel.tsx# 推荐面板
│   └── stats-charts.tsx   # 统计图表
├── lib/
│   ├── prisma.ts          # 数据库连接
│   ├── classifier.ts      # 智能分类引擎
│   ├── recommender.ts     # 智能推荐引擎
│   └── evaluator.ts       # 质量评测引擎
├── types/
│   └── index.ts           # 类型定义
├── prisma/
│   └── schema.prisma      # 数据库模型
└── README.md
```

## 🚀 Vibe Coding 快速启动指南

### Step 1: 环境准备（让 AI 执行）

```bash
npx create-next-app@latest ticket-intelligence --typescript --tailwind --app
```

### Step 2: 安装依赖（复制给 AI）

```bash
npm install @prisma/client prisma zustand @tanstack/react-query recharts lucide-react
npm install -D @types/node
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input badge dialog select tabs table textarea
```

### Step 3: 核心提示词（给 Cursor/Claude 的 System Prompt）

```
你是一个全栈工程师，正在开发一个"智能工单处理系统"。

核心功能模块：
1. 工单管理：CRUD，支持标题、描述、优先级、状态、分类标签、处理人
2. 智能分类：根据标题和描述自动分类（技术支持/产品反馈/投诉/咨询），使用规则引擎 + 关键词匹配
3. 智能评测：SLA 超时检测、处理时效评分、满意度预测
4. 智能推荐：基于处理人当前负载和技能标签，推荐最优分配人
5. 数据看板：分类分布饼图、工单趋势折线图、处理人负载柱状图

技术要求：
- Next.js 16 App Router，TypeScript 严格模式
- shadcn/ui 组件库，Tailwind CSS 样式
- Prisma + SQLite 数据库
- 所有数据操作通过 Server Actions 或 API Routes
- 使用 Zustand 管理客户端状态
- 图表使用 Recharts

设计规范：
- 使用 slate 色系，indigo 作为主色
- 卡片式布局，圆角 12px，阴影柔和
- 响应式布局，支持移动端
- 加载状态用骨架屏

请按以下顺序实现：
1. 数据库模型 (prisma/schema.prisma)
2. 类型定义 (types/index.ts)
3. 核心引擎 (lib/classifier.ts, lib/recommender.ts, lib/evaluator.ts)
4. 页面和组件
5. 数据看板
```

## 🧠 核心算法设计

### 1. 分类引擎 (Rule-based + 可扩展)

基于关键词 + 权重的分类器：
- TECH_SUPPORT: bug, 崩溃, 报错, 无法, error, 失败, 闪退...
- PRODUCT_FEEDBACK: 建议, 希望, 能否, 功能, 优化, 改进...
- COMPLAINT: 投诉, 不满, 差评, 退款, 赔偿, 欺诈...
- INQUIRY: 请问, 咨询, 怎么, 如何, 价格, 多久...

### 2. 推荐引擎 (负载均衡 + 技能匹配)

评分公式：`score = skillMatch * 0.4 + availability * 0.35 + performance * 0.25`

### 3. 评测引擎 (SLA + 时效 + 满意度)

综合评分：`overall = slaCompliance * 40% + responseSpeed * 30% + resolutionQuality * 30%`

## 📊 数据模型 (Prisma)

- Ticket: 工单表（标题、描述、分类、优先级、状态、处理人、SLA、满意度）
- Agent: 处理人表（姓名、技能、容量、负载、绩效）
- ActivityLog: 操作日志

## 🛠️ Vibe Coding 工作流建议

1. **先让 AI 生成数据库模型和类型定义** —— 这是地基
2. **再让 AI 生成核心引擎** —— 这是业务逻辑
3. **然后让 AI 生成页面骨架** —— 这是结构
4. **最后让 AI 填充细节和样式** —— 这是体验
5. **每完成一个模块就 git commit** —— 可回退

---

> 💡 **Vibe Coding 心法**: 不要一次性让 AI 做太多。一个模块一个模块来，每步都验证。
