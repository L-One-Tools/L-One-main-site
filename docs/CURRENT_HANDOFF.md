# 当前任务交接

## 项目信息

- 仓库：`https://github.com/L-One-Tools/L-One-main-site`
- 生产分支：`main`
- 功能分支：`feat/store-and-catalog`
- 当前设备：B
- 当前 AI 工具：Codex
- 最后更新时间：2026-07-30（Asia/Shanghai）

## 当前基线

- 开始 commit：`c0918e7b0f4e780c8855acdd6718c5c5b5ff368e`
- 远程 main commit：`c0918e7b0f4e780c8855acdd6718c5c5b5ff368e`
- 主任务：`L-One-Tools/L-One-main-site#1`
- Control Center：Project #1，Status `执行中`，Release Status `构建中`

## 当前任务

- 任务编号：`B-20260730-01`
- 目标：为 L-One Asia 建立 Store 页面、Story Flow Catalog、版本同步、
  下载安全门槛和失败回退链路。
- 编辑范围：见 `docs/EDIT_SCOPE_MAP.md` 的本轮声明。

## 已完成

- 审计并记录主仓库、网站结构、EdgeOne 和 Story Flow 发布能力。
- 确认正式站根页与当前 `main` 内容一致。
- 创建 `/store/`、全站导航入口、SEO、robots 和 sitemap。
- 建立人工 source、机器 release snapshot、Schema、生成 Catalog 和稳定快照。
- 建立私有 Release 同步器、每小时/手动/事件触发工作流和自动 PR 流程。
- 建立运维、数据架构和回退文档。
- 将 Issue #1 加入 Control Center 并设置任务字段。

## 当前 Story Flow 状态

- 私有仓库，版本 `0.5.8`。
- 无 tag、GitHub Release、Release Asset 或公共安装包。
- Store 通道为 `internal`，下载按钮禁用。
- 本地使用已授权 GitHub 凭据执行真实 Release 查询，确认无 Release 且 Catalog 未变。

## 测试结果

- Store Catalog 生成与 Schema/跨字段校验：通过。
- 两轮 0.5.8 → 0.5.9 test 数据更新：通过；回退快照保留 0.5.8。
- 重复 ID/版本、日期、下载域名、SHA-256 与失败保留旧数据：通过。
- `node scripts/site-audit.js`：通过，14 个作品。
- `node scripts/audit-motion-library.js`：通过，64 个动效。
- 后端 unittest：通过，37 项。
- GitHub Actions YAML：解析通过。
- Chromium 桌面与 390px 手机：布局、导航、Catalog、禁用下载、空/错误/回退状态通过，
  无控制台错误。

## 尚未完成

- 分阶段 commit、push 和 Draft PR。
- GitHub Actions 云端 CI 与 Store 同步运行。
- EdgeOne 功能分支预览部署。
- 用户预览验收、合并 `main` 和生产部署。
- `STORE_SYNC_GITHUB_TOKEN` 与任何公共下载存储配置。

## 安全与回退

- 未修改 EdgeOne、DNS、正式域名、生产环境变量、数据库或服务器。
- 未上传安装包，未向公开 Catalog 写入私有 GitHub URL 或 Token。
- 代码回退使用 `git revert`；Catalog 失败保留上一有效快照。
- `main` 合并会触发正式部署，必须在确认闸门二获得用户明确确认。
