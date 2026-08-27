# Store 运维手册

## 本地命令

```powershell
node scripts/generate-store-catalog.mjs
node scripts/validate-store-catalog.mjs
node scripts/test-store-catalog.mjs
node scripts/site-audit.js
```

生成器和测试不需要安装第三方 npm 依赖。

## GitHub Actions 触发

工作流：`.github/workflows/store-catalog-sync.yml`

- `workflow_dispatch`：人工运行与重试。
- 每小时第 17 分钟：定时检查。
- `repository_dispatch` 的 `story-flow-release`：Story Flow 发布流程主动通知。
- 同步产生变化时创建独立自动化分支和 PR，不直接提交 `main`。
- 失败时在主 Issue #1 留下运行链接，并保留上一份有效 Catalog。

Story Flow 将来可使用 GitHub API 向主站发送：

```json
{
  "event_type": "story-flow-release"
}
```

发送凭据只能保存在 Story Flow 的 GitHub Secret 中。

## 必需 GitHub Secret

`STORE_SYNC_GITHUB_TOKEN`

- 用途：只读访问私有 `L-One-Tools/story-flow` 的仓库与 Release 元数据。
- 推荐：GitHub App installation token 或只授权 Story Flow contents/read 的细粒度 PAT。
- 禁止：写入仓库、日志、前端、Catalog 或 Issue。
- 当前状态：尚未配置；需用户在 GitHub 仓库设置中完成。

## 可选仓库 Variables

| 名称 | 用途 |
| --- | --- |
| `STORE_DOWNLOAD_BASE_URL` | 已确认公共下载根地址，例如 `https://download.l-one.asia` |
| `STORE_ALLOWED_DOWNLOAD_HOSTS` | 逗号分隔的额外受信任下载域名 |
| `STORE_ASSETS_MIRRORED` | 只有文件已真实镜像并验证后才设为 `true` |

即使 Release 存在，只要 `STORE_ASSETS_MIRRORED` 不是 `true`，同步器也不会启用下载。

## 首次配置顺序

1. 在 GitHub 设置中添加只读 `STORE_SYNC_GITHUB_TOKEN`。
2. 手动运行工作流，确认无 Release 时保持当前 Catalog 不变。
3. 检查日志中没有凭据或私有下载 URL。
4. 等待真实 Story Flow Release 后再次运行，确认版本资料更新但下载仍禁用。
5. 只有公共文件完成镜像、哈希和匿名访问验证后，配置下载 Variables。

## 正式公开安装包

公开下载是独立确认节点，必须同时满足：

- 统一 Windows x64 安装包通过安装与升级测试。
- 文件名包含版本，文件大小和 SHA-256 已确认。
- 使用公共 HTTPS，国内网络可匿名访问。
- Store Catalog URL 通过允许域名检查。
- 用户明确同意上传或发布真实安装包。

L-1 File To Text 2.0.8 已通过公开 GitHub Release 分发，不依赖上述 Story Flow 镜像
Variables。其 Catalog 下载地址只允许
`L-One-Tools/l-one-tools-releases/releases/download/` 下的正式资产路径；变更版本、文件名、
大小或 SHA-256 时必须重新完成页面、Catalog、下载和三端验收。

Story Flow 当前仍没有公开安装包，不得为 Story Flow 启用相关 Variables。

## Control Center 状态

- 开始同步：Status `执行中`，Release Status `构建中`。
- 页面与数据测试：Status `测试中`。
- 等待生产确认：Status `待发布`，Release Status `待审核`。
- 生产验收：Status `已发布`，Release Status `已发布 Stable`。
- 同步失败：Release Status `构建失败`，Issue 留下运行记录。

工作流当前使用 Issue #1 记录成功更新 PR 或失败运行；Project 字段由具有
`project` scope 的运维账号更新。

## EdgeOne

主站没有构建步骤。合并到 `main` 后，EdgeOne Makers 项目
`l-one-main-site-org` 自动部署。正式合并前必须先检查 PR 预览或签名临时预览，
再进入用户确认闸门。Catalog JSON 应短时缓存，HTML 保持再验证；具体缓存规则变更
需要单独确认。
