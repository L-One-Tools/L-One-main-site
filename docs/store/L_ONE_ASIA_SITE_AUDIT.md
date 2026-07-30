# L-One Asia 网站架构审计

审计日期：2026-07-30（Asia/Shanghai）  
任务编号：`B-20260730-01`  
审计基线：`c0918e7b0f4e780c8855acdd6718c5c5b5ff368e`

## 仓库状态

- 主仓库：`L-One-Tools/L-One-main-site`
- 默认分支与生产分支：`main`
- 本地接管路径：`E:\L-One-main-site`
- 审计开始时工作区干净，无 merge、rebase 或 cherry-pick。
- `origin` 为 `https://github.com/L-One-Tools/L-One-main-site.git`。
- fetch 后本地与 `origin/main` 领先 0、落后 0。
- GitHub 应用返回当前账号对主仓库拥有 pull、triage、push、maintain、admin 权限。
- 本机 Git 可用，版本为 2.54.0；GitHub CLI 未安装。Git Credential Manager
  当前账号为 `macabyavaha7-sys`。

## 当前技术架构

- 公开主站是无框架、无依赖安装、无构建步骤的静态 HTML/CSS/JavaScript。
- 主入口为根目录 `index.html`，主站大部分样式和脚本内联在该文件。
- 主站内部页面采用 hash 路由，例如 `#recent`、`#works`、`#skills`、
  `#about` 和 `#work-*`。
- `materials/` 是稳定目录路由的独立静态页面，使用独立 CSS/JavaScript，
  因此 `/store/` 可沿用相同模式，不需要改造现有 hash 路由器。
- `motion-library.html` 是独立静态页面。
- 仓库同时保存一个 FastAPI/SQLite 素材与内容管理服务
  `server/materials-service/`；它部署在轻量服务器，不属于 EdgeOne Pages
  静态运行时。
- 主仓库没有 `package.json`、静态站构建配置、EdgeOne Functions、
  `.github/workflows`、Webhook 配置或前端环境变量文件。

## 目录与入口

| 区域 | 路径 | 说明 |
| --- | --- | --- |
| 主站与 hash 路由 | `index.html` | Header、首页、Works、Notes、About、详情页、内联样式与脚本 |
| 独立素材库 | `materials/` | 静态页面、样式、脚本、远程 manifest 配置 |
| 动效图书馆 | `motion-library.*` | 独立页面、样式、交互和生成数据 |
| 作品数据 | `assets/works/` | 作品索引、metadata、封面和图片 |
| 静态审计 | `scripts/` | 主站和 Motion Library 自动审计 |
| 管理后端 | `server/materials-service/` | FastAPI、SQLite、管理页、Nginx/systemd 示例与测试 |

## 设计语言

主站的基础 Token 位于 `index.html` 的 `:root`：

- 背景 `#fff`，主文字 `#111`，次文字为黑色透明度层级。
- 线条 `rgba(0,0,0,.12)`，弱线条 `rgba(0,0,0,.08)`。
- 内容基准宽度 `884px`，水平留白使用 `clamp(72px, 10vw, 146px)`。
- 基础圆角 `8px`，基础阴影 `0 8px 24px rgba(0,0,0,.05)`。
- 字体为系统字体栈：SF Pro、PingFang SC、Microsoft YaHei 等。
- Header 使用三列网格；导航为克制的双语文字，active 状态为 2px 黑色短线。
- 常见卡片为白底、1px 弱边框、6–8px 圆角和低强度阴影。
- 主要响应断点为 980px 与 640px；窄屏导航通过横向滚动保留所有入口，
  当前没有抽屉式移动菜单。
- 焦点主要依靠原生控件和边框变化；Store 需要补充清晰的 `:focus-visible`。

## 可复用结构

- 主站 `.site-header`、`.container`、`.nav-link`、`.ghost-btn`、卡片边框和排版节奏。
- Materials 独立目录页面模式及相对路径导航。
- Materials 的运行时 `fetch`、加载/错误/空状态组织方式可作为数据页面参考。
- `scripts/site-audit.js` 可扩展为导航、SEO、Store 文件和 Catalog 的回归入口。
- 现有静态部署无需引入新框架即可支持独立 Store 页面。

## API、后台与远程数据

- 公开主站自身没有 EdgeOne Function。
- 素材管理服务公开健康端点为 `https://admin.l-one.asia/api/health`，审计时返回 200。
- 公共内容 API `https://admin.l-one.asia/api/public/v1/content` 审计时返回 200，
  内容为空，缓存为 `max-age=60, stale-while-revalidate=300`。
- Materials 从 `https://static.l-one.asia/materials/data/assets.json` 读取数据，
  该端点审计时返回 200 与 `Cache-Control: no-store`。
- Store 不应复用 Materials 数据库或公开 Project 看板作为产品版本源。

## SEO 与路由现状

- 根页只有 `lang`、viewport 和 title，缺少 description、canonical、Open Graph
  与结构化数据。
- 仓库没有 `robots.txt`、`sitemap.xml` 或自定义 404 页面；线上对应路径为 404。
- `/store/` 在线上尚不存在，审计时返回 404。
- Store 应作为独立 `/store/` 路由提供完整元信息，并补充 robots/sitemap，
  不修改现有 hash 详情路由。

## 基线验证

- `node scripts/site-audit.js`：通过，14 个作品。
- `node scripts/audit-motion-library.js`：通过，64 个独立动效。
- `python -m unittest discover -s tests -v`：通过，37 项后端测试。
- `https://l-one.asia/`：200，EdgeOne Pages。
- 线上 `index.html` 与当前仓库文件仅换行格式不同；统一为 LF 后字节与
  SHA-256 完全一致，证明正式站对应当前 `main` 内容。
- `https://l-one.asia/materials/`：200。
- `https://l-one.asia/store/`：404。

## Store 推荐接入点

1. 新建 `store/index.html`、`store/store.css`、`store/store.js`，沿用
   Materials 的独立目录路由模式和主站 Token。
2. 新建 `store/catalog.source.json` 保存人工资料。
3. 新建 `store/catalog.schema.json` 固定公开数据契约。
4. 生成 `public/data/store/catalog.json`，页面只读取该公开快照。
5. 在 `index.html`、`materials/index.html`、`motion-library.html`
   和 Store 自身 Header 中加入双语 Store 入口；首页搜索加入 Store。
6. 用无第三方运行时依赖的 Node 脚本完成生成、校验、版本比较和安全写入。
7. 新增 GitHub Actions 手动、定时与 repository dispatch 入口；私有仓库读取
   只在 Actions 中使用受保护 Secret。

## 风险与禁止破坏的链路

- `main` 推送会触发正式 EdgeOne 自动部署，功能分支不得直接影响生产。
- `index.html` 集中承载大量路由和页面，导航改动必须保持现有 route 数组与筛选逻辑。
- 现有窄屏导航是横向滚动，不应在本任务中重构为新菜单系统。
- `materials/config.json`、素材公开域名、管理后端、数据库与服务器部署均为受保护区域。
- 不得把 Story Flow 私有 GitHub 地址、Token 或安装包放入公开 Catalog。
- 不得在没有真实公共文件时启用下载按钮。
- 不得为 Store 大规模重构主站、升级无关依赖或改写现有作品数据。
