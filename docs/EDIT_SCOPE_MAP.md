# L-One 主站编辑范围地图

本地图依据仓库在 `8e88ca41ad5c7b584a742e8c6dc26bc3420d721c`
的真实结构编制。具体任务仍须进一步缩小到明确文件和代码区域。

| 区域 | 真实路径 | 内容 | 默认保护级别 |
| --- | --- | --- | --- |
| 主站页面 | `index.html` | 首页、Works、Notes、About、路由及内嵌样式/脚本 | 谨慎编辑 |
| 动效图书馆 | `motion-library.html`、`motion-library.css`、`motion-library.js`、`motion-library-data.json` | 独立页面、样式、交互和数据 | 谨慎编辑 |
| 素材库前端 | `materials/` | 素材页面、样式、脚本、公开地址配置和清单 | 谨慎编辑；`config.json` 受保护 |
| 作品数据 | `assets/works/index.json`、`assets/works/*/metadata.json` | 作品索引与结构化正文 | 谨慎编辑 |
| 媒体资产 | `assets/`、`assets/works/*/*.{jpg,webp,png}` | 背景、封面和作品图片 | 禁止自动批量修改 |
| 静态构建/审计 | `scripts/` | Motion Library 生成、迁移和全站审计 | 谨慎编辑 |
| 后端业务 | `server/materials-service/app/` | FastAPI、认证、内容、数据库、任务队列和管理页 | 受保护 |
| 数据与迁移 | `server/materials-service/app/database.py`、`migrations.py`、内容仓库代码及生产数据 | SQLite 模型、迁移和发布数据 | 受保护；生产数据禁止自动修改 |
| 部署 | `server/materials-service/nginx/`、`systemd/`、服务器实际配置、EdgeOne、DNS | Nginx、systemd、HTTPS 和部署 | 受保护 |
| 测试 | `server/materials-service/tests/`、`scripts/*audit*` | 后端与静态站审计 | 普通编辑，但须与任务绑定 |
| 文档 | `README.md`、`SITE_STATUS.md`、`TASK_GUARDRAILS.md`、`docs/` | 状态、设计、计划和协作记录 | 普通或谨慎编辑 |
| Git 与秘密 | `.git/`、凭据、Token、私钥、生产环境变量 | 历史与访问权限 | 禁止自动修改/入库 |

保护等级定义：

- **普通编辑**：用户明确提出任务后可以编辑。
- **谨慎编辑**：编辑前必须评估依赖、渲染或运行影响。
- **受保护**：必须取得用户对目标和范围的明确授权。
- **禁止自动修改**：AI 不得自行变更。

## 每轮任务声明

```text
任务编号：
执行设备：
任务目标：
允许修改的文件：
允许修改的代码区域：
只读参考文件：
明确禁止修改的文件：
预计影响范围：
测试方式：
回滚方式：
```

未列入“允许修改”的文件默认只读。发现必须扩围时，先停止、列出新增文件和原因，
等待用户确认后再更新任务范围。
## 本轮范围：B-20260728-00

- 执行设备：B
- 目标：建立多设备协作制度并验证最小 Git/部署闭环。
- 允许新增：`AGENTS.md`、`docs/MULTI_DEVICE_WORKFLOW.md`、
  `docs/EDIT_SCOPE_MAP.md`、`docs/CURRENT_HANDOFF.md`、
  `docs/VERSIONING_RULES.md`。
- 只读参考：仓库内其余全部文件和公开网站。
- 禁止修改：所有网站 HTML、CSS、JavaScript、Python、API、数据库、素材、
  依赖、锁定文件、部署和域名配置。
- 可见影响：网站页面、文案、样式和功能应完全不变；只新增协作文档。
- 测试：仓库审计、网站文件哈希不变、静态站审计、后端测试和正式域名抽查。
- 回滚：对本轮单一文档 commit 执行 `git revert`。

## 本轮范围：B-20260730-01

- 执行设备：B
- 任务目标：为 L-One Asia 建立 Store 页面、Story Flow 产品资料、稳定 Catalog、
  版本同步与失败回退链路；正式生产部署前暂停确认。
- 功能分支：`feat/store-and-catalog`
- 关联任务：`L-One-Tools/L-One-main-site#1`
- 允许修改：`index.html`、`materials/index.html`、`motion-library.html`、
  `store/`、`public/data/store/`、`.github/workflows/` 中本任务新增工作流、
  `scripts/` 中本任务新增或直接相关的 Store 审计脚本、`robots.txt`、
  `sitemap.xml`、`docs/store/`、`SITE_STATUS.md`、`docs/CURRENT_HANDOFF.md`、
  本文件中的本轮范围声明。
- 允许修改的代码区域：全站公开导航中的 Store 入口、首页搜索中的 Store 入口、
  Store 独立页面及其数据读取逻辑、Store Catalog 生成/校验/同步逻辑、
  Store 专项回归检查和对应 SEO 文件。
- 只读参考：现有页面视觉 Token、Works/Notes/Materials 内容与交互、
  `server/materials-service/`、`L-One-Tools/story-flow`、GitHub/EdgeOne 当前状态。
- 明确禁止修改：现有作品正文和素材、Motion Library 动效内容、Materials 数据、
  后端业务与数据库、生产服务器、EdgeOne/DNS/正式域名、云端 Secret、
  Story Flow 源码和发布物。
- 预计影响范围：新增 `/store/`；在现有桌面与窄屏横向导航中加入 Store；
  新增公开静态 Catalog。现有路由、页面、API、正式域名和下载分发保持不变。
- 测试方式：现有静态站与 Motion Library 审计、后端 37 项回归、Store Schema
  与生成测试、失败保留旧 Catalog 测试、本地桌面/平板/手机浏览器检查、
  EdgeOne 预览及两轮非 Stable 数据更新验证。
- 回滚方式：使用 `git revert` 撤销本任务提交；Catalog 同步失败时保留上一份
  已验证快照；EdgeOne 仅在获得权限后使用上一成功部署回退。
