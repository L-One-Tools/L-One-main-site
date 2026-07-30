# Story Flow 发布能力审计

审计日期：2026-07-30（Asia/Shanghai）

任务编号：`B-20260730-01`

审计仓库：`L-One-Tools/story-flow`

## 仓库与版本

- 仓库可见性：私有。
- 默认分支：`main`。
- 审计 commit：`27350db44f5fe4bd07526e3ba7e90087941fef1d`。
- 当前版本：`0.5.8`，在 `README.md`、`package.json`、
  `src-tauri/tauri.conf.json` 和 `src-tauri/Cargo.toml` 中一致。
- 技术栈：React 19、TypeScript 6、Vite 8、Tauri 2、Rust。
- 产品定位：Windows 本地视觉故事、分页内容与界面流程编辑工具。
- 支持平台：Windows 10/11 x64；macOS 与 Linux 尚未完成构建和稳定性验证。

## 发布物现状

| 检查项 | 结果 |
| --- | --- |
| Git tag | 无 |
| GitHub Release | 无 |
| Release Asset | 无 |
| 仓库内安装包 | 无，且 `.gitignore` 明确忽略 exe/msi/dmg 等 |
| 当前安装包 SHA-256 | 无 0.5.8 发布物，因此无可核验值 |
| 数字签名 | 未配置商业代码签名；文档提示可能触发 SmartScreen |
| Windows 构建配置 | 有，Tauri NSIS、currentUser、Windows x64 |
| macOS 正式版本 | 无，不得宣称支持 |
| 公开腾讯云下载地址 | 无 |
| 普通用户匿名下载 | 不可用 |
| 0.5.8 安装说明 | 无 |
| 0.5.8 更新说明 | 无集中 Release Notes |

## 已有发布规范

`docs/RELEASE-INSTALLATION-POLICY.md` 要求每个正式版本交付：

1. 唯一 Windows x64 安装/升级包
   `L1 Story Flow_x.y.z_x64-setup.exe`。
2. `INSTALL-UPDATE-x.y.z.md`。
3. SHA-256 校验文件。
4. 版本变更说明。

README 明确要求安装包通过 GitHub Releases 或正式发布基础设施分发，不进入源码仓库。
源码包含 Windows NSIS 配置、产品图标、Logo、设计截图和大量专项测试脚本，可供后续
产品展示与发布验证使用。

## Store 可使用的真实资料

- 名称：`L1 Story Flow` / `Story Flow`。
- 当前内部版本：`0.5.8`。
- 状态：`internal` / 内测中。
- 平台：Windows 10/11 x64。
- 简介：本地视觉故事、分页内容与界面流程编辑工具。
- 核心能力：可视化画布、属性编辑、分页预览、本地文件工作流、明亮/暗夜主题、
  导入导出、模板与恢复历史。
- 数据原则：本地优先、持续自动保存、原子写入、异常退出恢复。
- 仓库中的 `public/story-flow-icon.png`、`src-tauri/icons/` 与
  `docs/design/` 可作为后续经确认的展示素材来源；首轮可以使用无图片安全回退。

## Store 必须显示的安全状态

- 发布通道：`internal`。
- 版本：`0.5.8`，但不得表述为已公开 Stable Release。
- 下载状态：`download_available: false`。
- 下载按钮：禁用。
- 用户提示：`内测中` 与 `暂无公开下载`。
- 文件大小、发布时间、公开 URL、安装包 SHA-256：留空或显示“待补充”，不得使用
  历史 0.5.2/0.3.x 安装包数据代替 0.5.8。

## 私有仓库边界

浏览器不得直接请求该私有仓库，公开 Catalog 不得包含私有 API、Release Asset URL
或 GitHub Token。版本同步只能在 GitHub Actions 或其他受信任服务端环境中使用
GitHub App 或细粒度 Token 读取元数据，再输出不含凭据的静态 Catalog。

## 建立公开下载前仍需完成

1. 创建真实 0.5.8 或后续版本的 Release/tag。
2. 生成唯一 Windows x64 NSIS 安装包。
3. 完成安装、覆盖升级、Win10/Win11 与关键编辑流程验证。
4. 生成并核验 SHA-256 与安装说明。
5. 明确代码签名或内测 SmartScreen 提示。
6. 经用户确认后将安装包镜像到腾讯云公共 HTTPS 分发位置，或确认公开 Release。
7. 验证匿名访问、国内可达性、文件名、大小和哈希。

在以上条件满足并经用户确认前，Store 不创建或猜测下载地址。
