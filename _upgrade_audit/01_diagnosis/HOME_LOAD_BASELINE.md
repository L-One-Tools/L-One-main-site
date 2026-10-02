# HOME 同环境性能记录
环境：本地静态候选，Edge headless，DPR=1。Desktop1440×900；Mobile390×844，CPU4倍节流、200KB/s下载、80ms延迟。前后各3次；等待load上限120秒。DNS/TLS为本地HTTP，不能推论线上DNS或TLS。
基线存在隐藏About iframe eager请求和旧时间线空元素异常。移动端6轮Load均未在120秒内完成，记未完成，不将0作为成功耗时。
| 阶段 | 设备 | 缓存 | FCP中位ms | LCP中位ms | Load中位ms | 超时次数 | JS错误次数 |
|---|---|---|---|---|---|---|---|
|baseline|desktop|cold|116.0|116.0|252.1|0|3|
|baseline|desktop|warm|88.0|88.0|103.4|0|3|
|baseline|mobile|cold|11952.0|12220.0|未完成|3|3|
|baseline|mobile|warm|504.0|736.0|未完成|3|3|
|after-home|desktop|cold|76.0|76.0|49.0|0|0|
|after-home|desktop|warm|56.0|56.0|23.3|0|0|
|after-home|mobile|cold|1524.0|1724.0|8050.0|0|0|
|after-home|mobile|warm|96.0|128.0|110.8|0|0|

基线及复测waterfall和resource字节：证据目录对应home-performance.json；首屏filmstrip包含在trace的devtools screenshot事件中。两个15秒trace均已保存。
P0：中心搜索结构已移除；背景概念与pointer方向保留。P1：截图发现黑色Logo在暗背景上对比不足，增加44px浅底承托后做针对截图检查；不重跑不受影响的性能环节。
视觉比较：同视口、同路由、指针静止；随机烟雾不可逐像素比较。截图用于构图检查，不证明所有真实设备GPU表现。