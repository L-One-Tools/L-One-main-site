# 3D 卡片网页：Drive 数据发布快照

- 页面：`/library/`
- 本轮数据来源：Google Drive 账号 `macabyavaha7@gmail.com` 的正式 Style Library 和 Image Library；读取时间为 2026-09-23。
- Style 正式索引：`1fUFLOijrAp43okPx_BqGyV3x0mb04cC4`，7 个 active 条目，索引更新时间 `2026-09-23T13:00:00+08:00`。
- Image 正式索引：`1hJba9jnMU0Pnbzu-S6RkVYRuQefS2iU8`，4 个 active 条目，索引更新时间 `2026-09-22T22:45:28+08:00`。
- `library/data/cards.json` 的名称、简介、标签、完整复制提示词、版本、来源文件 ID 均由上述索引及各卡 Registry 文件生成。没有沿用 ZIP 包中的卡片文案或图片数据。
- 11 张封面从正式索引指向的 Drive preview 文件下载；有资产包的卡片，其细节图从 Drive ZIP 取得。Style-003、Style-004 的正式资料没有细节图资产包，因此播放器只显示封面。已提供的细节图全部列入 `detail_data`，最多 6 张；与相应资产 manifest 的 SHA-256 核对，Style-005 和 Style-007 的 manifest 未提供可匹配的全部详情 SHA，采用 Drive 原 ZIP 内文件。
- `drive-asset-manifests.json` 保存本轮读取的 Drive 资产 manifest 摘要，用于刷新时比对。

## 手动刷新

向 Codex 发出“刷新 /library/ 的 Google Drive 卡片数据”即可启动。刷新过程：

1. 读取 Style/Image 正式索引，仅纳入 `status=active` 的条目；对每条读取 Registry、正式 preview，以及索引或 Registry 指向的当前资产包和 manifest。
2. 从索引与 Registry 重新生成 `library/data/cards.json`；按卡片 ID 更新 `library/assets/cards/`，核对可用 SHA-256。新卡自动加入、停用卡移出；缺失的必需资料应停止发布并报告。
3. 运行 `node scripts/site-audit.js`、本地浏览器检查，审阅差异后按主站流程提交和部署，最后回读正式域名。

刷新频率由人工启动决定；当前页面读取已部署的静态快照，不直接请求私有 Drive。定时刷新尚未配置。
