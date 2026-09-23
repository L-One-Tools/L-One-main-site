# 当前任务交接

## 2026-09-23 About NOW 更新发布交接

- 任务编号：`A-20260923-04`。L-One 已明确要求将当前更新网页同步至 `l-one.asia`；发布范围仅为此前本地候选 `A-20260923-02`、`A-20260923-03` 的 About NOW 区及六个透明工具 PNG。
- 发布前修正：下排作品条删除固定浅灰背景，保持与 NOW 页面底材连续。此项已纳入相同候选验收。
- 执行路径：从当前工作分支精确提交并推送，经 PR、CI 合并至 `main`，等待现有 EdgeOne 自动部署后回读正式域名。GitHub、EdgeOne 和正式域名结果待本轮执行完成后记录；在回读完成前均为未验证。


## 2026-09-23 本地候选：NOW 工具标识透明化与作品滚动

- 任务编号：`A-20260923-02`；本地分支：`work/A-20260923-02-about-now-material-marquee`；基线：`74224efebd89e814c4dfea20cdf76e24ba3dac03`。本轮严格限于 About 来源页的 NOW 区、4 个新增透明 PNG 和对应评审/状态记录。
- 四个工具图原文件不覆盖。新增 `assets/about-v42/tools-transparent/` 下的 `l1-text-transparent.png`、`capture-transparent.png`、`story-flow-transparent.png`、`rubbing-transparent.png`；均为 `1254×1254` RGBA，Alpha 范围 `0–255`。页面按既有 alt 映射引用透明副本，左上主站品牌标记不变。
- 下排作品卡片从 `225px` 增至 `259px`（+15%），保留左右 `8px` 外边距；滚动动画 `90s` 同比改为 `103.5s`。悬停/键盘焦点放大 `1.08`，两侧卡片以等量 `translateX` 让位；减少动态偏好时停止该条滚动并取消位移动画。
- 空格键作品集入口由脚本移动到主观点后、下排作品条前；入口上下均使用 `--now-entry-gap` 的同一较宽间距。未改动标题文案、视频、作品集内容、线上配置或生产资源。
- 本地验收：`node scripts/site-audit.js`、评审记录校验、透明 PNG 尺寸/Alpha 校验、内联脚本解析、`git diff --check` 与本地 HTTP 资源回读通过。预览仍为 `http://127.0.0.1:4174/#about`。本轮未提交、未推送、未合并、未部署；如获得单独授权，仍需精确提交、PR、CI、合并与正式域名回读。

## 2026-09-23 本地候选：NOW 六工具与视口留白调整

- 任务编号：`A-20260923-03`；分支沿用 `work/A-20260923-02-about-now-material-marquee`；基线仍为 `74224efebd89e814c4dfea20cdf76e24ba3dac03`。本轮只改 About 来源页 NOW 区和其透明工具副本/记录。
- 新增透明工具副本：`tools-transparent/wave-transparent.png` 直接复制用户提供的 Alpha PNG；`tools-transparent/one-bar-transparent.png` 为只移除用户提供图外部白底后的 RGBA 副本。两者均 `1254×1254`、Alpha 范围 `0–255`，原图不覆盖。
- NOW 上排运行六种工具两次以保持无缝，图注依次为 L-1 TEXT、CAPTURE、STORY FLOW、RUBBING、WAVE、ONE BAR。工具与下排作品卡片尺寸不变；通过缩短 NOW 纵向留白，让下排更早进入默认桌面视口。
- 上/下滚动周期分别为 `128.571s` / `147.857s`，即较前一版本速度各降低 30%；下排改用无纹理纯净底色；下排至 statement 的留白 `56px`；页面滚动超过 `20px` 时仅左上品牌淡出，菜单仍可使用。
- 待验收：本地资源、脚本行为、全站审计和差异检查。未提交、未推送、未合并、未部署。

## 2026-09-20 本地候选：About v4.2 替换

- 任务编号：`A-20260920-01`；分支：`work/A-20260920-01-about-v42-replacement`；开始 commit：`34f2ff2e5b19804ecf45bae3ac3996e0f8834eca`。
- 已完成：仅本地候选的 `/#about` 已运行 L-One 指定的 FIXED-SINGLE 页面。About 激活时显示来源页自身页头，离开时恢复主站页头；其余路由不变。左上文字已改用主站既有透明品牌标记，并在作品滚动区下方加入“进入作品集”入口。按本轮截图：NOW 栏目标加粗、右侧说明删除、主观点字号增加 30% 并加粗；入口缩小 30% 且上移贴近滚动条；资产表达视觉顺序调整为“参考 → 素材库 → 经验资产”，并替换资产标题/说明、删除 ASSET 小字。L-One 已明确决定：重要标题禁止浏览器自动换行；桌面端应保持单行，手机端须人工设定语义分行。
- 资产来源与校验：原始文件 `C:\Users\Administrator\Downloads\L-One-Homepage-v4.2-FIXED-SINGLE.html` 的 SHA-256 为 `9277553AA4ACE98303BAB4D9D0F2D0D5918A592E8CB8F6626CC4FFE99B6BA735`；候选副本 SHA-256 为 `2CC161D11F11510C78F6D8C31A42880ABDB2DCAD33570EB092401F3F6E73EEED`。品牌标记为既有 `assets/brand/l1-site-mark-3d-transparent-v1.png`；按钮原始素材为 `assets/about-v42/portfolio-button/base.png`（底托，SHA-256 `8F8B5E45857EEED9B6D7D565EB80893AA7B7948447F62500B0390BB385E75968`）、`keycap.png`（键帽，SHA-256 `3481D0BA49C332BBAB82327F83F5B1F47F92AD1A2C8B77769C671C43F492D5E5`）；`reference.png`（完整形态）仅用于核对。源文件保留自身的内嵌图像和视频资源；截图中的标注框、箭头和批注文字均未写入页面。
- 2026-09-21 本地候选调整：使用 L-One 提供的 `ChatGPT_Image_2026年9月21日_08_32_19.png` 作为 `assets/about-v42/ambient/gray-white-material-20260921.png`，SHA-256 `A500F68DABD9FB3754533069270877CD4B40F2D7ACC6BAC19E0E6574C492408E`。About 时间线在宽屏仅以 `1.05` 比例、`42%` 垂直重心保守放大，优先保留头部与顶部文字；两侧和底部改为白灰渐隐承托。根据 L-One 复核意见，白灰底材升级为更明显的冷灰雾面，且可由 CSS 控制的窗口、图标、截图、二维码与文字标签统一为 `2px` 以内的直角过渡；用户提供的 3D 键帽实体倒角保留。未改视频内容、文案、结构、跳转、作品集或任何云端状态；候选 SHA-256 更新为 `7C6B29D69C04CD7B1DC76FE2316F99452BDE91485295DD8757AAAF06EC97E1BE`。
- 本地预览：`http://127.0.0.1:4174/#about`；截图和 Intent Lock：`docs/about/L_ONE_ABOUT_V42_REVIEW.md`。
- 新作品集入口已更新：用户提供的 V9 作品集详情页已替换原占位页，保留项目选择、红色标题拉伸、滚轮/方向键切换、详情转场、ESC 返回和原作链接。本轮将项目与作品详情的右侧视图统一改为 `5.5:7` 竖向比例，四个项目右侧图替换为 L-One 提供的对应本地原图（喜大川、疯游精、灌木、过往作品）；项目标题的行间距固定且明显；移除左下说明并新增立体“回到 About”按键。详情左下标题采用 L-One 的逐条展示文案（喜大川 5 条、疯游精 9 条、其他作品 2 条）：不由浏览器自动换行，其他未指定标题继续使用 12 字单行、超长两行的确定性规则；标题下方为深灰下划线“跳转原文链接”。详情的 PREV/NEXT 为立体 `←`、`→` 键，封面点击行为保留。按标题精确接入本站已有的 5 张真实封面（将府公园、大望路、环球影城吃喝篇、环球影城总结篇 1/3、隐藏视角）；其余 18 条因小红书、抖音、新片场和阿里云盘的自动访问不可用，保留原始 V9 纯色底并等待 L-One 补充。页面 SHA-256：`4150CF547554728928444ADD448D2F47821A8C7D315CA649775DB8982B421F1E`；评审记录：`docs/portfolio/L_ONE_PORTFOLIO_V9_REVIEW.md`。
- 本地验证：源页、背景纹理、品牌标记、作品集入口、项目品牌图和两个分层按钮素材均为 HTTP 200；时间线脚本解析、白灰底材/缩放/边缘取样静态约束、作品标题拆分约束、`node scripts/site-audit.js`、Design-to-Code 评审记录校验与 `git diff --check` 均通过。About 桌面、平板、手机与 2026 时间线状态截图位于 `E:\L-One知识库\codex\visualizations\2026\09\21\about-v42-ambient\`；Canvas 动态取样设有浏览器保护下的静态渐隐回退。NOW/资产表达及 V9 详情切换的最终视觉状态仍待 L-One 在本地预览中确认。
- 发布授权：L-One 已于 2026-09-23 明确发送“确认部署 About”。本次发布包含 `/#about` 与其唯一必要依赖 `portfolio.html`；不修改 DNS、EdgeOne 配置、服务器数据或生产凭据。
- 待执行并回读：精确提交、推送、PR、受保护分支合并、既有 EdgeOne 自动部署与正式域名验证。来源页中的微信、电话和小红书联系字段随 L-One 已确认的 About 页面一并发布；若生产回读异常，使用 `git revert <merge-commit>` 创建回退提交。

## 2026-09-05 待发布：L-1 File To Text v2.1.0 公开内测版

- 任务编号：`A-20260904-01`；分支：`work/A-20260904-01-file-to-text-public-beta`；开始 commit：`5b3322ee1ae78197ad647600ca265b80f58f1b67`。
- 已核验的唯一发布字段：GitHub Release `l-1-file-to-text-v2.1.0-public-beta`；安装包 `L-1.File.To.Text.Setup.v2.1.0.exe`；大小 `146,969,357` bytes；SHA-256 `B4CB233299B9660EAC81F702A7215DA13401AEFB79D6591EB651C3F47CDA3406`；反馈 Issue #4。下载响应为 Release 重定向后附件 200，并包含正确文件名、长度与 Range 支持。
- 用户可见状态：公开内测，不是稳定版；已验证首次资源下载/校验、短样本本地 Markdown 转写和 275 项自动测试。大批量真实文件仍在测试；不提供中文翻译稿、SRT/VTT，歌词或台词只提示人工复核。
- 本地验收：Catalog 生成/校验、Catalog 回退测试、站点审计、Motion 审计和 `git diff --check` 通过。隔离 Chrome CDP 的 1440×900、834×1112、390×844 Store/详情页截图均无横向溢出；手机 Store 目录已由横向流修为单列。下载和 Store 卡片均可键盘聚焦。
- 截图与 Intent Lock：`E:\L-One知识库\codex\visualizations\2026\09\04\l1-file-to-text-v2-1-0-public-beta\`；`docs/store/L1_FILE_TO_TEXT_2_1_0_PUBLIC_BETA_REVIEW.md`。
- 发布前剩余：精确暂存、PR、CI、合并，等待 EdgeOne 更新后从正式域名复核 Store、详情、Catalog、下载、反馈、版本、大小和 SHA-256。
- 回滚：正式异常时对本轮合并提交执行 `git revert`，回到 `5b3322e` 对应的 2.0.8 页面/Catalog；不删除 GitHub Release 或安装包。

## 2026-09-03 待发布：透明 3D L/1 导航标记

- 任务编号：`A-20260903-04`；分支：`hotfix/A-20260903-04-transparent-3d-logo`；开始 commit：`f2ae627aeb8b061aaa7579b166fdcb020ec7a07d`。
- 来源与处理：L-One 提供 `E:\L-1设计部\l-1logo3.png`；已生成透明 RGBA PNG，Alpha 范围为 0–255，未保留白色画布。使用文件为 `assets/brand/l1-site-mark-3d-transparent-v1.png`；原 2D SVG 不覆盖、仅停止引用。
- 影响：主站、Store、Materials、Motion Library 与两个工具详情页的左上导航统一换用该标记。下载、版本、Catalog、正文和业务逻辑不变。
- 本地验收：白底导航 40px 图像渲染清晰，44×44px 链接点击区保留，Store 1440px 无横向溢出。
- 发布授权：L-One 要求将透明正式 Logo 改到网页中；通过 PR、CI 和生产回读后发布。
- 回滚：`git revert <merge-commit>`，恢复此前二维导航标记；不删除新 PNG 或原始设计文件。

## 2026-09-03 待发布：全站子页壳层与工具目录 v2

- 任务编号：`A-20260903-03`；分支：`work/A-20260903-03-subpage-shell-tools-catalog`；开始 commit：`d974d195efaef528104db77797f1074b269a0ae0`。
- 已完成本地候选：Store 移除说明型 Hero，首屏直接显示两项公开工具的同规格目录卡和真实的编辑推荐空状态；Notes 与 Works 首屏直接进入内容；Materials 首屏直接进入筛选和素材网格，素材上传控件仅移动到工具栏；主站、Store 和 Materials 导航换用 2D L/1 标记。
- 未修改：工具详情、下载、版本、Catalog 资料、Materials 权限和数据、作品内容、后端或生产配置。
- 本地验收：独立 Chrome 配置生成 1440×900、834×1112、390×844 截图；所有页面的文档滚动宽度不超过视口，Logo 点击与键盘焦点目标为 44×44px。预览：`http://127.0.0.1:4173/store/`、`/index.html#skills`、`/index.html#works`、`/materials/`。
- 发布授权：L-One 已在 `l-one asia-1` 确认执行官网上线。发布前仍须完成当前分支精确提交、PR、CI、合并和生产域名验证。
- 审计基线修正：PR #10 新增的 `store/l-1-web-capture/assets/wordmark.svg` 使用 LF 规范化后 SHA-256 为 `33C4EBC479C0097411F5888E81B5D1D294569974656922DA9E2B5A6A50DF68BB`。审计现对 SVG 规范化换行后再核验，避免 Windows 检出为 CRLF 时产生假失败；不改动资源内容。
- 回滚：合并后使用 `git revert <merge-commit>` 创建回退提交，恢复此前页面结构；不影响已发布的工具下载和 Release。

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
