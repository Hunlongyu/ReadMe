# ReadMe 桌面端重构详细设计文档 (V4.0)

## 1. 总体架构与技术规范

### 1.1 技术栈

* **后端 (Core):** Rust + Tauri 2.0
* 负责：系统级 API (文件读写、Shell 命令)、网络请求代理 (解决跨域和图片加速)、密钥安全存储。


* **前端 (UI):** Vue 3 + Vite + TypeScript
* 负责：视图渲染、用户交互、状态管理 (Pinia)。


* **样式:** Tailwind CSS
* 风格：支持 Dark/Light 双主题，采用 **Glassmorphism (毛玻璃)** 设计语言。


* **数据持久化:** `tauri-plugin-store` (JSON 文件)
* 用途：存储 `settings.json` (包含 AI 配置、偏好设置) 和 `accounts.json` (包含 Token、用户信息)。**不使用 SQLite**。



### 1.2 全局交互规范

* **响应式拖拽:** 所有多列布局的模块，列与列之间均设有 `ResizeHandle`，支持鼠标拖拽调整宽度。
* **右键菜单:** 统一封装 ContextMenu 组件，在不同模块复用。
* **多账号:** 顶层支持多 Token 切换，HTTP Client 拦截器根据当前选中的账号自动注入 `Authorization` Header。

---

## 2. 核心模块详细设计

### 2.1 启动器模块 (Launcher Module)

* **功能目标:** 处理授权流程，决定是否进入主界面。
* **布局:** 单一居中窗口。
* **逻辑流程:**
1. **初始化检查:** 程序启动 -> Rust 读取 `accounts.json`。
2. **无 Token:**
* 展示欢迎 Logo 与“登录 GitHub”按钮。
* 点击 -> Rust 调用 `shell::open` 打开 GitHub OAuth 页面。
* Rust 开启本地 Web Server 或注册 `scheme` 监听回调 -> 获取 `code` -> 换取 `token` -> 写入 JSON -> 跳转主界面。


3. **有 Token:** 直接跳转主界面。



---

### 2.2 全局导航模块 (Global Navigation)

此模块常驻窗口左侧，控制右侧内容区的路由切换。

* **布局:** 垂直窄栏 (宽约 64px)。
* **组件:**
* **Top:** 品牌 Logo。
* **Middle (功能入口):**
* **Profile:** (头像) 对应 2.3 模块。
* **Star:** (图标) 对应 2.4 模块。
* **Search:** (图标) 对应 2.5 模块。
* **Trending:** (图标) 对应 2.6 模块。
* **Gist:** (图标) 对应 2.7 模块。
* **Notification:** (图标) 对应 2.8 模块。


* **Bottom:**
* **Settings:** (齿轮图标) 对应 2.9 模块。
* **账号切换:** 点击当前头像弹出下拉菜单，展示已登录账号列表及“添加账号”选项。





---

### 2.3 个人主页模块 (Profile Module)

* **入口:** 点击导航栏头像。
* **布局:** 单列流式布局 (类似 GitHub Profile 页)。
* **功能细节:**
* **用户信息:** 展示头像、昵称、Bio、Follower/Following/Star 统计。
* **贡献图:** 调用 GitHub API 渲染 SVG 贡献墙。
* **自述文件:** 自动检索是否存在 `username/username` 仓库。
* 若存在，自动拉取该仓库的 README 内容并渲染在下方（逻辑复用 Star 模块的渲染器）。





---

### 2.4 Star 收藏夹模块 (Core Module)

这是核心功能区，采用 **三列布局**。

#### **Column 1: 分类侧边栏 (Categories)**

* **数据源:** 遍历用户所有 Star 的仓库，提取 `language` 字段。
* **显示:** 语言列表（如 Rust, Vue, Python...）及该语言下的仓库数量。
* **交互:** 点击语言，Column 2 列表进行过滤。

#### **Column 2: 仓库列表 (Repositories List)**

* **顶部:**
* **搜索框:** 支持**模糊搜索**。数据源为当前已加载的仓库列表（前端过滤），实现“即输即搜”。


* **列表项:**
* 展示：仓库名 (Owner/Repo)、Star 数、简短 Description、更新时间。
* 状态：高亮当前选中项。



#### **Column 3: 详情与阅读 (Details & Reader)**

* **顶部工具栏 (Toolbar):** (包含以下按钮)
1. **刷新:** 重新调用 API 获取最新 README Raw 数据。
2. **浏览器打开:** 打开 GitHub 网页链接。
3. **趋势图:** 弹窗展示 Star History 曲线 (调用第三方 API)。
4. **Star/Unstar:** 实心/空心星星切换，调用 GitHub API 同步状态。
5. **编辑 (Edit):** 下拉菜单，选项包括：
* *VS Code:* 唤醒本地 VS Code 打开 (需本地有库)。
* *Visual Studio:* 唤醒 Visual Studio。
* *GitHub Dev:* 浏览器打开 `github.dev`。
* *GitHub 1s:* 浏览器打开 `github1s.com`。


6. **克隆 (Clone):** 弹窗显示 HTTPS/SSH/GitHub CLI 复制框。
7. **导出 (Export):** 调用 Rust 后端功能。
* *Export Markdown:* 保存 `.md` 文件。
* *Export HTML:* 保存渲染后的 `.html`。
* *Export Image:* 将当前渲染区转换为 `.png/.jpg` 保存。


8. **AI 助手:** (详见下文 AI 逻辑)。


* **内容渲染区 (Viewer):**
* **Markdown 解析:** 使用 `markdown-it` 或类似库。
* **图片增强 (Rust 处理):**
* *相对路径:* 正则检测 `![](/docs/img.png)` -> 转换为 `https://raw.githubusercontent.com/.../docs/img.png`。
* *加速:* 若开启加速设置，替换域名为加速镜像源。
* *懒加载:* 视图滚动时加载图片。


* **AI 功能集成:**
* **一键总结:** 工具栏点击“AI 总结”，内容区顶部插入一个可折叠的卡片，流式显示 AI 对该库的分析。
* **一键翻译:** 工具栏点击“翻译”，内容区文本被替换为目标语言（由设置指定），但保留 Markdown 格式。
* **DeepWiki:** 侧边栏或底部提供入口，AI 生成库的使用指南。




* **右键菜单 (Context Menu):**
* 在内容区任意位置右键，弹出菜单，包含：刷新、复制、**翻译**、**总结**、导出、浏览器打开。



---

### 2.5 搜索模块 (Search Module)

采用 **两列布局**。

#### **Column 1: 搜索类型 (Filters)**

* **选项:** Repositories, Users, Code, Issues, Discussions.
* **交互:** 切换选项重置 Column 2 的搜索状态。

#### **Column 2: 搜索执行与结果 (Executor)**

* **顶部:**
* **组合搜索栏:** 包含排序下拉菜单 (Best match, Most stars) + 关键词输入框 + “Search”按钮。


* **内容:**
* 分页展示搜索结果列表。
* 点击仓库项，跳转至 **Star 模块** 的详情页逻辑进行预览（或弹出模态框预览）。



---

### 2.6 趋势榜模块 (Trending Module)

采用 **单列布局 (带顶部过滤器)**。

* **顶部过滤器:**
* **Language:** 下拉选择语言。
* **Spoken Language:** 开发者语言。
* **Date Range:** Today / This Week / This Month.


* **内容区:**
* 展示 GitHub Trending 列表。
* 每个卡片包含：排名、仓库名、描述、**今日/本周新增 Star 数**。



---

### 2.7 Gist 代码片段模块 (Gist Module)

采用 **两列布局**。

#### **Column 1: Gist 列表**

* 展示用户创建的所有 Gist。
* 显示文件名、创建时间、私有/公开状态。

#### **Column 2: 代码预览**

* **编辑器:** 使用 Monaco Editor (VS Code 核心) 的只读模式。
* **功能:** 语法高亮、复制内容、在浏览器打开。

---

### 2.8 消息通知模块 (Notifications Module)

采用 **单列布局**。

* **功能:**
* **列表:** 展示 Unread 消息 (Mention, Review Request, etc.)。
* **操作:** 每一行右侧有“✔”按钮（标记已读）。
* **顶部:** “全部已读”按钮。



---

### 2.9 设置模块 (Settings Module)

采用 **单列表单布局**。

#### **A. 常规设置**

* **外观:** 主题切换 (Light / Dark / System)。
* **语言:** 软件界面语言 (English / 中文)。

#### **B. AI 模型配置 (新增核心)**

* **API Provider:** 预设 (OpenAI / DeepSeek) 或 Custom。
* **API Endpoint:** 输入框 (如 `https://api.openai.com/v1`)，支持自定义转发地址。
* **API Key:** 密码输入框 (加密存储)。
* **Model Name:** 输入框 (如 `gpt-4-turbo`, `deepseek-chat`)。
* **翻译目标语言:** 下拉菜单 (选择 Readme 一键翻译的目标语言，如：简体中文)。

#### **C. 网络与存储**

* **图片加速:** 开关 (开启后使用 jsDelivr 等 CDN 代理 GitHub 图片)。
* **缓存管理:** 按钮“清除所有图片缓存/JSON 数据”。

---

## 3. 后端 (Rust) 核心逻辑详述

### 3.1 路径修正与图片代理

当前端请求渲染 Markdown 时，Rust 不仅仅是透传字符串，而是提供一个 `command`:

```rust
#[tauri::command]
fn fix_readme_content(content: String, repo_info: RepoInfo, use_proxy: bool) -> String {
    // 1. 正则匹配 ![]() 和 <img src="">
    // 2. 识别相对路径 (不含 http)
    // 3. 拼接: `https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}` 
    // 4. 若 use_proxy 为 true, 替换域名为 cdn.jsdelivr.net/gh/...
    // 5. 返回处理后的字符串
}

```

### 3.2 文件导出

利用 Rust 的文件系统能力：

* **Export MD:** `fs::write` 直接写入。
* **Export Image:** 接收前端传来的 Base64 (由 html2canvas 生成) 或利用 `headless_chrome` (Rust crate) 在后台渲染并截图，保证高清晰度。

### 3.3 AI 接口转发

为了避免前端直接暴露 Key 或处理复杂的流式响应，建议由 Rust 转发 AI 请求：

* 前端发起 `invoke('ask_ai', { prompt, context })`。
* Rust 使用 `reqwest` 调用用户配置的 AI Endpoint。
* Rust 将结果通过 `Event` 流式回传给前端，实现打字机效果。

---

## 4. 总结与开发优先级

**推荐开发顺序：**

1. **Skeleton:** 搭建 Tauri + Vue 框架，实现侧边导航与路由。
2. **Settings:** 实现 Token 录入与存储 (基础)。
3. **Star Module (Read):** 获取列表 -> 显示 -> 渲染 README (最核心路径)。
4. **UI Polish:** 接入 Tailwind 毛玻璃与 Dark Mode。
5. **AI Integration:** 对接 API 实现总结与翻译。
6. **Others:** 补全 Search, Trending 等次要模块。
