# L-One About v4.2 本地候选评审

## 任务与边界

- 任务：`A-20260920-01`。
- 模式：定向适配；在用户指定的单文件页面上保留原有体验，仅执行本轮截图明确指定的文字、层级、顺序和作品集入口调整。
- 基线：`34f2ff2e5b19804ecf45bae3ac3996e0f8834eca`；本地分支 `work/A-20260920-01-about-v42-replacement`。
- 页面来源：`C:\Users\Administrator\Downloads\L-One-Homepage-v4.2-FIXED-SINGLE.html`；原始 SHA-256 `9277553AA4ACE98303BAB4D9D0F2D0D5918A592E8CB8F6626CC4FFE99B6BA735`。本地候选副本含用户授权的透明品牌标记、独立作品集入口及按压动效，以及本轮截图指定的 NOW 与资产表达调整；候选 SHA-256 `2CC161D11F11510C78F6D8C31A42880ABDB2DCAD33570EB092401F3F6E73EEED`。
- 页面边界：About 激活时隐藏主站外层页头，并显示来源页自身页头；离开 About 时主站页头恢复。其他路由、远端和云端不改动。

## Intent Lock

| 项目 | 锁定内容 | 验收方式 |
| --- | --- | --- |
| 比较对象 | 用户提供的 FIXED-SINGLE 与主站 `/#about` 内的同一文件；About 壳层不重绘源页。 | 1440×900 与 390×844 本地截图回读。 |
| 叙事与构图 | 保留时间线、NOW、资产表达、雾景、FUTURE、CONTACT 的主叙事；资产表达的视觉顺序调整为“参考 → 素材库 → 经验资产”。 | CSS 网格顺序与本地截图回读。 |
| 焦点与层级 | 4:3 时间线视频、SVG 贴墙文字、编号章节和源页排版。 | 源文件原样运行。 |
| 空间与深度 | 源页视频、SVG、雾景与滚动行为均由其原脚本执行。 | 源文件原样运行。 |
| 字体与排版 | NOW 栏目标保持字号并加粗；主观点字号增加 30% 并加粗；删除其右侧说明。所有重要标题禁止浏览器自动换行：桌面端保持单行，空间不足时调整字号或模块宽度；手机端必须由人工设定语义分行。作品集键盘按钮缩至原候选的 70%，并贴近作品滚动条。 | DOM/CSS 检查与本地截图回读。 |
| 色彩与材质 | 采用源页内嵌 CSS 和资源。 | 源文件原样运行。 |
| 资产与出处 | 源文件含 86 个 data URI 图像/视频资源；透明品牌标记复用主站既有 `assets/brand/l1-site-mark-3d-transparent-v1.png`。新增按钮以用户提供的 `portfolio-button/base.png`（底托）和 `portfolio-button/keycap.png`（键帽）分层；`reference.png` 只作完整形态核对。 | 原始/候选 SHA-256、资源 HTTP 200。 |
| 交互与状态 | 源页自身的时间线、菜单、二维码和外链脚本保持原样；新增按钮在指针按下时键帽下移、释放时回弹，185ms 后从顶层窗口跳转独立作品集入口。启用“减少动态效果”时不执行位移动画并立即跳转。 | 资源、脚本和目标页检查。 |

## 渲染与恢复边界

- 渲染路线：用户提供的原始 HTML/CSS/JavaScript 和内嵌资源在隔离 iframe 中原样执行；不使用重绘、替代素材或 AI 生成素材。
- 文字及结构边界：本轮仅删除 NOW 右侧说明；将资产主文案改为“将经验沉淀成资产 / 拥有的任何经验都将回报价值”，删除其英文栏目小字；不渲染截图中的标注框、箭头或批注文字。
- 可恢复边界：仅替换 `#page-about` 可见内容；About 激活时切换外层页头可见性，其他哈希路由、部署配置和远端完全不触及。
- 来源的公开联系字段（微信、电话、小红书）原样仅在本地候选呈现，正式发布前必须由 L-One 最终确认。

## 优先级与待验收项

- P0：不得以手写 About 替换源页；本轮截图指定的 NOW、资产表达及作品集入口调整必须准确呈现，且批注不得进入页面。
- P1：About 激活时不得出现主站与源页双页头；离开 About 后主站页头必须恢复。
- P2：iframe 内滚动由源页处理；正式发布前仍需在目标设备实际滚动复核。

## 本地预览

本地候选：`http://127.0.0.1:4174/#about`。

截图：

- `E:\L-One知识库\codex\visualizations\2026\09\20\01a0bc4b-b30e-72d2-9a87-883c734c65b5\about-v42-source-integrated-desktop.png`
- `E:\L-One知识库\codex\visualizations\2026\09\20\01a0bc4b-b30e-72d2-9a87-883c734c65b5\about-v42-source-integrated-mobile.png`

已完成的本地检查：原始与候选 SHA-256 已记录；嵌入源页、品牌标记、作品集入口及两个按钮分层素材均为 HTTP 200；三个源页脚本解析通过；`node scripts/site-audit.js` 与 `git diff --check` 通过。截图复核以源页可控的时间线首屏为诊断用途；本轮指定的 NOW 与资产表达状态尚待 L-One 在本地预览中最终视觉确认。该预览不是云端部署或公开发布。

## 2026-09-21 白灰材质与时间线视频承托

### Mode and comparison contract

- Mode：adaptation。目标是本地 `/#about` 候选中的 v4.2 时间线首屏和白色内容区；不重构时间线、排版、文案或导航。
- 参考：L-One 提供的全页视觉参考与 `ChatGPT_Image_2026年9月21日_08_32_19.png` 白灰材质底图；现有 v4.2 页面与内嵌 4:3 视频为实际内容状态。
- 目标视口：桌面 `1440×900`、平板 `834×1112`、手机 `390×844`；时间线首屏、初始滚动状态。

### Intent Lock

| Field | Locked intent | Evidence | Confidence | Implementation consequence | P0 blocker? |
| --- | --- | --- | --- | --- | --- |
| composition | preserve：保持 4:3 时间线的居中构图，只在宽屏以保守比例扩大视觉画幅；不把视频改为 cover。 | 用户明确要求保留人物头部、顶部文字和关键画面。 | high | 宽屏仅缩放画布约 1.06，窄屏不缩放。 | yes |
| visual focus | preserve：人物、年份与时间线 SVG 仍是首屏焦点，边缘只承担过渡。 | 现有页面与用户参考。 | high | 边缘渐隐层不放置新文字或装饰主体。 | yes |
| spatial/depth hierarchy | translate：视频、SVG、渐隐层、白灰底材保持前后层次。 | 现有 z-index 结构；用户要求边缘与背景过渡。 | high | 使用画布伪元素渐隐，不新增第二个视频。 | yes |
| material and light | translate：白灰、低对比、轻雾化的连续环境；3D 工具标记与键帽以轻微接触阴影融入。 | 用户提供底图与书面说明。 | high | 采用用户原图 + CSS 低幅度明度/饱和度调整。 | no |
| typography | preserve：不改任何公开文字、字号、人工分行或标题规则。 | 当前页面与 L-One 公共表达规范。 | high | 不触碰文本 DOM。 | yes |
| color | translate：以底图的白灰为底色，视频取色只低频、低幅度参与两侧过渡。 | 用户说明；提供的底图。 | medium | Canvas 取样以白灰基色混合并做平滑处理。 | no |
| critical assets | preserve：内嵌 v4.2 视频、现有工具图标与分层键帽；新增用户提供的 `ambient/gray-white-material-20260921.png`。 | 现有页面；用户提供文件 SHA-256 `A500F68DABD9FB3754533069270877CD4B40F2D7ACC6BAC19E0E6574C492408E`。 | high | 不替换视频、不生成替代素材。 | yes |
| critical interaction | preserve：滚动驱动视频、菜单、二维码及键帽按压逻辑；减少动态效果时停用非必要边缘取样。 | 现有脚本；用户仅要求视觉融合。 | high | 不增加业务交互或改变跳转。 | no |

### Rendering route

- Rendering route：CSS/DOM + 用户提供的 raster texture + 低频 Canvas 2D 取样。CSS 负责响应式底材、渐隐、阴影和安全缩放；Canvas 只读取现有视频的低分辨率边缘平均色。
- Rejected alternatives：拒绝 `object-fit: cover`（会裁切人物和文字）、第二个模糊视频（违反本轮边缘融合边界）、WebGL（不必要的性能与维护复杂度）、全局滤镜模糊（会损害人物与文字清晰度）。

### Interaction plan

- Hover、pressed、focus、menu、二维码和作品集按键维持原有实现；本轮不增加状态。
- 动态边缘色每约 1.1 秒更新一次并平滑混入白灰基色；`prefers-reduced-motion` 下保留静态底材和渐隐，不启动计时取样。
- 若浏览器阻止视频 Canvas 读取，捕获异常并保留静态白灰渐隐，不影响时间线、链接或滚动。

### Restoration boundary

- 不改视频内容、时长、人物、SVG 时间线、所有公开文案、页面结构、作品集页面、云端或部署配置。
- 背景纹理仅用于本地候选，来源为 L-One 明确提供的 PNG；未获得其他外部素材或 AI 生成素材的授权。

### Screenshot validity

- `matched`：候选页面与验收视口、时间线内容和首屏状态。
- `mismatched`：用户提供的长图是视觉方向参考，并非当前 4:3 视频的同帧截图；因此只作 diagnostic comparison，不对逐像素相似度作结论。

### Priorities and disposition

- P0：视频人物、顶部文字与时间线内容不得被新缩放或渐隐裁切；如截图出现裁切即 rework。
- P1：底材与 3D 工具/键帽的综合色温、亮度和接触阴影在三端保持克制；本轮 fix-now。
- P2：动态取样在不支持读取时回退为静态渐隐；accept，原因是视觉层完整且不牺牲主交互。

## 2026-09-21 材质对比度与 UI 角度统一

### Mode and comparison contract

- Mode：adaptation。仍只调整 About 本地候选的环境底材和视觉组件边缘；参考状态是 L-One 对上一版本地预览的直接反馈。
- 比较对象：相同的 About 内容、时间线首屏和白色内容区；桌面 `1440×900`、平板 `834×1112`、手机 `390×844`。

### Intent Lock

| Field | Locked intent | Evidence | Confidence | Implementation consequence | P0 blocker? |
| --- | --- | --- | --- | --- | --- |
| composition | preserve：视频与内容模块的位置、尺寸和顺序不变。 | L-One 未要求重排。 | high | 只覆盖背景与圆角规则。 | yes |
| visual focus | preserve：视频人物、年份和文字仍清晰；材质必须足够可见，但不抢主体。 | L-One 反馈当前背景变化不可见。 | high | 加深灰阶承托而不改视频或文案。 | yes |
| spatial/depth hierarchy | translate：大画面保持直角，矩形窗口和 UI 采用直角或最多 2px 过渡。 | L-One 明确指出视频直角与大圆角 UI 不统一。 | high | 统一可由 CSS 控制的矩形组件为 2px 以内。 | yes |
| material and light | translate：白灰底图从“近白”调整为可辨识的中性灰雾材质。 | L-One 直接反馈。 | high | 提高底材对比度与混合强度。 | yes |
| typography | preserve：不改文字、字号、人工分行或可读性。 | L-One 未授权文案调整；公共表达规范。 | high | 不改文本规则。 | yes |
| color | translate：背景为偏冷的白灰，保持前景黑字可读。 | L-One 提供底图并要求更暗。 | high | 使用灰蓝低饱和叠层，不引入彩色强调。 | no |
| critical assets | preserve：视频、现有素材和键帽原图不重绘。 | 既有资源与用户授权边界。 | high | 仅使用 CSS 外壳调整；键帽自身的真实倒角不伪造成平面直角。 | no |
| critical interaction | preserve：滚动、按键、链接、菜单与二维码状态不变。 | L-One 只要求视觉统一。 | high | 不触碰交互脚本。 | no |

### Rendering route and restoration boundary

- Rendering route：仅追加 CSS；不需要新的图像、Canvas 或 WebGL。
- Restoration boundary：CSS 无法改变用户提供的 3D 键帽原图中真实的实体倒角，因此该倒角保留；所有可控的窗口、图标容器、截图和二维码边框统一为直角或 `2px`。不改视频、文案、结构和交互。

### Screenshot validity and priorities

- Screenshot validity：matched 视口和内容；本轮依据 L-One 对候选版的直接反馈复核，仍为 diagnostic visual review，不替代 L-One 最终验收。
- P0 finding：上版的底材可见度不足、圆角语言不统一；rework，当前轮 fix-now。
- P1：内嵌图片自身无法由 CSS 消除的原始像素倒角，accept，原因是保留用户提供的真实键帽材质；如需完全直角，需要 L-One 提供或批准重制的按键原图。
- P2：圆形阴影、角色投影和功能性圆点不按矩形规则硬改；accept，原因是它们不是窗口边缘。

## 2026-09-23 NOW 工具标识透明化与作品滚动条

### Mode and comparison contract

- Mode：adaptation。目标是 About v4.2 NOW 区，桌面参考为 L-One 提供的两张滚动状态截图；内容、标题、轨道方向和键帽材料均为既有实现。
- 目标视口：桌面 `1440×900`、平板 `834×1112`、手机 `390×844`；上排工具标识、观点标题、下排作品轨道、作品集入口及悬停状态。

### Intent Lock

| Field | Locked intent | Evidence | Confidence | Implementation consequence | P0 blocker? |
| --- | --- | --- | --- | --- | --- |
| composition | translate：观点标题仍位于两条滚动轨道之间；作品集键帽改置于标题下方、下排轨道上方。 | L-One 本轮书面说明与截图。 | high | 仅移动现有入口节点，不改变标题或两个轨道的方向。 | yes |
| visual focus | preserve：工具标识仍是上排焦点，观点标题仍是 NOW 的文字焦点。 | 用户截图。 | high | 不改变工具名称、标题、字号或人工分行。 | yes |
| spatial/depth hierarchy | translate：下排卡片放大 15%；悬停卡片增加 8%，相邻卡片同步让位。 | 用户明确数值。 | high | 固定卡间距，使用同级元素反向/正向位移保障悬停间距。 | no |
| material and light | translate：移除图标外部白色方底，保留 3D 键帽的高光、阴影、纹理及实体边缘。 | 用户反馈“白色图片与网页背景割裂”。 | high | 使用透明 PNG 副本；不以 CSS 白色遮罩替代。 | yes |
| typography | preserve：所有现有公开文字、标题单行规则与说明文字不改。 | L-One 公共表达规范；既有批准内容。 | high | 不改文本 DOM。 | yes |
| color | preserve：继续使用白灰、低饱和色调；透明图标通过现有底材融合。 | 两张用户截图。 | high | 不增加彩色底框或强调色。 | no |
| critical assets | preserve/translate：四张原工具键帽保持原始设计，新增仅外部背景透明化的副本。 | 原图 `003`—`006`；用户请求。 | medium | 原始文件不覆盖；透明副本使用 RGBA/Alpha。 | yes |
| critical interaction | translate：下排卡片 hover 时放大并带动邻卡让位；原滚动、作品集按键 pressed/focus 与跳转保留。 | 用户说明；既有按键行为。 | high | CSS hover/focus 与 `prefers-reduced-motion` 回退；不新增业务逻辑。 | no |

### Rendering route and interaction plan

- Rendering route：透明 PNG 资产 + CSS/DOM。透明资产解决真实白底问题；CSS 负责保持 16px 卡距、卡片放大与邻卡避让。拒绝 CSS `mix-blend-mode` 假透明（不能移除白方底）和重绘工具标识（会损失真实素材保真度）。
- 下排轨道卡片宽度从 `225px` 调整为 `259px`；动画周期从 `90s` 调整为 `103.5s`，以维持近似相同的像素滚动速度。悬停或键盘焦点状态下目标卡片缩放至 `1.08`，前后相邻项分别向外偏移半个新增宽度。
- `prefers-reduced-motion` 下停止轨道动画与放大/位移动画，保留卡片、标题、入口和跳转。

### Restoration boundary, screenshot validity and priorities

- Restoration boundary：透明化仅抠除工具键帽外部背景；字形、键帽、阴影、纹理、工具封面、时间线、作品集内容及所有公开文案保持不变。AI 透明化的原始输入与输出须以文件清单及 Alpha 校验记录可追溯。
- Screenshot validity：用户截图与候选页面的 NOW 内容匹配；滚动时刻和精确视口未知，因此对最终截图作 diagnostic review，不作逐像素结论。
- P0：白色方底与页面背景割裂；fix-now。P1：卡片尺寸、均匀间距、等速滚动、键帽上下间距；fix-now。P2：悬停阴影与小屏降级；fix-now，并由三端截图复核。
## 2026-09-23 NOW 六工具、纵向压缩与滚动调整（A-20260923-03）

### Intent Lock

- 模式：在已批准 About v4.2 的本地候选上做组件数量、留白和运动调整；不部署。
- 已观察：当前桌面视口只露出 NOW 的四个工具；下排作品条带有不属于作品封面的浅灰底；左上品牌标记在滚动中持续压住页面。
- 已提供：Wave 工具图已为透明 RGBA；One BAR 工具图带外部白底，必须仅抠除该外部背景。两图均为 `1254×1254`。
- 推断且锁定：保持工具卡片与下排作品卡片的视觉尺寸；通过收紧 NOW 内的纵向留白，使首屏同时露出下排作品；不缩放作品卡片。
- 渲染路径：Wave 直接采用提供的 Alpha 源图；One BAR 生成透明 PNG 副本。两个新图和先前四图一起按 6 个不同工具、完整重复两次的无缝跑马灯渲染；图标显示原有色彩和真实 Alpha；下排作品条背景透明以连续显示 NOW 页面底材。禁止用白底、混合模式或 CSS 近似替代透明图。
- 数值：上排滚动周期由 `90s` 变为 `128.571s`，下排由 `103.5s` 变为 `147.857s`；两者的速度均为当前的 70%（降低 30%）。下排作品卡片尺寸/间距不变；下排至 statement 的底部留白由 `28px` 增至 `56px`。品牌仅在 `scrollY > 20` 时淡出，菜单保持可见与可用。
- 无障碍：保留所有工具图 `alt` 和文字图注；滚动品牌淡出不影响菜单；`prefers-reduced-motion` 下停止跑马灯。
