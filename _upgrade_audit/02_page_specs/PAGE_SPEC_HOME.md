# HOME｜页面执行卡

## 页面目标

首页成为全站最快进入稳定可用状态的入口，同时保持现有背景跟随鼠标的交互语言。

## 品牌标识

- 顶部现有 L1 文字替换为全站统一的 L-One 图标。
- 图标使用与其他页面左侧品牌标识完全一致的资产、尺寸逻辑与交互状态。

## 首页中心

- 从页面结构中移除中心搜索框。
- 中心区域呈现纯净主视觉，让背景、品牌与核心内容成为首屏主体。

## 首屏加载

先完成性能诊断，再根据证据调整资源优先级。
重点实现：
- HTML、关键 CSS 与首屏背景优先到达。
- 首屏背景、标题和主要视觉尽早形成稳定完整画面。
- 鼠标交互脚本在首屏视觉稳定后迅速进入响应状态。
- 移动端采用与实际视口匹配的资源尺寸和计算量。
- 非首屏资源进入延后加载序列。

## 鼠标交互

现有鼠标位置驱动背景移动的视觉概念、移动方向、响应关系与整体气质保持基线。
技术实现以稳定帧率为目标：
- pointer 输入在 animation frame 节奏内统一更新。
- 位移优先进入 transform / compositor 路径。
- 可视区域承担实时计算。
- 重复计算合并为单次帧更新。

## 验收证据

- 1440×900 首屏前后截图
- 390×844 首屏前后截图
- 冷加载 3 次中位数
- 常规缓存 3 次中位数
- 鼠标静止 / 连续移动各 15 秒 Performance Trace
- 首屏 Network waterfall
- 首屏 filmstrip
- Console error = 0
- 关键资源请求状态完整


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
