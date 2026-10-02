# About新资产设计阶段

模式：适配；本轮用户撤销先前写实画廊结论。对比1440×900/834×1112/390×844，100%/DPR1；新资产组合预览不等于真实About动态验收。

|Intent Lock|依据与置信度|设计后果|
|---|---|---|
|构图|用户指定现有布局，high|中间保留4:3原视频完整净空|
|视觉焦点|timeline原场景，high|周边装饰低对比，不增加图文|
|层级|用户二维极简线条，high|平面展墙边界；无真实透视环境|
|材质/光|用户撤销写实风格，high|无纹理/木纹/光斑/投影；只有轻微垂直灰阶|
|文字|原SVG及露台原文，high|实际About原文字保留；此处不复刻时间线SVG文案|
|色彩|用户黑白灰，high|灰阶#f5f5f5至#e5e5e5，框线#888/#c5c5c5|
|关键资产|原视频/原屋顶照片，high|新增原生SVG环境/薄框，不更改事实素材|
|交互|原timeline滚动，high|实际页面未修改；预览滑杆只审查各原画面与新环境的风格关系|

渲染：原生SVG，适合二维线条、轻渐变和透明内窗；可精确控制留白/色彩，不依赖位图纹理。环境与薄框是本轮新设计，不是原视频/工具UI的模拟替代。
交互：此阶段仅滑杆查看原视频帧。生产原滚动/文字/按钮/导航冻结，不触碰其他页面。露台预览恢复照片铺底与文字居中，不能当作实际页面修复证据。
恢复边界：取消About中A01/A02、写实框、未来兴趣厚框背景；新环境仅timeline，新浅灰底覆盖NOW/statement/FUTURE/CONTACT；屋顶照片独立恢复背景。旧资产尚未删除，因为正在展示的About仍引用它们；正式替换时检查直接依赖后清除不再使用的本轮资产，保留原件。
P0：写实/二维冲突以新SVG方案处理；不得裁切原timeline；实际组合与滚动验收待页面实施。P1：露台居中文字与遮罩、三端布局以设计预览检查；P2：细线亮度待用户观感。
下一步：完成新资产预览自审，依本轮设计替换实际About时再做对应滚动阶段截图；未部署。


## Protocol fields and implementation evidence
Mode: Adaptation. Comparison contract: viewport/DPR1/100% and original source media states; reference screenshot lacks its viewport and state, so screenshot comparison is diagnostic only, not matched acceptance.
Intent Lock: composition / visual focus / spatial and depth hierarchy / material and light / typography / color / critical assets / critical interaction as recorded in the table. Evidence and confidence are high for user constraints, medium for chosen line density.
Rendering route: SVG decoration plus unchanged source video and original live text. Restoration boundary: original source media, timeline renderer and other pages untouched; production authorization absent.
P0 resolved locally: remove realistic gallery and preserve full person frame. P1 rework completed: responsive SVG band removed; centered roof copy and thin gray interest borders. P2: low-contrast decorative lines are intentional; real-device continuous review remains unverified.
Actual local About is now updated; earlier design-stage statements above describe the first step, not current implementation status. Same viewport screenshots are in external about-correction; no dynamic-motion pass claimed.
