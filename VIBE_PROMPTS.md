# 🚀 Vibe Coding 提示词模板

## 第一轮：初始化项目

```
请帮我创建一个 Next.js 16 全栈项目，项目名为 ticket-intelligence。

要求：
1. 使用 TypeScript + Tailwind CSS + App Router
2. 初始化 shadcn/ui（使用 slate 基础色）
3. 安装依赖：prisma, @prisma/client, zustand, @tanstack/react-query, recharts, lucide-react
4. 配置路径别名 @/* 指向项目根目录
5. 创建 .env.local 文件，配置 SQLite 数据库路径

请一步步执行，每步完成后告诉我结果。
```

## 第二轮：数据库模型

```
请根据以下 Prisma schema 创建数据库模型：

model Ticket {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
  priority    String
  status      String
  assigneeId  String?
  assignee    Agent?   @relation(fields: [assigneeId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  resolvedAt  DateTime?
  slaDeadline DateTime
  satisfaction Int?
}

model Agent {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  avatar    String?
  skills    String
  capacity  Int      @default(10)
  currentLoad Int    @default(0)
  performance Int    @default(80)
  tickets   Ticket[]
  createdAt DateTime @default(now())
}

要求：
1. 生成 schema.prisma
2. 运行 migrate
3. 生成 seed.ts 种子数据（8条工单，4个处理人）
4. 运行种子脚本
```

## 第三轮：核心引擎

```
请创建三个核心引擎文件，放在 lib/ 目录下：

1. lib/classifier.ts - 工单分类引擎
   - 基于关键词权重匹配
   - 支持 TECH_SUPPORT, PRODUCT_FEEDBACK, COMPLAINT, INQUIRY
   - 返回分类结果 + 置信度 + 匹配关键词

2. lib/recommender.ts - 智能推荐引擎
   - 基于技能匹配度(40%) + 负载空闲度(35%) + 历史绩效(25%)
   - 返回推荐列表，包含分数和推荐理由

3. lib/evaluator.ts - 质量评测引擎
   - SLA 合规检测
   - 响应速度评分
   - 解决质量评分
   - 生成团队绩效报告

所有函数都要有完整 TypeScript 类型定义和注释。
```

## 第四轮：页面开发

```
请创建以下页面：

1. app/page.tsx - 首页
   - 4个统计卡片（待处理、处理人、解决率、即将超时）
   - 3个快捷入口卡片（工单管理、智能分类、数据看板）
   - 使用 lucide-react 图标

2. app/dashboard/page.tsx - 数据看板
   - 分类分布饼图（Recharts）
   - 处理人负载柱状图
   - 工单趋势折线图
   - 使用模拟数据

3. app/classify/page.tsx - 智能分类演示
   - 输入标题和描述
   - 实时显示分类结果、置信度、匹配关键词
   - 使用进度条显示置信度

4. app/recommend/page.tsx - 智能推荐演示
   - 输入工单信息（标题、分类、优先级）
   - 显示处理人推荐列表，按匹配度排序
   - 显示推荐理由和预估处理时间

要求：使用 shadcn/ui 组件，响应式布局，slate/indigo 配色。
```

## 第五轮：优化与部署

```
请帮我完成以下优化：

1. 添加全局布局 layout.tsx，包含导航栏
2. 添加 loading.tsx 和 error.tsx 边界处理
3. 优化移动端体验
4. 配置 next.config.js 用于静态导出或 Vercel 部署
5. 写一份部署到 Vercel 的步骤说明

请确保所有页面都能正常导航和交互。
```

---

## 💡 Vibe Coding 技巧

- 每轮只做一个模块，不要贪多
- 如果 AI 生成错误，把错误信息直接贴回去让它修复
- 善用 "请重构这段代码，使其更简洁" 来优化
- 遇到复杂逻辑，先让 AI 写伪代码，确认后再实现
- 定期 git commit，保留可回退点
