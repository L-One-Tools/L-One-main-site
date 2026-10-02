# STORE｜页面执行卡

## 页面定位

STORE 从工具目录升级为“快速理解工具 + 横向浏览 + 进入详情”的产品展示页。
视觉结构参考 `03_ASSETS/references/store/STORE_REF_01` 与 `STORE_REF_02`。

页面由四个连续区块组成。

## SECTION 01｜分类与浏览控制

顶部设置三个分类：
- 浏览器插件
- 桌面工具
- AI Skills

分类右侧设置左右箭头。
箭头控制下方工具卡片单排横向移动。
分类切换更新当前工具集合。

## SECTION 02｜大型工具卡片单排 Carousel

工具采用单排横向排列。
1440×900 视口同时看到当前完整卡片与相邻卡片的一部分，让用户清楚感知横向浏览方向。

每张卡片包含：
- 最新版透明磨砂工具图标
- 工具名称
- 一句话功能简介
- 工具宣传主图

宣传主图优先使用：
1. 工具真实界面截图
2. 工具功能演示画面
3. 与真实使用场景对应的产品视觉图

整张卡片点击进入对应工具详情页。

## SECTION 03｜品牌 Slogan

大卡片之后进入品牌文字区：

`将经验沉淀成资产`
`拥有的任何经验都将回报价值`

这组文字与 ABOUT 使用同一套文本内容和视觉体系，形成跨页面品牌关联。

## SECTION 04｜工具图标滚动带

Slogan 下方复用 ABOUT 的 `ToolIconMarquee`。

规则：
- 所有工具最新版透明磨砂图标横向排列
- 从右向左缓慢连续滚动
- 每个图标可点击进入对应工具详情页
- 组件与 ABOUT 共用数据源、图标资产与交互逻辑

## 工具统一数据模型

建立 `tools.json` / 当前框架等价数据源，至少包含：
- id
- slug
- name
- category: browser | desktop | ai-skill
- one_line_summary
- icon
- hero_visual
- platform
- status
- detail_route
- display_order

分类、大卡片、底部滚动图标统一读取该数据源。

## 卡片宣传资产制作

每个工具建立 1 张主宣传视觉。
输出建议：1600×1000 WebP，sRGB。
主体位于安全区内，适配卡片裁切。
工具真实界面保持可辨识。
视觉风格与工具最新版磨砂图标保持统一。

## 单屏完整度

Store 顶部分类与第一排卡片共同进入主要可视区域。
卡片高度、宽度和间距以 1440×900 的完整浏览体验为基准。
Slogan 与 ToolIconMarquee 形成第二段清晰区块。

## 验收

- 三分类切换正确
- 左右箭头控制单排卡片
- 鼠标与触控横向浏览顺畅
- 每张卡片包含图标、名称、一句话简介和主宣传图
- 所有卡片路由正确
- Slogan 与 ABOUT 内容一致
- ToolIconMarquee 与 ABOUT 读取同一数据源
- 全部工具图标为最新版透明背景资产
- 1440×900 / 1920×1080 / 390×844 截图
- Console error = 0


## 本轮比较约定与 Intent Lock
模式：Adaptation。来源：2026-10-01 V2 ZIP 对应 PAGE_SPEC；优先级服从本轮用户决定。
固定视口：1440×900、1920×1080、834×1112、390×844；DPR=1；缩放100%。
截图状态必须记录 route、scroll、selected、player time 和 hover。参考图尺寸不同，仅诊断构图；基线同视口同状态才可比较。

| Field | Locked intent | Evidence | Confidence | Implementation consequence | P0 blocker? |
|---|---|---|---|---|---|
| composition | 对应本页 PAGE_SPEC 的布局 | 本资料包页面执行卡 | high | 先检查整体构图再局部调整 | no |
| visual focus | 真实内容、作品或工具主视觉优先 | 页面执行卡 | high | 不用生成场景替代功能证据 | no |
| spatial/depth hierarchy | 页面各自层次；重要文字完整 | 用户硬约束与页面执行卡 | high | 全画幅与文字安全区 | no |
| material and light | HOME保留；WORK双主题；ABOUT A01/A02；STORE参考布局 | 页面执行卡与批准资产 | high | DOM与真实资产结合 | no |
| typography | 展示标题按语义分行；WORK从本地选字体 | 中央规范与页面执行卡 | high | 字体核对和真实小屏检查 | no |
| color | 各页独立computed颜色登记 | 总指令 | high | 按状态写COLOR_REGISTER | no |
| critical assets | 官方图标、真实视频、批准A01/A02 | 本轮指定目录与资料包 | high | 原件不覆盖，引用登记 | no |
| critical interaction | 每页指定交互与导航基线 | 页面执行卡 | high | 相关状态单独截图与操作 | no |

渲染路线：现有静态HTML/CSS/JS；HOME保留Canvas交互，WORK原生video与DOM控制层，ABOUT实时SVG/视频与画框，STORE原生横向滚动与共享DOM组件。
交互：hover/focus/selected/pressed/loading/error按现有控制实现；禁用下载沿用Catalog真实状态；prefers-reduced-motion停止非必要运动。
恢复边界：缺少正式路由的工具不编造详情；cloud_video_url未核实前保持null；云端部署另需本轮明确授权。
验收：P0构图/人物或文字裁切必须整改；P1字体/加载/交互当页修复；P2局部细节登记处置。动态验收需要真实操作记录。


## 最终本地复核
四视口100%缩放，截图与状态记录见05_final/FINAL_REPORT.md。实际操作证据分模块保存；真实设备和正式域名动态观感未验证。WORK云端媒体未接入，ChatGPT访问未修复，不列为已通过。

## 2026-10-01 Store用户纠正
移除工具标题及资料更新时间；全部/浏览器插件/桌面工具/AI Skills居中，与右侧左右箭头组成整体；默认全部。四分类键盘循环按实际数量计算，目录状态/下载事实未改。
Store页面与顶部导航同白底，下方Slogan保留原文但去墙面贴图。卡片为3:4竖卡，宣传图直接使用现有原件，去掉带米灰色补边的展示副本引用，contain保留完整画面。OneBar底色#e6d4c3取原电脑屏幕70%横向/40%纵向像素；File To Text取界面#5f666d；网页拓印#fff8f5取原图背景。照片/真实UI自身色彩保留，未重绘素材。深色卡白字保证阅读，资源入口排除3:4比例。
1440×900、834×1112、390×844，DPR1/100%：整页和左右箭头状态截图已自行查看；全部3/浏览器1/桌面2/AI0；切换与箭头有效、pageerror0、页面无横溢出。卡宽高比约0.75。截图前实际滚到底再回顶部触发懒加载，不用未加载状态作为结果。
证据E:/L-One知识库/codex/visualizations/2026/10/01/site-v2/store-correction/；本次只改Store HTML/CSS/JS及直接交接，静态审计、git diff --check通过。真实设备与生产未验证，未发布。
