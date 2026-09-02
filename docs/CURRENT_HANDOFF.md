# 当前任务交接

## 2026-09-03 已发布：L-1 网页拓印 v0.2.2

- 任务编号：`A-20260902-01`；本地预览分支：`work/A-20260902-01-web-capture-preview`；
  开始 commit：`6d43d037af5ea527db3342affcfc864e50cd4cd9`。
- 已完成：本地 Store 新工具卡片与 `/store/l-1-web-capture/` 详情页；状态为公开内测，
  版本为 v0.2.2；2026-09-03 已按批准边界接入已核验的下载与反馈入口。
- 已使用：L-One 本轮提供的 2D 工具标识（SHA-256 `68ED144F372F34B25E16C1D8A810CBAC6E55543790115AE1DD7518AD99865C79`）
  作为 Store/首屏身份；3D 标识（SHA-256 `9F7F6DE885CB2454FBA762B10D065E0895A86DD42FF854ACAC6F0B4EF441418C`）
  只保留为本地候选、未进入页面。真实弹窗原图仅在首段以裁切方式显示任务入口，未来公开提交前
  必须重新确认标识授权与设计清理素材。
- 本地地址：`http://127.0.0.1:4173/store/l-1-web-capture/`；Store：
  `http://127.0.0.1:4173/store/`。
- 2026-09-02 复审后结构：首段以真实弹窗裁切解释“网页长图 / 网页录制”；第二段标题为
  “网页自己滚动”并在第三步说明浏览器下载目录结果；第三段为 Chrome 解压加载的文字安装提示；
  第四段为“仍有瑕疵”；第五段为“FAQ”。已去除 01—04 段落注解和“使用前再确认一次”。
- 三端截图：`E:\L-One知识库\codex\visualizations\2026\09\02\l1-web-capture-preview-r2\`
  下的 `desktop-1440x900.png`、`tablet-834x1112.png`、`mobile-390x844.png`；另有
  `desktop-popup-crop-1440x900.png` 用于核对首段裁切不含浏览器工具栏。三端页面滚动宽度均不超过对应视口。
- 本地验证：Catalog 生成、校验、回退测试、站点审计、Motion Library 审计、`git diff --check`
  通过；Store 已实测渲染第三张卡片、下载与反馈入口均可见。
- `l_one_decision`（2026-09-03）：L-One 已通过本任务中最近一次调整后的本地预览；批准对象是
  当前 Store 卡片和详情页状态，包括 2D 标识的页面使用、3D 标识作为本地候选、首段真实功能图裁切、
  章节合并与重命名、安装提示、限制说明和 FAQ 结构。不得以更早预览版替代本批准基线。
- 发布前唯一允许的页面改动：接入已经核验的真实下载链接与反馈入口。正文、图片、主布局、版本、
  Logo、人工分行、功能承诺或交互若有变化，必须重新本地预览并交 L-One 审核。
- 渠道字段已由“工具发布与渠道运维”交付并复核：下载 URL
  `https://github.com/L-One-Tools/l-one-tools-releases/releases/download/l-1-web-imprint-v0.2.2/L-1-.-v0.2.2-.zip`；
  远程响应文件名 `L-1-.-v0.2.2-.zip`；`16,700` bytes；SHA-256
  `FB9441ED595E24E6A6B9E8DD3D994E353B412FA22EFC44C923AD7E7D499DF055`；反馈
  `https://github.com/L-One-Tools/l-one-tools-releases/issues/3`。Release、版本资料与 Issue 均为 HTTP 200。
- 已发布：PR [#10](https://github.com/L-One-Tools/L-One-main-site/pull/10) 的 `sync` CI 于 2026-09-03
  通过；合并提交为 `3d570089591d1fee9da75f746e59de1d9756bc98`，EdgeOne 已更新正式站。
- 生产验证：`https://l-one.asia/store/`、`https://l-one.asia/store/l-1-web-capture/` 和
  `https://l-one.asia/public/data/store/catalog.json` 均为 HTTP 200；正式 Store、详情页和 Catalog
  均含 v0.2.2、下载入口、`16,700 bytes`、SHA-256 与反馈入口。三端无横向溢出，未发现本任务资源错误。
- 批准基线：分支 `work/A-20260902-01-web-capture-preview`；基准 HEAD
  `6d43d037af5ea527db3342affcfc864e50cd4` 加当前未提交任务文件，详细文件哈希和测试结果见
  `docs/store/L1_WEB_CAPTURE_PREVIEW_REVIEW.md` 的“L-One approved baseline”。
- 回滚：使用 `git revert -m 1 3d570089591d1fee9da75f746e59de1d9756bc98` 创建可审计回退提交，
  使官网撤回本工具入口与下载；不删除 GitHub Release、ZIP 或反馈 Issue。

## 2026-08-31 已发布：L-1 File To Text 自有下载域名迁移

- 任务编号：`A-20260831-01`；功能分支：`hotfix/A-20260831-self-hosted-download`；
  开始 commit：`9b3f4f31d0b10b1a0a0ffdb446c6c35df3ff4239`。
- 已完成的下载基础设施核验：`dl.l-one.asia` 的 HTTPS 证书已签发；安装包响应为 HTTP
  200、`Content-Length: 174867225`、`Content-Disposition: attachment`，Range 请求返回
  206。服务器文件 SHA-256 为
  `0B4080D6CF4FB9B47FA230CB8AC3C14A37C7202BEDC266869EE8BBEDB71418D8`。
- 已发布代码：详情页两个下载按钮、稳定 Catalog 和离线备用 Catalog 均改为
  `https://dl.l-one.asia/l-1-file-to-text/2.0.8/L-1.File.To.Text.Setup.v2.0.8.exe`；
  GitHub Release 与公开资料链接保持不变。
- 已合并：PR #8，合并 commit `a0beee68ede977770df594769c56d39e9883d049`。
- 本地验证：Catalog 生成与校验、Catalog 回退测试、`node scripts/site-audit.js`、Motion
  Library 审查及 `git diff --check` 通过。
- 官网验证：正式详情页返回两个相同的自有下载按钮；端点仍返回 HTTP 200、附件下载响应头和
  正确文件大小。仍应由浏览器实测下载流程，确认不跳转 GitHub、直接开始 `.exe` 下载。
- 回滚：`git revert <本轮合并 commit>`，恢复 GitHub 2.0.8 下载直链；不删除服务器或
  COS 中的安装包。

## 2026-08-28 预览通过：L-1 File To Text 2.0.8 详情页升级

- 任务编号：`A-20260828-02`；功能分支：
  `work/A-20260828-02-file-to-text-showcase-preview`；开始 commit：
  `8b1c555175c8ad9d51e44b0e25eb39f7f183076f`。
- 已完成：2.0.8 详情页内容与版式升级；保留唯一官方下载、Release、公开资料、
  文件大小和 SHA-256；加入适合/不适合判断、真实 UI 截图、输出格式 Tab、键盘可达 FAQ、
  下载状态及平板/手机章节索引锚点保护。
- 素材边界：仅使用已核验、已脱敏的 `txt-1.png`、`txt-2.png`、`txt-3.png`；禁用素材
  `93d82e74-a597-4ee5-8018-e00a8a521b80.png` 未引用。三张导入素材的 SHA-256 已纳入站点审查。
- 本地验证：`node scripts/site-audit.js`、`node scripts/validate-store-catalog.mjs`、
  `node scripts/audit-motion-library.js`、`git diff --check` 通过。Chrome 1440×900、
  834×1112、390×844 无横向溢出；Tab、FAQ 焦点、下载链接、锚点与控制台检查通过。
- 预览验收：宣讲人 P0/P1 已通过；生产、CI、GitHub PR 和 EdgeOne 部署尚未验证，
  不得据此声称官网发布成功。
- 回滚：合并后使用 `git revert <本任务合并提交>`；不修改 GitHub Release 或安装包。

## 2026-08-28 正式发布：L-1 File To Text 2.0.8

- 任务编号：`A-20260828-01`；功能分支：`work/A-20260828-01-file-to-text`。
- 任务开始 commit：`6112815f363a9cfba6778a8c4b206b099fc41eac`；开始时工作区干净，
  fetch 后与 `origin/main` 一致。
- 已完成：官网详情页、Store 卡片入口、2.0.8 Catalog/稳定回退快照、GitHub 官方
  Release 路径校验、站点地图和直接相关审查规则。
- 本地测试：Catalog 生成与校验通过、两轮/失败保留测试通过、全站 14 个作品审查通过、
  Motion Library 64 项审查通过、后端 37 项通过。
- 三端验收：Chrome 桌面 1440×1000、iPad 820×1180、手机 390×844 均无横向溢出；
  Store 显示 2 个工具，详情入口、唯一下载 URL、版本、文件大小、SHA-256 与键盘焦点通过。
- 外链验收：Release、版本资料与隐私页 HTTP 200；安装包直链一次跳转后 HTTP 200，
  `application/octet-stream`、文件名与 `174867225` bytes 均匹配。
- GitHub：功能提交 `ea5edbc8b110720ae0f5f6fcfbd2ebd55d1aaab7`；PR #4；CI
  `Store Catalog Sync` run #439 成功；合并提交
  `9bf4910345b9f9e2f2f05d90029a0793e9eb95ca`。
- 生产：`https://l-one.asia/`、`https://l-one.asia/store/`、
  `https://l-one.asia/store/l-1-file-to-text/` 与公开 Catalog 均为 HTTP 200；正式站桌面、
  iPad、手机无横向溢出、无页面或控制台错误，下载、Release、版本资料、文件大小、
  SHA-256 和键盘焦点全部通过。
- 部署证据：线上详情页与 Catalog 的 SHA-256 和 `9bf4910` 仓库文件一致；Store 页面
  统一换行为 LF 后与仓库内容一致，详情页 `Last-Modified` 为 2026-08-27 23:12:46 GMT。
  EdgeOne 控制台部署 ID 未验证，但正式域名内容已确认对应本次合并。
- 当前状态：L-1 File To Text 2.0.8 官网发布成功。
- 回滚：对合并提交 `9bf4910345b9f9e2f2f05d90029a0793e9eb95ca` 执行 `git revert`；
  若生产下载异常，先回退页面/Catalog 到
  `6112815f363a9cfba6778a8c4b206b099fc41eac` 对应的上一稳定站点内容。

## 项目信息

- 仓库：`https://github.com/L-One-Tools/L-One-main-site`
- 生产分支：`main`
- 功能分支：无（任务已合并至 `main`）
- 当前设备：A（公司台式机）
- 当前 AI 工具：Codex
- 最后更新时间：2026-08-20（Asia/Shanghai）

## 当前基线

- 任务开始 commit：`d163c3f7852bf02d445a74e82392f5c5d9299558`
- 远程 main commit：`7e81562a95d93fb4fca2ccdb89deb0d447833bf3`
- Store 发布 PR：`https://github.com/L-One-Tools/L-One-main-site/pull/2`，已合并。
- 正式站：Store、页面资源、Catalog 与稳定回退快照均为 HTTP 200。
- 本任务 commit：`ad35bf5b64d21caccf41e992df8027b827345942`。
- PR #3：`https://github.com/L-One-Tools/L-One-main-site/pull/3`，已合并。

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
- 已正式合并 `main` 并由 EdgeOne 更新 `https://l-one.asia/`。

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
- 正式站 Chrome 电脑 1440×1000、iPad 820×1180、手机 390×844：主页、Store、
  Works、Notes、Materials、About 共 18 项检查通过；导航均为 Store、Works、Notes、
  Materials、About，无 Recent、横向溢出或页面脚本错误。

## 当前状态

- `A-20260805-01` 已完成并正式发布。
- Store 保持真实内测状态：Story Flow `0.5.8` 暂无公开安装包，下载按钮继续禁用。

## 保护范围

- 未修改作品正文、作品数据或媒体素材。
- 未修改 Store 页面布局、Catalog、下载状态或版本同步逻辑。
- 未修改 Materials 数据、Motion Library 动效、后端、数据库、服务器、EdgeOne、DNS、
  正式域名、云端 Secret 或生产环境变量。

## 回滚

- 代码回滚使用 `git revert` 撤销本任务提交，不重写历史。
- 若需回退导航发布，使用 `git revert ad35bf5`；发布前稳定生产基线为 `d163c3f`。
