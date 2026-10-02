# ABOUT 候选复核

A01/A02来自本轮批准文件，压缩WebP未裁图。时间线overlay/mask采用原4:3全窗口；前景画框SVG原生矢量构建并渲染alpha WebP，内窗alpha=0，范围0..255。桌面画框上移并缩小避免落到地板上。

- 首轮P1：手机导航溢出固定栏→复用site-chrome五入口；嵌套文档外层高度修正；删除额外搜索框，导航与Works同结构。
- 首轮P1：手机/平板画芯缩放后小字难读→同步文字由原SVG读取，不新增人物或贡献事实。
- A01用于NOW、三行资产表达和CONTACT；A02用于时间线、雾屋顶照片陈列、FUTURE。原照片完整置入画框，原文字与CSS定义的阅读顺序保留。
- 四个兴趣标题及正文完整，桌面四幅/平板两列/手机单列。未改二维码、联系方式和原照片内容。
- 旧.pass动画已失去DOM，删除其唯一报错的废弃renderer，原实时timeline renderer保留。
- 窄屏未请求的offscreen lazy工具图标保持懒加载，不作为图片错误；可视工具在独立四背景图中全部加载。
- 真实滚轮24次，视频time从0.452至12秒附近，SVG阶段同步；hover暂停=paused；二维码打开并成功加载524px原图，关闭有效；pageerror=0。

截图实际视口：1440×900、1920×1080、834×1112、390×844；DPR1/100%。about-reviewed/checks.json记录每个状态的scroll与video time，文件里的阶段名仅索引，阶段实际值以JSON和截图文字为准。
录屏motion.json / webm及2fps抽帧已查看；这证明操作与采样帧，不能替代最终真实设备逐帧肉眼播放复核。候选仍待用户浏览器审查。
A01去除repeat接缝后的局部截图列入最终回归，不重复复测未改动的timeline。

最终A01去repeat接缝、正文对比与原封面contain已在四视口局部截图复查，final-reviewed/about-tools、slogan、roof、future。原timeline操作未因这些静态调整重复。
