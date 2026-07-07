# 🖱️ Cursor 零基础操作指南 —— 手把手带你跑通智能工单系统

> 本文档面向完全零基础的用户。每一步都有截图说明和命令，跟着做就行。

---

## 第一步：安装必要软件（10分钟）

### 1.1 安装 Cursor（AI 编程编辑器）

Cursor 是一个自带 AI 能力的代码编辑器，可以理解为「会写代码的 VS Code」。

1. 打开浏览器，访问：https://www.cursor.com
2. 点击「Download for Free」下载安装包
3. 双击安装包，按提示完成安装
4. 打开 Cursor，注册/登录账号（可用 Google/GitHub 账号直接登录）

**Cursor 界面说明：**
```
┌─────────────────────────────────────────────────┐
│  📁 文件树        │  代码编辑区                  │
│  (左侧边栏)       │  (中间主区域)                │
│                   │                              │
│  ▼ ticket-intel   │  function classify() {       │
│    ├ app/         │    ...                       │
│    ├ lib/         │  }                           │
│    └ ...          │                              │
│                   │                              │
├───────────────────┴──────────────────────────────┤
│  💬 AI 聊天面板（底部或右侧，按 Ctrl+L 打开）      │
└────────────────────────────────────────────────────┘
```

### 1.2 安装 Node.js（运行环境）

Node.js 是运行 JavaScript 项目的必要环境。

1. 访问：https://nodejs.org
2. 下载 **LTS 版本**（左边那个绿色的大按钮）
3. 双击安装，一路点击「Next」直到完成
4. 验证安装：打开终端（Windows 按 `Win+R` 输入 `cmd` 回车；Mac 打开「终端」App）

```bash
# 在终端中输入以下命令，按回车
node -v
# 如果显示类似 v20.x.x 的数字，说明安装成功

npm -v
# 如果显示类似 10.x.x 的数字，说明 npm 也安装成功
```

---

## 第二步：创建项目文件夹（5分钟）

### 2.1 在 Cursor 中打开项目

1. 打开 Cursor
2. 点击左上角 `File` → `Open Folder...`（打开文件夹）
3. 选择你的桌面（Desktop），点击「新建文件夹」，命名为 `ticket-intelligence`
4. 选中这个文件夹，点击「打开」

**你现在看到的界面：**
- 左侧文件树应该是空的（或者只有几个配置文件）
- 中间是空的编辑区
- 底部有一个终端面板（如果没有，按 `` Ctrl+` `` 打开）

### 2.2 复制项目文件

我已经为你准备好了所有代码文件。你需要把它们复制到刚才创建的文件夹中。

**操作方式：**

**Windows 用户：**
1. 下载我提供的项目文件
2. 解压后，全选所有文件（Ctrl+A）
3. 复制（Ctrl+C）
4. 打开你的 `ticket-intelligence` 文件夹
5. 粘贴（Ctrl+V）

**Mac 用户：**
1. 下载项目文件并解压
2. 全选（Cmd+A），复制（Cmd+C）
3. 打开 `ticket-intelligence` 文件夹
4. 粘贴（Cmd+V）

**复制完成后，Cursor 左侧文件树应该显示：**
```
📁 ticket-intelligence/
  ├ 📄 .env.local
  ├ 📄 README.md
  ├ 📄 package.json
  ├ 📄 tsconfig.json
  ├ 📄 next.config.js
  ├ 📄 tailwind.config.ts
  ├ 📁 app/
  │   ├ 📄 globals.css
  │   ├ 📄 layout.tsx
  │   ├ 📄 page.tsx
  │   ├ 📁 classify/
  │   ├ 📁 dashboard/
  │   ├ 📁 recommend/
  │   └ 📁 tickets/
  ├ 📁 components/
  ├ 📁 lib/
  │   ├ 📄 classifier.ts
  │   ├ 📄 recommender.ts
  │   └ 📄 evaluator.ts
  ├ 📁 prisma/
  │   ├ 📄 schema.prisma
  │   └ 📄 seed.ts
  └ 📁 types/
      └ 📄 index.ts
```

---

## 第三步：安装项目依赖（让 AI 帮你做）

### 3.1 打开 Cursor 的 AI 聊天面板

按 `Ctrl+L`（Windows）或 `Cmd+L`（Mac）打开 AI 聊天面板。

**你会看到底部弹出一个聊天窗口，里面有输入框。**

### 3.2 发送第一轮提示词

在输入框中粘贴以下内容，按回车发送：

```
我是一个零基础的小白，请帮我初始化这个 Next.js 项目。

我已经把项目文件放到了这个文件夹里。现在请帮我：
1. 安装 package.json 里列出的所有依赖（运行 npm install）
2. 初始化 shadcn/ui（运行 npx shadcn-ui@latest init）
3. 安装 shadcn/ui 的基础组件（button, card, input, badge, dialog, select, tabs, table, textarea）

请在终端中一步步执行这些命令，每执行完一步告诉我结果。
如果出错，请帮我解决。
```

**Cursor AI 会做什么：**
- 自动在终端中运行 `npm install`
- 等待安装完成后，运行 shadcn/ui 初始化命令
- 过程中可能会问你几个问题（比如选择基础色），按提示回答即可
- 全部完成后，会告诉你「安装成功」

**⚠️ 常见问题：**

**问题1：npm install 卡住不动**
- 解决：按 `Ctrl+C` 终止，然后输入 `npm install --registry=https://registry.npmmirror.com`（使用国内镜像）

**问题2：shadcn/ui 初始化时问问题**
- 回答方式：
  - `Would you like to use TypeScript?` → 输入 `y` 回车
  - `Which style would you like to use?` → 用方向键选 `Default`，回车
  - `Which base color would you like to use?` → 选 `Slate`，回车
  - `Where is your global CSS file?` → 直接回车（使用默认路径）

---

## 第四步：配置数据库（让 AI 帮你做）

### 4.1 发送第二轮提示词

```
请帮我配置数据库。

我已经有 prisma/schema.prisma 文件了。请帮我：
1. 运行数据库迁移（npx prisma migrate dev）
2. 生成 Prisma Client（npx prisma generate）
3. 运行种子脚本填充测试数据（npx tsx prisma/seed.ts）

如果 tsx 命令不存在，请先运行 npm install -D tsx。

请在终端中执行，每步告诉我结果。
```

**Cursor AI 会做什么：**
- 运行 `npx prisma migrate dev`
- 这时可能会问你迁移名称，输入 `init` 回车即可
- 生成 Prisma Client
- 运行种子脚本，创建 4 个处理人和 8 条工单

**成功标志：**
终端显示类似：
```
✅ 种子数据已创建
- 处理人: 4 个
- 工单: 8 条
```

---

## 第五步：启动项目看效果！

### 5.1 发送第三轮提示词

```
请帮我启动开发服务器，让我看看效果。

运行：npm run dev

启动后告诉我访问地址，并帮我打开浏览器预览。
```

**Cursor AI 会做什么：**
- 在终端运行 `npm run dev`
- 等待编译完成（第一次会比较慢，1-2分钟）
- 告诉你访问地址（通常是 http://localhost:3000）
- 可能会自动帮你打开浏览器

**如果 AI 没有自动打开浏览器：**
1. 打开你的浏览器（Chrome/Edge/Safari）
2. 地址栏输入：`http://localhost:3000`
3. 按回车

**🎉 你应该能看到：**
- 一个漂亮的蓝色标题「🎫 智能工单系统」
- 4 个统计卡片（待处理工单、在线处理人、今日解决率、即将超时）
- 3 个快捷入口（工单管理、智能分类、数据看板）

---

## 第六步：体验各个功能页面

### 6.1 体验智能分类

1. 在首页点击「🧠 智能分类」卡片
2. 或者浏览器地址栏输入：`http://localhost:3000/classify`
3. 输入测试内容：
   - 标题：`登录页面崩溃，无法进入系统`
   - 描述：`点击登录按钮后页面白屏，控制台显示 error`
4. 点击「开始分类」按钮
5. **你应该看到：**分类结果为「🔧 技术支持」，置信度很高，匹配关键词显示「崩溃、报错、error」等

### 6.2 体验智能推荐

1. 浏览器访问：`http://localhost:3000/recommend`
2. 输入：
   - 标题：`支付接口报错 500`
   - 分类：技术支持
   - 优先级：紧急
3. 点击「获取推荐」
4. **你应该看到：**4 个处理人按匹配度排序，王强（后端技能）应该排在前面，显示推荐理由和预估处理时间

### 6.3 查看数据看板

1. 浏览器访问：`http://localhost:3000/dashboard`
2. **你应该看到：**
   - 一个饼图（工单分类分布）
   - 一个柱状图（处理人负载对比）
   - 一个折线图（本周工单趋势）

---

## 第七步：让 AI 帮你继续开发（Vibe Coding 核心）

现在基础项目跑起来了，你可以让 Cursor AI 继续帮你添加功能。

### 7.1 打开 AI 聊天面板（Ctrl+L / Cmd+L）

### 7.2 发送需求，让 AI 写代码

**示例1：添加导航栏**
```
请在 app/layout.tsx 中添加一个顶部导航栏，包含：
- 左侧：Logo「🎫 Ticket Intelligence」
- 中间：首页、工单管理、智能分类、数据看板、智能推荐 五个导航链接
- 右侧：用户头像占位

使用 shadcn/ui 的组件，样式要简洁现代。
```

**示例2：添加工单列表页**
```
请创建 app/tickets/page.tsx，实现一个工单列表页面：
- 表格展示所有工单（标题、分类、优先级、状态、处理人、创建时间）
- 顶部有筛选栏：按分类筛选、按状态筛选、按优先级筛选
- 优先级用不同颜色 Badge 显示（紧急红色、高橙色、中蓝色、低灰色）
- 状态用不同颜色区分（进行中蓝色、已解决绿色、待处理灰色）
- 从数据库读取真实数据（使用 Prisma Client）

请同时创建必要的 API 路由来获取数据。
```

**示例3：添加新建工单功能**
```
请创建 app/tickets/new/page.tsx，实现新建工单表单：
- 标题输入框
- 描述文本域
- 优先级下拉选择（紧急/高/中/低）
- 提交按钮
- 提交后自动调用分类引擎，给出分类建议
- 保存到数据库

使用 Server Actions 处理表单提交。
```

### 7.3 AI 写完后，按 Ctrl+Enter 应用代码

Cursor AI 会生成代码修改建议，显示在右侧或直接在代码中。
- 如果你同意修改，点击「Accept」或按 `Ctrl+Enter`
- 如果不同意，点击「Reject」

---

## 第八步：保存你的代码（Git 版本控制）

### 8.1 初始化 Git 仓库

在终端中运行：

```bash
# 初始化 git
git init

# 添加所有文件
git add .

# 提交第一次版本
git commit -m "初始化项目：基础框架 + 核心引擎 + 演示页面"
```

### 8.2 每次大功能完成后提交一次

```bash
git add .
git commit -m "添加导航栏和工单列表页"
```

**这样如果改坏了，可以随时回退到之前的版本。**

---

## 第九步：部署到线上（让别人也能访问）

### 9.1 使用 Vercel 部署（免费 + 最简单）

1. 访问 https://vercel.com，用 GitHub 账号登录
2. 点击「Add New Project」
3. 选择「Import Git Repository」
4. 如果你还没上传代码到 GitHub：
   - 访问 https://github.com/new 创建新仓库
   - 在终端运行：
   ```bash
   git remote add origin https://github.com/你的用户名/ticket-intelligence.git
   git branch -M main
   git push -u origin main
   ```
5. 在 Vercel 中选择这个仓库，点击「Import」
6. 环境变量：添加 `DATABASE_URL`，值和 `.env.local` 里的一样
7. 点击「Deploy」
8. 等待 2-3 分钟，获得一个 `.vercel.app` 结尾的网址

---

## 🆘 常见问题急救手册

### Q1：npm install 报错，说权限不足
```bash
# Windows 用户：以管理员身份运行 Cursor（右键图标 → 以管理员身份运行）
# Mac 用户：在命令前加 sudo
sudo npm install
# 然后输入你的电脑密码（输入时不显示，输完回车即可）
```

### Q2：运行 npm run dev 报错，说端口被占用
```bash
# 终止当前进程，换端口运行
npx next dev -p 3001
# 然后访问 http://localhost:3001
```

### Q3：页面显示空白或报错
1. 看终端有没有红色报错信息
2. 把报错信息复制给 Cursor AI，说：「请帮我修复这个错误」
3. AI 会自动分析并修复

### Q4：AI 生成的代码我看不懂
- 选中不懂的代码，按 `Ctrl+K`（Windows）或 `Cmd+K`（Mac）
- 输入：「请解释这段代码的作用」
- AI 会用中文给你详细解释

### Q5：我想改样式但不知道怎么做
- 选中要改的元素
- 按 `Ctrl+K`，输入：「把背景改成深蓝色，文字改成白色」
- AI 会自动修改对应的 CSS/Tailwind 类名

---

## 📌 每日练习建议（1 周上手）

| 天数 | 任务 | 目标 |
|------|------|------|
| Day 1 | 跟着本文档跑通项目 | 看到首页 |
| Day 2 | 让 AI 添加导航栏 | 学会提需求 |
| Day 3 | 让 AI 添加工单列表页 | 学会数据查询 |
| Day 4 | 让 AI 添加新建工单表单 | 学会表单提交 |
| Day 5 | 让 AI 添加工单详情页 | 学会动态路由 |
| Day 6 | 让 AI 优化看板，添加真实数据 | 学会数据可视化 |
| Day 7 | 部署到 Vercel | 学会上线 |

---

## 💡 给新手的 Vibe Coding 心法

1. **不要怕问蠢问题** —— AI 不会嘲笑你，越具体的问题回答越好
2. **先描述需求，再让 AI 实现** —— 不要直接说「写代码」，要说「我要一个能...的页面」
3. **每次只做一个功能** —— 不要一次让 AI 做 10 件事，容易出错
4. **改坏了就回退** —— 按 `Ctrl+Z` 撤销，或者 `git checkout .` 回到上次提交
5. **看不懂就问** —— 选中代码，按 `Ctrl+K` 问「这是什么意思」

---

> 🎉 恭喜你！跟着做完这 9 步，你已经从一个完全的小白，变成了一个能独立开发全栈项目的开发者。继续让 AI 帮你迭代，你会发现编程其实很有趣！
