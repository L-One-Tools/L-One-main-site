# Store 数据架构

## 目标

Store 公开页面只读取经过校验、可缓存、无凭据的静态 Catalog。人工产品资料与机器版本
资料分开维护，任何同步失败都不得用空数据覆盖上一份有效快照。

## 数据流

```text
store/catalog.source.json
        +
store/releases/<tool>.json
        |
        v
scripts/generate-store-catalog.mjs
        |
        +--> public/data/store/catalog.json
        |
        +--> public/data/store/catalog.last-known-good.json
        |
        v
store/store.js --> /store/
```

## 文件职责

| 文件 | 维护方式 | 内容 |
| --- | --- | --- |
| `store/catalog.source.json` | 人工 | 名称、说明、平台、功能、图片、状态、排序和链接 |
| `store/releases/story-flow.json` | 同步脚本 | 版本、tag、通道、时间、发布说明、资产、哈希和撤回状态 |
| `store/catalog.schema.json` | 人工版本化 | 对外 Catalog 的 JSON Schema |
| `public/data/store/catalog.json` | 自动生成 | 页面优先读取的公开 Catalog |
| `public/data/store/catalog.last-known-good.json` | 自动生成 | 最新 Catalog 失败时读取的稳定快照 |

页面不读取私有 GitHub API、GitHub Project、腾讯云 Secret 或 Story Flow 私有下载地址。

## 当前 Story Flow 数据

- 工具状态：`internal`
- 版本：`0.5.8`
- 发布通道：`internal`
- 下载：不可用
- Release/tag/公开资产：无
- 平台：Windows 10/11 x64

该版本来自源码仓库一致的版本文件，但不是公开 Stable Release。

## 校验规则

`scripts/store-catalog-lib.mjs` 与 `scripts/validate-store-catalog.mjs` 检查：

- Schema 版本、生成时间和必要字段。
- 工具 ID、slug、版本组合和资产名重复。
- 状态、通道、版本号、日期、文件大小和 SHA-256 格式。
- `download_available` 必须至少有一个未撤回、可用资产。
- 可用资产必须使用 HTTPS。
- 下载域名默认只允许 `l-one.asia` 及其子域。
- 撤回版本不能同时保持可下载。

JSON Schema 用于固定公开契约；运行时校验补充重复项和跨字段安全规则。

## 生成与原子更新

生成器先在内存中合并和验证完整 Catalog，只有全部通过才写入临时文件并原子替换目标。
校验失败时不会执行目标写入。页面先请求主 Catalog，失败后请求
`catalog.last-known-good.json`；两者都失败时显示安全错误状态。

## 扩展新工具

1. 在人工 source 中加入唯一 ID/slug 的产品资料。
2. 在 `store/releases/` 增加同 ID 的机器版本快照。
3. 运行生成、校验和测试。
4. 为同步脚本增加对应仓库适配；不得把仓库 Token 加到浏览器代码。
5. 提交 Catalog 更新并通过 PR/EdgeOne 预览验证。

无需改变 Store 页面组件即可增加多个工具。
