# Store 回退手册

## 触发条件

- Catalog 校验、同步、下载检查或页面测试失败。
- Store 读取到缺失必要字段的数据。
- 新版本被撤回或公开文件无法匿名访问。
- EdgeOne 新部署导致 Store 或原有页面回归。

## Catalog 同步失败

1. 停止合并自动生成的 Catalog PR。
2. 保留 `public/data/store/catalog.json` 与
   `catalog.last-known-good.json`，禁止生成空 Catalog。
3. 在 Issue #1 记录 Actions run、Release tag、错误阶段和 commit。
4. 将 Release Status 标为“构建失败”。
5. 修正后使用 `workflow_dispatch` 手动重试。

生成器在完整校验前不写目标文件，因此输入或 Schema 错误不会覆盖稳定文件。

## 页面读取失败

`store/store.js` 依次读取：

1. `catalog.json`
2. `catalog.last-known-good.json`
3. 两者均不可用时显示错误状态，不渲染下载按钮

单个工具无效时跳过该工具并显示提示，不让整页崩溃。

## 撤回版本或停用下载

1. 将机器快照的 `recalled` 设为 `true`。
2. 将 `download_available` 与所有资产 `available` 设为 `false`。
3. 重新生成并校验 Catalog。
4. 在预览环境确认按钮禁用且显示撤回状态。
5. 通过 PR 发布；公共存储中的旧文件先保留，待发布负责人确认后再处理。

不得通过删除源码仓库历史或伪造新 URL 处理撤回。

## GitHub 代码回退

1. 找到本任务对应的合并 commit。
2. 使用 `git revert <commit>` 创建新回退提交。
3. 重新运行 Store、主站、Motion Library 和后端回归测试。
4. 通过 PR 合并回退，不使用 force push、reset --hard 或历史重写。

## EdgeOne 回退

1. 在 Makers 项目 `l-one-main-site-org` 找到上一个成功部署。
2. 记录当前失败部署 ID、commit 和错误日志。
3. 使用控制台的历史部署回退/重新部署入口恢复上一成功 commit。
4. 验证 `l-one.asia` 首页、现有 hash 路由、Materials、Store、Catalog 和 HTTPS。
5. 正式域名、DNS、证书与旧项目保持不变。

若控制台不提供直接回退，revert GitHub commit 并让 `main` 自动部署。

## 验收清单

- Store 显示上一稳定版本或安全错误状态。
- 下载按钮不会指向空、私有、非 HTTPS 或未允许域名。
- 原有首页、Works、Notes、Materials、Motion Library 正常。
- Catalog 和 EdgeOne commit 可追踪。
- Issue 与 Control Center 记录失败、回退与最终状态。
