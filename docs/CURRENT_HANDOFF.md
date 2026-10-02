# 当前任务交接

## 2026-10-02 About 修复正式域名已更新

- 功能提交 b6af07bf67e32644d64dfbad4fb62c3c6bfbc809；PR #27；CI run 36965280792 成功；合并 511b243c53c9f3e45a46bd0e8ab4f8727809824c。
- 正式 index.html、带版本 About HTML/gallery.css HTTP 200，规范化内容与任务提交一致；浏览器 iframe 使用 ?v=20261002-about-r1，首屏深色。
- 三端生产 Chromium 检查及截图：E:/codex-site-deploy-20261002/about-parity/live-fixed-{1440,834,390}-{top,now}.png；实体 iOS 和用户另一电脑旧缓存尚待用户核实。EdgeOne 控制台部署 ID 未验证，不等同控制台部署证据。
- 回滚：git revert -m 1 511b243c53c9f3e45a46bd0e8ab4f8727809824c，经 PR 发布；不删素材/服务器数据。下方待发布记录为历史。

## 2026-10-02 About 修复发布授权

L-One 明确要求直接上线 A-20261002-03，覆盖下方本地待审核暂停。仅发布六个已核对任务文件；站点审计/diff 通过，远程 main 未前进。正在提交、PR/CI、合并及正式域名回读；完成前不标记生产成功。

## 2026-10-02 About 加载/手机排列修复：本地待审核

- A-20261002-03；分支 codex/20261002-about-loading-mobile；开始 HEAD 1c06a5907d53a1f7d5f3b4c1979b70194095eab6，fetch/pull 无远程新增，原 b9d0 修改保留。
- 正式样式移至 head，深色关键底色及背景预加载；iframe/CSS/JS 带 20261002-about-r1 版本查询，避免旧地址长期缓存。未改服务器配置、正文、素材或其他页面。
- About 工具组不收缩、每项固定宽度、图标尺寸及名称约束。当前 Chromium 未复现用户旧截图重叠，不宣称定位用户设备唯一原因。
- 预览 http://127.0.0.1:4180/index.html#about；截图 E:/codex-site-deploy-20261002/about-parity/fixed-{1440,834,390,320}-{top,now}.png。
- 四视口 Chromium 无横向溢出/pageerror，手机项124px/图108px、桌面项156px/图140px；CSS 中断时首屏仍深色。site-audit、diff --check 通过；impeccable detector 无发现。
- 实体 iOS Safari/旧缓存未验证。未提交/推送/部署，排版修复待 L-One 本地审核。生产未改变；回滚本任务精确 diff，发布后 revert。

## A-20261002-02：作品声音与缓冲修复

正式发布完成：PR https://github.com/L-One-Tools/L-One-main-site/pull/25，功能提交 8c5ef71f017ea126d4da1bc0ba7e950a191f4c71，合并提交 25940c2e608cbbec6f0a341c1b957028639343db。现有 CI 路径过滤未触发此 JS/文档任务（无检查项，不记为 CI 通过）；本地语法/site-audit/diff 通过。正式 works.js 与合并文件规范化换行后匹配。

正式桌面1440×900、平板834×1112、手机390×844全部通过：每次20秒实际网络观察分别推进20.018、20.006、20.004秒，waiting事件0；muted=false、volume=1、音频已解码，全部使用720p。进入目录零视频请求；只请求当前视频，点击下一作品才请求下一文件。暂停/继续、静音/恢复、切换和返回卸载均通过，无pageerror。证据 E:/codex-site-deploy-20261002/playback-fix-production/results.json 与同目录截图；这是首作品短时抽测，不代表全部网络与全片无缓冲。EdgeOne控制台部署ID仍未验证，正式内容和行为已验证。

回滚 git revert -m 1 25940c2e608cbbec6f0a341c1b957028639343db，经PR合并重新部署。以下为实施过程记录。

用户明确授权修复并直接发布至正式站供其检查。基线 ddb0e1cbf96495f9af4d22fb89d55431ecbc69f8；分支 codex/20261002-works-playback。仅修改 works.js 与本任务交接。

点击作品后初始 muted=false、volume=1；保留用户主动静音/音量选择。所有视口优先既有720p文件；原1080p与作品资料不变。删除两个隐藏视频预加载及全部预热调用；返回列表时暂停并卸载旧视频，避免后台继续下载。

节点语法、site-audit 与 diff 检查通过。三端真实媒体浏览器验证证据：E:/codex-site-deploy-20261002/playback-fix-local/results.json，正式验证将在 playback-fix-production/results.json 记录。验证实际音频解码、解除静音、720p URL、只请求当前视频、暂停/继续/静音/切换/返回和20秒播放推进。限速压力抽测仍有缓冲，不承诺所有网络无卡顿；正式发布后以实际网络抽测为准。

PR/CI/合并与正式脚本匹配结果完成后追加。EdgeOne 控制台 ID 未验证。回滚使用本任务合并提交 git revert。

## 2026-10-02 V2 正式发布完成

- A-20261002-01；用户明确授权最终交接候选部署及临时 SSH 连接。功能提交 5e63f27175fd39ad76fe9583990b065f75cd087b；PR https://github.com/L-One-Tools/L-One-main-site/pull/23 已合并，合并提交 33382bb9252f69c15318fb16b3bf6417a66ddf82；CI Store Catalog Sync run 36954313348 成功。
- 正式 https://l-one.asia/、/portfolio.html、/store/、/materials/、/library/ 和 /#about 已更新。21 个核心页面/资源匿名 HTTP 200，字节或仅 LF/CRLF 规范化后与合并仓库一致；透明 Logo、Works JSON、画廊场景和工具映射全部匹配。
- 1440×900、834×1112、390×844 各六页共 18 项正式浏览器检查，无横向溢出、无 pageerror；Works 实际进入视频并解码播放。正式站检查共 39 项全部通过。证据 E:/codex-site-deploy-20261002/site-checks/results.json 和同目录截图；已查看三端代表截图。Library 连续 3D 动态与完整 timeline 逐帧人工验收仍未做，不宣称实体设备全验收。
- 29 作品的 58 个播放视频和 29 封面位于 /www/l-one-static/works/site-v2-20261002/，对应 static.l-one.asia HTTPS。服务器 87 项 SHA-256 全部匹配；58 个 Range 206 与长度通过；87 个匿名响应加 58 个实际桌面/手机视频播放，共 145 项全部通过。证据 E:/codex-site-deploy-20261002/media-checks.json。
- 未改 DNS、EdgeOne/服务器配置、产品版本与下载事实；其他工作树保留。EdgeOne 控制台部署 ID/commit 未验证；正式域名内容已核对与本轮合并版本一致。GitHub 未返回单独 deployment/check-run 记录，不能将其当成控制台验证。
- 临时服务器公钥已撤销，重新连接返回 Permission denied；本机两份临时私钥已删除。服务器仅移除本轮两个上传 tar 归档（约 1.46GB），播放文件和原素材保留；本机 tar 与编码原副本保留，可重新生成上传包。服务器剩余空间约 29GB。
- 回滚：git revert -m 1 33382bb9252f69c15318fb16b3bf6417a66ddf82，经测试/PR 合入 main 自动部署，恢复发布前网站；保留媒体目录，不删除原素材。以下接管/候选记录均为历史过程。

## 2026-10-02 V2 发布接管：已授权，媒体已上传

- 当前用户明确授权部署交接的最终 V2 网站；旧“没有发布授权”记录仅属历史。任务 A-20261002-01，继续 codex/20261001-site-v2 的已确认候选，不纳入 b9d0 的 OneBar 下载改动。
- fetch/pull 后 HEAD 与 origin/main 均为 e6a59282c8df0cb965980bbf10132aa4bec44302；站点、Motion、Store Catalog 校验与 git diff --check 通过；GitHub 登录有效。
- static.l-one.asia/health.txt、Materials 清单和 admin.l-one.asia 匿名 HTTP 200；只能证明服务在线，不能证明有上传权限、正确目录或足够空间。
- 用户已在腾讯云免密终端确认 ubuntu 登录与目录权限，并明确授权临时部署钥匙。现已成功连接 62.234.73.162；/www/l-one-static 为 ubuntu 所有，可用空间约 30GB。没有改服务器配置或原资料。
- 58 个视频和 29 张封面已上传 /www/l-one-static/works/site-v2-20261002/；服务器逐文件 SHA-256 共 87 项全部 OK，正式 HTTPS 映射已填入 assets/works/projects.json。正在补全匿名 HTTP/Range 和实际浏览器播放检查；完成后才提交发布。上传归档保留在 works/ 中供本轮核对，最终清理仅这些临时归档；原视频只读保留。
- 字体上游已定位 NightFurySL2001/WD-XL-font，OFL.txt 明确支持嵌入/再分发并要求保留版权和许可；已将完整版权与许可补入 assets/works/fonts/OFL.txt，并更新 LICENSE.md。未改页面字形与视觉。
- 本地预览已重新启动 http://127.0.0.1:4180/；本轮浏览器复核证据输出至 E:/L-One知识库/codex/visualizations/2026/10/01/site-v2/deployment-20261002/。1440×900、1920×1080、834×1112、390×844 的 Home/Works/Store/About 无横向溢出或 pageerror；Store 错误/重试/回退恢复通过，手机触摸滚动 247px。Materials/Library/Motion 与三工具详情本地 HTTP 200，无 pageerror。完整连续时间线与生产媒体仍未核验。
- 当前尚未提交、推送或部署；生产 V2/EdgeOne 控制台 commit 未验证。正式媒体接好且核验后，继续精确提交、PR/CI、合并与正式域名验证。

## 2026-10-01 V2本地候选（当前；未发布）

- A-20261001-01；隔离树E:/L-One知识库/codex/worktrees/site-review-20260930/L-One-main-site；codex/20261001-site-v2；再次fetch的origin/main为e6a59282c8df0cb965980bbf10132aa4bec44302。原E:/L-One-main-site脏树保留。
- HOME/WORK/ABOUT/STORE本地候选与共享官方图标已实施，四视口100%截图自行查看并修正；静态审计、diff检查通过。详情、性能与未验证项见_upgrade_audit/05_final/FINAL_REPORT.md。
- 候选http://127.0.0.1:4180/；WORK29视频的1080/720副本外置本地挂载，cloud字段为空，正式视频上传未执行。不能直接发布此快照并宣称所有视频可用。
- ChatGPT网页读取正式域名仍失败；本机robots/TLS/15个HTTP检查正常。原因未确定，等待EdgeOne同时段日志；控制台记录未验证，故障未修复。
- 未提交/推送/PR/合并/部署。本轮没有正式发布授权；真实设备连续动态视觉与正式V2内容均未验证。下方旧候选/发布记录为历史，不继承本轮授权。

## 2026-09-29 OneBar 介绍页生产交接

- PR [#21](https://github.com/L-One-Tools/L-One-main-site/pull/21) 已合并；CI `Store Catalog Sync` run `36537406477` 通过；合并提交 `ac5b3ae3b87e43e65c47e30abb6287f7f8cc610d`。正式 Store、详情、Catalog、回退 Catalog、Store JS/CSS 与标识均 HTTP 200，线上核心文件与 `origin/main` 字节一致（详情 HTML 统一为 LF 后一致）。EdgeOne 控制台部署 ID 未验证。
- `https://l-one.asia/store/onebar/` 已公开；Store Catalog 第一项为 OneBar。产品状态保持 `coming-soon`，详情页按钮“下载准备中”且禁用。
- 暂缺公开下载 URL/Release 资产；v1.0.0 包未签名，真实文件拖动端到端、升级回归、干净 Windows 10/11 x64 验收未完成。不得将本地 ZIP/EXE当成公开下载，不得编造链接。
- 后续若发行资料补齐，第一步核验匿名下载响应、文件名、字节数、SHA-256、签名与安装验收，再最小接入下载区；这将改变已审核页面，需先重新提供 L-One 本地预览审核。
- 页面回滚提交：`git revert -m 1 ac5b3ae3b87e43e65c47e30abb6287f7f8cc610d`，再通过 PR 合并部署。

## 2026-09-29 OneBar Store 本地预览候选

- 任务：`A-20260929-02`；分支：`work/A-20260929-02-onebar-store-preview`；开始基线：`1811ae26487478415dcaed6c39c540860c609a43`。
- Store 第一张卡片为 OneBar；详情页 `/store/onebar/` 沿用 ZIP 原文章布局，底部新增安装包状态组件。源文章现有正文和 CSS 未改写，配图原样复制；卡片图与 favicon 使用去除画布背景后的 OneBar 标识。
- 包事实：v1.0.0，`OneBar_Setup_v1.0.0.exe`，51,204,097 bytes，SHA-256 `CAF38EDBF3992E580A13C162389FFB2715807F80EB9BAE6093753268305D6CFE`。包未签名、未公开托管；真实拖动文件端到端、安装升级与全新 Windows 10/11 x64 验收未完成。Catalog 标记 `coming-soon`，下载按钮禁用，未编造 URL/反馈入口。
- 本地预览：`http://127.0.0.1:4175/store/`、`http://127.0.0.1:4175/store/onebar/`。三端截图位于 `E:\L-One知识库\codex\visualizations\2026\09\29\onebar-store-preview\`。Catalog 生成、校验、回退测试、站点审计和差异检查通过；详情页三端无横向溢出、图像加载失败或脚本异常。Store 桌面浏览器自动请求 `/favicon.ico` 返回一次 404。
- 评审与素材记录：`docs/store/ONEBAR_STORE_PREVIEW_REVIEW.md`。当前仅本地候选，未提交、推送、PR、合并或部署。正式下载需先交付真实公开 HTTPS 地址并通过匿名文件名、字节数和 SHA-256 核验；产品未通过项不得改写为已验收。

## 2026-09-29 修改版主站发布结果

- PR #19：`https://github.com/L-One-Tools/L-One-main-site/pull/19`，已合并；正式 `main` 为 `27098ecfeb624855b028d2cd251e5884744508d1`。PR 同步检查通过。
- 正式域名首页、Works、Store、Materials、Materials 清单、Library、共享 CSS/JS 和新的联系图均返回 HTTP 200，字节与发布候选一致；About HTML 在 LF/CRLF 换行规范化后内容一致。EdgeOne 控制台部署 ID 未验证，正式域名回读已确认新版本。
- 待 L-One 真实浏览器核实：About 四段人物与文字、滚动卡片阴影、Works 连续滚轮、Library 完整 3D 场景。反馈出现异常时记录页面、视口和画面状态；回滚使用 `git revert -m 1 27098ecfeb624855b028d2cd251e5884744508d1` 创建可审计提交。

## 2026-09-29 修改版主站发布前记录（历史）

- 任务编号 `A-20260929-01`；L-One 已授权将本地修改版部署到 `l-one.asia`。发布内容为 A-20260928-01 至 04 的已记录候选，原主站工作树的其他未提交改动不纳入。
- 发布前：`node scripts/site-audit.js` 通过；`git diff --check` 无差异错误；`origin/main` 与本分支起点一致。GitHub PR、EdgeOne 部署与正式域名回读待完成。
- 回滚：合并后使用 `git revert`，不强制推送。About 四段动态滚动画面、Works 连续滚轮和 Library 完整 3D 场景的人工观感仍需在正式站复核。

## 2026-09-28 About 滚动作品卡片阴影本地候选

- 任务编号 `A-20260928-04`。针对用户截图中的卡片底部黑色边缘，收小下排作品卡片的常态和悬停阴影范围与浓度；封面、卡片尺寸及放大幅度未改。仍是隔离工作树的本地候选，未提交或部署。

## 2026-09-28 About 人物完整显示本地候选

- 任务编号 `A-20260928-03`。用户的四张截图指出时间线人物头部被裁，要求人物头部与全部文字完整显示，并明确将不得裁头作为后续任务的硬约束。
- 在 `assets/about-v42/L-One-Homepage-v4.2-FIXED-SINGLE.html` 撤销宽屏视频 `cover` 与 SVG `slice`：视频及叠层共同使用完整 4:3 画幅，视频 `contain`、SVG `meet`，画布两侧由灰白页面底材填充。第一轮“铺满宽屏”的描述已被此决定覆盖。
- 视频源四个时间点的静帧均包含完整头部；本地浏览器测得 1896×722 画布内视频约 963×722、居中，静态布局没有顶部画幅裁切。四段动态画面仍待逐段复核；未运行自动化测试，未提交或部署。预览：`http://127.0.0.1:8765/#about`。

## 2026-09-28 第二轮页面反馈本地候选

- 任务编号 `A-20260928-02`，沿用隔离分支 `codex/20260928-site-ia`。About 三张联系图标生成新的透明 RGBA 版本，恢复绿色、红色与银灰原色；原图不修改。Works 通过视口内标题排版、CSS 同步过渡与图片预解码淡入处理重叠和空帧。
- Notes 页面及导航入口已删除；原文字动效图书馆作为 Store 第三张资源卡，旧 `/#skills` 跳转至 `store/#motion-library`。Store Catalog 仍只记录两项已发布工具，资源卡独立于产品发布数据。
- Materials 从 `https://static.l-one.asia/materials/data/assets.json` 保存 209 项正式清单本地快照，SHA-256 为 `1BD9D94A161681723AB0158B39DFF279E25F3519B8CC416CDBD84F3FD690563A`；页面立即读本地文件，再后台读取远端更新。首屏 20 张缩略图复制原文件至 `materials/assets/`，完整视频仍来自正式静态服务器，悬停时才请求预览视频。
- `assets/site-prefetch.js` 在当前页加载后且浏览器空闲时低优先级预热其他独立页面、清单及 Library 依赖；省流量模式跳过。Library 首屏显示 `STYLE-001` 正式卡片封面，3D 初始化完成后仍由原页面接管。
- 本地静态截图：`E:\L-One知识库\codex\visualizations\2026\09\28\site-ia-works-v2.png`、`site-ia-store-v2.png`、`site-ia-materials-v3.png`、`site-ia-library-v2.png`。这些截图确认相应首屏布局；动态滚轮、联系图标在页面中的最终观感、Library 3D 完整渲染尚待人工复核。未运行自动化测试，未提交或部署，正式站仍为旧版。

## 2026-09-28 主站入口与 About 视觉本地候选

- 任务编号 `A-20260928-01`；隔离工作树 `E:\L-One知识库\codex\worktrees\site-ia-20260928\L-One-main-site`，分支 `codex/20260928-site-ia`，基线 `80e1f592649ce4e2580903378819d314d975a952`。原主站工作区已有其他未提交变更，本轮未覆盖。
- 候选已把 Library 加入一级导航；Works 指向 `portfolio.html`，旧主页 Works 及详情区已移除；About 的 Text / 拓印图标接到对应 Store 详情；About、Works、Library 使用可见主站导航。Store 与 About 图标、About 头图及双排滚动已按本轮反馈调整。
- 本地预览 `http://127.0.0.1:8765/`。1440×900 的 Store、About 首屏、Works、Library 顶栏截图位于 `E:\L-One知识库\codex\visualizations\2026\09\28\`。Library 场景因外部模块加载未在截图中完成；About NOW、窄屏和实际滚动交互仍待视觉复核。
- 本轮未运行自动化测试，也未提交、推送、合并或部署。待完成视觉审核与必要修正后，才可走生产发布与正式域名回读；目前线上状态未验证为新版。

## 2026-09-24 About 发布体积阻断修复候选

- 任务编号：`A-20260924-01`；独立修复分支：`work/A-20260924-01-about-media-extraction`，以已解决冲突但暂未合并的 PR #17 分支为基线。先验证媒体修复，再合并 PR #17，避免触发已知会失败的中间生产部署。
- 唯一页面修改：把 About HTML 的 86 处 Base64 媒体引用改为同目录现有 24 个文件的相对路径。每处按原始字节 SHA-256 唯一匹配；原文件未改、不重新编码。HTML 从 `55,696,947` bytes 降为 `74,778` bytes；24 个文件均小于 EdgeOne 单文件 25 MiB 上限，最大 MP4 为 `3,187,462` bytes。
- 本地验证：改写后的 HTML 与原版对比，除 86 处媒体地址外逐字相同；24 个资源均通过本地 HTTP HEAD；Chrome 1440×900、834×1112、390×844 中视频 `readyState=4`、宽度 `1024`、无解码错误，87 张图片无加载失败，六工具各两次、作品集目标不变且无横向溢出。`node scripts/site-audit.js` 与 `git diff --check` 通过。
- 待执行：独立修复 PR、PR #17 合并、EdgeOne 新部署日志与正式域名回读。当前不得标记为线上成功；若新部署失败，依据日志定位并暂停继续合并。

## 2026-09-23 3D 卡片资料库部署

- 任务编号：`A-20260923-01`；分支：`codex/20260923-spatial-library`；开始 commit：`74224efebd89e814c4dfea20cdf76e24ba3dac03`。
- 已建立 `/library/` 独立页面。11 张卡片的名称、简介、标签、复制提示词、来源文件 ID 由 Google Drive 正式 Style/Image 索引及各自 Registry 生成；封面和已有细节图从 Drive 正式文件及资产包取得。Style-003/004 无正式细节包，详情播放器显示封面。页面只读本地静态快照。
- 来源和刷新流程：`docs/library/README.md`；手动刷新由 Codex 读取 Drive 重新生成快照、核对资源、完成主站发布流程。定时任务未配置。
- 本地审计：`node scripts/site-audit.js` 已通过；正式域名部署状态待发布后回读，不得据本地结果推断生产已更新。

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

2026-10-01 用户最新决定：ChatGPT访问故障延期至下次独立任务，本轮不再索取EdgeOne安全日志或继续排查。用户允许后续查看已登录Chrome中的腾讯云页面；当前未接管浏览器会话，未取得或验证控制台日志，未获生产配置修改/发布授权。截图显示正式域名对应l-one-main-site-org（L-One-Tools/L-One-main-site），另有旧l-one-main-site项目；后续须在控制台再次核对。

## 2026-10-01 用户Logo纠正
Home去除错误的浅白底板，位置改为顶部居中；Home/Works/Store/About恢复原透明PNG引用；其他页面原正确Logo与布局保持。移除本轮不再使用的小WebP，图标映射同步。之前after-brand性能数字属于纠正前候选，不能作为当前版本性能结论；本轮仅按Logo范围检查三视口位置、透明背景和截图，不重复未改模块测试。证据：外部logo-correction目录。当前仍未发布。

## 2026-10-01 Store用户纠正
移除工具标题及资料更新时间；全部/浏览器插件/桌面工具/AI Skills居中，与右侧左右箭头组成整体；默认全部。四分类键盘循环按实际数量计算，目录状态/下载事实未改。
Store页面与顶部导航同白底，下方Slogan保留原文但去墙面贴图。卡片为3:4竖卡，宣传图直接使用现有原件，去掉带米灰色补边的展示副本引用，contain保留完整画面。OneBar底色#e6d4c3取原电脑屏幕70%横向/40%纵向像素；File To Text取界面#5f666d；网页拓印#fff8f5取原图背景。照片/真实UI自身色彩保留，未重绘素材。深色卡白字保证阅读，资源入口排除3:4比例。
1440×900、834×1112、390×844，DPR1/100%：整页和左右箭头状态截图已自行查看；全部3/浏览器1/桌面2/AI0；切换与箭头有效、pageerror0、页面无横溢出。卡宽高比约0.75。截图前实际滚到底再回顶部触发懒加载，不用未加载状态作为结果。
证据E:/L-One知识库/codex/visualizations/2026/10/01/site-v2/store-correction/；本次只改Store HTML/CSS/JS及直接交接，静态审计、git diff --check通过。真实设备与生产未验证，未发布。

## 2026-10-01 Works用户纠正
导航在所有项目主题与页面同底色，导航底部无分割线。四标题/详情标题加载用户指定滑油字TC原字形子集；删除本轮已不再引用的MiSans子集，许可记录改为当前来源。公开再分发许可仍未核验，未发布。
参考图按低存在感无横线目录适配：封面外左侧四组目录对齐四标题顶部，预览完整4/17/2/6真实作品名称；小字视频/Film与数量来自真实视频索引，未编造贡献或disciplines。为不重叠，标题行高度同步目录实际高度；原选中伸长/相邻压缩与过渡保留。手机也是封面左侧目录，正文完整但小字阅读体验待用户审查。
四视口1440×900/1920×1080/834×1112/390×844，100%/DPR1截图自审，导航同色无分割线、目录顶端对齐、无页面横溢出、无pageerror；目录点击对应作品已局部验证。只改Works专用CSS/JS/字体及直接交接，没有重测未改编码或其他页面。证据外部work-correction目录。

## 2026-10-01 Works目录联动纠正（替代上一次全部目录展示）
只显示当前项目目录，切换标题同步替换目录及封面；目录右对齐，距封面容器左边10–18px，对齐选中标题顶端。四标题行框间距固定桌面/平板24px、手机16px，长目录通过增大选中标题scaleY与行高度容纳，消除未选中长目录对标题间距的影响。使用字体实际小数行高而非整数offsetHeight，避免拉伸放大取整误差。
1440×900/834×1112/390×844各四项目状态实测：只一组目录，4/17/2/6项目数量对应，右对齐，目录顶端与标题一致，三个间距差异<0.05px（浏览器子像素舍入），无横溢出/pageerror；点击当前目录进入商业作品对应第二条正确。外部证据work-linked/checks.json与同视口截图已自审。只修改Works专用JS/CSS及交接；原字体/作品/视频/其他页面保留；静态审计与diff检查通过，仍未发布。

## 2026-10-01 About二维新资产替换（用户最新决定）
先建立新资产组合预览，再替换实际About。新增原创SVG极简平面展墙/浅灰底/透明细线框；无写实纹理、木地板、聚光灯和厚框，装饰灰阶小幅过渡。撤销先前资料A01/A02视觉结论；移除本轮不再被网页引用的旧WebP/框SVG/蒙版共5文件；原始ZIP素材与原视频/照片/工具资产只读保留。当前唯一运行资产在assets/about-v42/gallery；设计预览引用同一文件，不维护重复资产。
寒冷露台恢复原020照片铺底，原标题/身份文字居中叠放，新增35%深色透明遮罩保证阅读；人物视频仍contain，框内完全透明，无新增裁头。兴趣区厚边框10px→1px灰线，无纹理/硬黑影。
1440×900/834×1112/390×844，100%/DPR1：原timeline初始/中段/末段与tools/slogan/露台/future/contact截图自审；SVG竖屏横带已修正为仅装饰图伸展，原视频比例不变。无横溢出或pageerror；真实timeline滚动逻辑/文字数据/源媒体字节未改。完整连续动态观感与实体设备仍未验证，未发布。证据外部about-correction目录；组合预览_upgrade_audit/06_about_assets/index.html。

## About 截图修正（2026-10-01）
16项封面完整循环，移除014/015不同比例展示，原文件保留。取消三行图文视口最小高度，保留40px行间距。FUTURE纯色#efefef且卡片同底色。其他区域未改。已查看1440×900、834×1112、390×844截图，无溢出或新增页面错误，site-audit通过。完整动态循环接缝与首页嵌入状态未核实；未发布。

## Works比例与About显示器场景（2026-10-01）
Works概览标题组与封面组件同高，目录同比放大、移除底部空白。1879×919四分类测量高度775px（误差<0.02px）；窄视口为避免标题横向溢出限制横向放大，保留联动纵向变形。详情播放器未改。
About使用image_gen生成黑白灰二维插画显示器空间，保留原4:3视频/文字/滚动；场景装饰按面板比例适配。第二板块暗底白字，滚动贴图容器透明，其他内容区白底，寒冷露台保留。FUTURE白色直角无边框柔和阴影卡片。旧候选SVG三件删除，原素材保留。
已打开查看1879×919、834×1112、390×844的Works/首页嵌入About截图，无横向溢出；site-audit通过。完整timeline动态过程尚未本轮重新复核，不能写动态验收通过。未提交、未发布。

### Timeline 局部修正：无厚度、铺满首屏
仅修改gallery.css与monitor-room.webp。image_gen局部撤销右侧透视厚度，装饰场景覆盖导航下首屏；原视频contain与4:3文字覆盖保留。1879×919、834×1112、390×844截图复核两段滚动状态，无横向溢出。装饰边缘允许裁切，视频完整显示。未发布。

### Works 目录单行修正
删除四分类概览目录的“视频 / FILM · 数量”。名称nowrap并按最长名称适配目录字号，右对齐且不截断。仅works.js/css修改。887×744（用户截图尺寸）、1440×900、390×844四分类截图检查，共12状态；没有说明行、名称没有换行或超出列宽，无横向溢出。site-audit通过，未发布。

Works目录字号统一：每个视口预先计算四分类最小字号，全部目录采用同一个值，切换分类字号不再变化。887×744、1440×900、390×844各四分类截图复核，保持单行完整右对齐。未发布。

### 全站导航与Store尺寸（2026-10-01）
共享site-chrome.css统一移除导航底线、采用页面底色与高反差文字；Materials只修改导航样式；Library只修改导航底色/白字。About gallery.js向同源父页面传递当前板块深浅色，父导航同步，校验消息来源。Store分类间距28→42px、手机12→18px，选中黑底白字同Materials，3:4卡片宽高缩至原70%（桌面308×410.66px），内部尺寸相应收紧。
1879、834、390三个宽度检查Store/Materials/Library/About截图，导航底线0px，无页面横向溢出；About白色statement/FUTURE与暗色NOW滚动导航切换另行验证。只核查本轮导航与Store区域，未重新验收其余动态交互。site-audit通过；未发布。
