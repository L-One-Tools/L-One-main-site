# 当前任务交接

## 项目信息

- 仓库：`https://github.com/L-One-Tools/L-One-main-site`
- 生产分支：`main`
- 功能分支：`work/A-20260805-01-store-first`
- 当前设备：A（公司台式机）
- 当前 AI 工具：Codex
- 最后更新时间：2026-08-05（Asia/Shanghai）

## 当前基线

- 任务开始 commit：`d163c3f7852bf02d445a74e82392f5c5d9299558`
- 远程 main commit：`d163c3f7852bf02d445a74e82392f5c5d9299558`
- Store 发布 PR：`https://github.com/L-One-Tools/L-One-main-site/pull/2`，已合并。
- 正式站：Store、页面资源、Catalog 与稳定回退快照均为 HTTP 200。
- 本任务 commit：`ad35bf5b64d21caccf41e992df8027b827345942`。
- Draft PR：`https://github.com/L-One-Tools/L-One-main-site/pull/3`。

## 当前任务

- 任务编号：`A-20260805-01`
- 目标：删除全站一级 `Recent / 最近` 板块，并把 `Store / 工具` 调整为
  所有一级导航的第一项。
- 编辑范围：见 `docs/EDIT_SCOPE_MAP.md` 的本轮声明。

## 已完成

- 从 `index.html` 删除 Recent 专属样式和 `page-recent` 页面结构。
- 从主站有效路由与首页搜索索引删除 `recent`。
- 从主站顶部导航与 M3 首页中心导航删除 Recent，并将 Store 调整到第一项。
- 从 Store、Materials 与 Motion Library 导航删除 Recent，并将 Store 调整到第一项。
- M3 首页中心导航由六列调整为五列。
- 增加静态审计规则，禁止 Recent 页面、路由或入口回流，并检查四类导航的 Store 顺序。
- 旧 `#recent` 已验证按现有未知路由逻辑显示 `page-home`。

## 测试结果

- `node scripts/site-audit.js`：通过，14 个作品。
- `node scripts/audit-motion-library.js`：通过，64 个动效。
- `node scripts/validate-store-catalog.mjs`：通过，1 个工具。
- 代码扫描：目标页面中无 `#recent`、`page-recent`、`data-route="recent"`、
  Recent 搜索项或专属样式残留。
- 本地 Chrome 1440×1000 与 390×844：主页、Store、Materials、Motion Library
  导航顺序均为 Store、Works、Notes、Materials、About；无 Recent、无横向溢出、
  无页面脚本或资源错误。
- 旧 `index.html#recent`：安全显示首页，不存在空白 Recent 页面。

## 尚未完成

- PR #3 的 `f72f3f3` GitHub Actions 已通过；最终交接文档提交仍需复核最新检查。
- EdgeOne 功能分支预览与用户验收。
- 用户确认后合并 `main` 并执行生产站验证。

## 保护范围

- 未修改作品正文、作品数据或媒体素材。
- 未修改 Store 页面布局、Catalog、下载状态或版本同步逻辑。
- 未修改 Materials 数据、Motion Library 动效、后端、数据库、服务器、EdgeOne、DNS、
  正式域名、云端 Secret 或生产环境变量。

## 回滚

- 代码回滚使用 `git revert` 撤销本任务提交，不重写历史。
- 正式发布异常时保留 EdgeOne 上一成功部署 `d163c3f` 作为恢复依据。
