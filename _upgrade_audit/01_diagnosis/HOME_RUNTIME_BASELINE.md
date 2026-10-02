# HOME运行证据
同环境15秒桌面轨迹；保留原背景指针方向。下面是CPU事件，不是实测屏幕FPS。

- baseline/still：drawM3 902次，耗时中位数0.233ms，p95 0.335ms；回调间隔中位数16.67ms；Layout 0，Paint 0，PrePaint 902，UpdateLayoutTree 6。
- baseline/moving：drawM3 902次，耗时中位数0.228ms，p95 0.322ms；回调间隔中位数16.67ms；Layout 0，Paint 626，PrePaint 1210，UpdateLayoutTree 315。
- after-home/still：drawM3 902次，耗时中位数0.235ms，p95 0.326ms；回调间隔中位数16.67ms；Layout 0，Paint 0，PrePaint 902，UpdateLayoutTree 0。
- after-home/moving：drawM3 900次，耗时中位数0.246ms，p95 0.345ms；回调间隔中位数16.68ms；Layout 0，Paint 621，PrePaint 1206，UpdateLayoutTree 327。

轨迹未提供DrawFrame/BeginFrame/UpdateCounters；屏幕FPS、内存和SpeedIndex未验证。回调间隔不能当作视觉流畅验收。
after-brand只复测首屏12次及四视口截图，没有新录运行trace（脚本终端的2 traces为旧固定输出）。
