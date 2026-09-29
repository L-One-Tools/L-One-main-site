# OneBar Store 本地预览记录

状态：介绍页已公开；安装包下载尚未开放。

页面验收更新（2026-09-29）：L-One 已明确确认当前最新页面通过，并授权继续公开发布既有已审页面与首位 Store 卡片。该授权不包含更改页面内容或公开安装包。OneBar Release/下载 URL 目前不存在，安装包未签名且部分安装验收未完成；发布后的下载状态仍须保持禁用，直至获得核验过的公开下载端点和发行验收资料。

## 任务基线

- 任务编号：`A-20260929-02`。
- 分支：`work/A-20260929-02-onebar-store-preview`。
- 开始 HEAD：`1811ae26487478415dcaed6c39c540860c609a43`。
- 本地预览：`http://127.0.0.1:4175/store/`、`http://127.0.0.1:4175/store/onebar/`。
- 资料包：`E:\L-One知识库\codex\worktrees\5ed6\L-1Studio\docs\handoffs\onebar-recommendation\OneBar推荐.zip`，71,524,505 bytes，SHA-256 `5EE7A69E25946BC54053D12979FC2A77DFA55D505115B3767369D054B48516DC`。

## 来源与素材

- 安装包源文件：`01_installer/OneBar_Setup_v1.0.0.exe`；51,204,097 bytes；SHA-256 `CAF38EDBF3992E580A13C162389FFB2715807F80EB9BAE6093753268305D6CFE`，与 ZIP 清单一致。安装包未签名。
- 文章源文件：`02_article/index.html`；SHA-256 `F9D699B400B43F3F4942765711F2BE48D026918664844B763D0678049D9FB897`。复制到 `store/onebar/index.html`；现有正文、布局和 CSS 保留。仅更新浏览器标题/描述、增加网站图标引用，并在文章末尾追加下载状态组件与其局部样式。反向移除新增组件和元信息后，源文章逐字一致（仅保留文件末尾换行）。
- 六张文章 PNG 从 ZIP 原样复制到 `store/onebar/`；复制件长度和 SHA-256 均与 ZIP 解出的源图一致。页面图注按源文保留其“效果图/结构示意”说明，不作为运行证据。
- 卡片与文章图标源：`03_logo/OneBar.png`；源 SHA-256 `527CBFB7020E18AAC3FF1701C23507FD0C2E4843C88AD44C5F0E7CCB95C4DA1E`。PNG 含 Alpha 通道但源图所有像素不透明，角落为 RGB 253/253/254。只对与画布边缘连通的近白背景做透明化，保留包围在边框内的浅色玻璃标识；原图未覆盖。成品 `store/assets/products/onebar/onebar-mark-transparent.png` 为 1254×1254 RGBA，Alpha 0–255，透明像素 479,959，半透明边缘像素 48,629，SHA-256 `AFF9CCBDC625CE6DBD61294BE3CB6824968FB10019625BF3919BCE37300E5411`。
- 成品标识用于 Store 卡片图和文章 favicon；没有用结构效果图替代真实运行截图。

## 对外状态与限制

- Store 排序：OneBar `sort_order: 1`，在 Catalog 第一位；卡片状态为“即将开放”。
- 候选版本与包信息：v1.0.0，Windows 10/11 x64，51,204,097 bytes；官网下载地址未提供，因此 Catalog 中 URL 留空、`download_available: false`，文章底部按钮禁用。
- 内测边界来自交接说明：安装包未签名；拖动真实文件的端到端流程、安装升级回归、全新 Windows 10/11 x64 环境验收未完成。页面未宣称这些已通过。
- 未收到公开反馈入口、隐私链接或 OneBar 源码仓库地址，相关字段不虚构。
- 安装包保持在交接 ZIP，不复制到主站仓库，也未上传到 Release 或其他下载托管处。

## 本地验收

- Catalog 生成、校验与回退测试：通过，Catalog 共 4 项。
- `node scripts/site-audit.js`：通过；`git diff --check`：通过（Git 提示生成 Catalog 的 LF/CRLF 工作区换行警告，无 whitespace error）。
- 浏览器：Chrome headless，Store 与详情页分别在 1440×900、834×1112、390×844 实测。Store 三端首卡均为 OneBar；详情页三端下载按钮均为禁用；图像无加载失败；视口无横向溢出。浏览器脚本异常未发现。Store 桌面端有一次浏览器自动请求 `/favicon.ico` 返回 404；页面本身未引用该路径。
- 截图：`E:\L-One知识库\codex\visualizations\2026\09\29\onebar-store-preview\`，包括 `store-{1440x900,834x1112,390x844}.png` 与 `onebar-detail-{1440x900,834x1112,390x844}.png`。详情页截图为完整长页，包含底部下载模块。

## 下载开放的阻塞项

接入并匿名验证真实 HTTPS 下载地址、文件名、字节数和 SHA-256 后，才可启用按钮；同时需补齐公开反馈入口（如计划提供）并按 L-One 对外表达规范复核文章事实。签名、安装升级、拖动真实文件和全新系统验收状态未变前，页面继续显示待开放状态。介绍页已在正式站公开，下载发行版仍未开放。

## 2026-09-29 页面批准与生产回读

- L-One 明确确认最新本地预览通过，并授权公开发布已审核页面；PR [#21](https://github.com/L-One-Tools/L-One-main-site/pull/21) 已合并。提交 `776ba99b4b2cec3a839c84291fd1ec4adda9711b`；`Store Catalog Sync` run `36537406477` 通过；合并提交 `ac5b3ae3b87e43e65c47e30abb6287f7f8cc610d`。
- 生产 `https://l-one.asia/store/`、`/store/onebar/`、`/public/data/store/catalog.json`、`/public/data/store/catalog.last-known-good.json`、`/store/store.js`、`/store/store.css`、OneBar 标识和 sitemap 均 HTTP 200。Store HTML/JS/CSS、Catalog 主/备份与透明 Logo 和合并仓库逐字节匹配；详情页因静态服务换行，LF 规范化后匹配，线上 24,398 bytes，SHA-256 `7831D6EB5150BD6E72ABE9B4AB7A00E42EE25EF2974C9BD8256DB217938302BC`。Catalog 首卡 `onebar`、状态 `coming-soon`、`download_available=false`；页面保留禁用下载按钮。
- 桌面、平板、手机截图与布局检查记录于本页前述“本地验收”；生产页面资源字节已与批准实现核对，未另行生成生产浏览器截图。EdgeOne 控制台 deployment ID 未验证。
- 正式页面回滚：`git revert -m 1 ac5b3ae3b87e43e65c47e30abb6287f7f8cc610d`，通过 PR 合并。安装包未上传或修改。
