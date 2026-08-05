# 腾讯云 EdgeOne 部署审计

审计日期：2026-07-30（Asia/Shanghai）

任务编号：`B-20260730-01`

审计性质：仓库、DNS、公网验证与 Control Center 中的腾讯云控制台验收证据

## 已确认链路

| 项目 | 当前事实 |
| --- | --- |
| EdgeOne Makers 项目 | `l-one-main-site-org` |
| 项目 ID | `makers-kwumc7ajb5uq` |
| 连接仓库 | `L-One-Tools/L-One-main-site` |
| 生产分支 | `main` |
| 根目录 | 仓库根目录 |
| 安装命令 | 无 |
| 构建命令 | 无 |
| 输出目录 | `/` |
| 运行形态 | 纯静态 EdgeOne Pages |
| 入口 | `index.html` |
| 部署触发 | GitHub `main` commit 自动触发 |
| Node.js | `22.11.0` |
| 初始组织仓库部署 ID | `dpezv3tubjo7` |
| 当前基线自动部署 ID | `dp6dlos4e3n0` |
| 正式域名 | `l-one.asia` |
| 素材域名 | `static.l-one.asia`，轻量服务器 Nginx |
| 管理/API 域名 | `admin.l-one.asia`，轻量服务器 Nginx/FastAPI |

上述项目名、ID、仓库和初始部署记录来自
`docs/NEW_REPOSITORY_DEPLOYMENT_TEST.md` 与 Control Center 的迁移验收任务；
构建设置同时由 README 与当前仓库无构建文件的事实支持。

## Control Center 中的控制台证据

2026-07-29 的迁移任务记录了以下实际控制台状态：

- Framework preset：Other。
- 根目录：`./`；输出、构建、安装命令均未设置。
- 环境变量：无。
- Production：`main`，自动部署开启。
- Preview：未分配环境的 Git 分支，自动部署关闭，无独立公开域名。
- 新项目首次部署 `dpezv3tubjo7`：成功，21 秒。
- 自动部署闭环 `dp6dlos4e3n0`：commit `c0918e7`，成功，23 秒。
- 初始化、克隆、安装依赖、构建与部署步骤均完成。
- 正式域名已切换到新组织仓库项目并完成 HTTPS 验收。
- 证书为 `CN=l-one.asia`，TrustAsia DV TLS RSA CA 2025；记录有效期至
  2026-09-13。
- 项目仍处于 7–14 天观察期；旧仓库与旧 EdgeOne 项目继续保留。

## 公网验证

- `https://l-one.asia/` 返回 200，`Server: edgeone-pages`。
- 根页 `Last-Modified` 为 2026-07-29 07:12:44 GMT，与当前组织仓库部署提交时间一致。
- 线上根页统一换行为 LF 后与本地 `c0918e7` 的 `index.html` 字节完全相同。
- HTML 缓存为 `public,max-age=0,must-revalidate`，EdgeOne 当前返回缓存命中。
- `https://l-one.asia/materials/` 返回 200。
- `https://l-one.asia/store/`、`robots.txt`、`sitemap.xml` 均返回 404。
- `l-one.asia` A 记录解析至 EdgeOne 地址 `43.174.246.108` 与 `43.174.247.108`。
- `static.l-one.asia` 与 `admin.l-one.asia` 解析至 `62.234.73.162`。
- `static` 和 `admin` 的 HTTP 请求正确 301 到 HTTPS。
- **差异：`http://l-one.asia/` 当前直接返回 200，没有按 `SITE_STATUS.md`
  所述 301 到 HTTPS。** 正式发布前应在控制台确认重定向规则。

## Functions、数据与缓存

- 仓库内没有 EdgeOne Functions 配置。
- Store 第一阶段无需 Function；公开 Catalog 作为静态 JSON 部署更符合现有架构。
- 建议 HTML 继续使用 `max-age=0,must-revalidate`。
- 建议 `/data/store/catalog.json` 使用短缓存和再验证策略，例如
  `max-age=60, stale-while-revalidate=300`；实际规则需在 EdgeOne 控制台确认后设置。
- 现有 `static.l-one.asia/materials/data/assets.json` 使用 `no-store`，
  但 Store Catalog 不应直接耦合该素材 manifest。

## 仍未验证的控制台细节

- 当前签名预览 URL；证据明确不保存带 `eo_token` 的地址。
- 完整失败部署历史与日志查看入口。
- HTML/JSON 的自定义缓存规则详情。
- 当前 HTTP 到 HTTPS 重定向规则；公网实测根域 HTTP 没有跳转。
- 手动回退按钮和可选择的历史部署列表。
- Webhook 的具体配置状态。

本机未配置腾讯云 CLI 或云密钥，本任务也未读取或修改 Secret。

## 回退现状

- GitHub 代码回退可使用 `git revert` 创建可审计提交。
- EdgeOne 历史部署回退能力由平台提供，但当前控制台入口与可回退部署尚未验证。
- `main` 自动部署意味着合并即可能影响正式域名；因此所有实现必须在功能分支和
  PR 预览验证，生产合并前进入确认闸门二。

## Store 部署建议

1. 保持无安装、无构建的静态部署；Catalog 在提交前或 Actions 中由 Node 生成。
2. PR/功能分支先使用 EdgeOne 预览部署，验证 `/store/` 与 Catalog。
3. Catalog JSON 与 HTML 分开设置缓存；发布后验证 ETag/Last-Modified 能更新。
4. 下载文件继续放在网站 Git 仓库之外；现阶段没有真实公开文件，不新增 COS。
5. 新增 COS、下载域名、云 Secret 或正式缓存规则前单独暂停确认。
