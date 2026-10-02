# WORK媒体交付与生产接入

原始29视频全部只读。1080总计1,086,739,920 bytes；720总计371,138,445 bytes；两套合计1,457,878,365 bytes（约1.46GB十进制），不代表云服务器可用空间已核验。
两套均29/29完成H264/yuv420p、AAC（有音轨时）、时长误差<0.3秒、moov位于mdat之前的faststart检查。SHA-256见WORK_PLAYBACK_MANIFEST.json。保持原画面比例，没有cover裁切；源视频本身的摄影构图未改写。
本地29桌面+29手机实际播放已检查；Range请求206，Content-Type video/mp4，Content-Length与Content-Range正常。控制条实际暂停/拖进度/音量/静音/全屏，状态见work-reviewed/interactions.json与loading.json。

生产接入仍未执行：需要明确媒体HTTPS域名/目录与上传授权，检查实际容量、现有文件、TLS和CDN。上传两套编码及29封面后匿名检查每条URL、Range 206、Content-Type、Content-Length、缓存、跨域策略与哈希，再填写projects.json的cloud_video_url/cloud_mobile_video_url/cloud_poster_url。不能把本地/_work-playback路径发布后当作已托管媒体。先生成可审查URL映射再发布页面；回滚保留上一映射与Git revert记录。
云端未核实：40GB容量、主机身份、权限、上传状态、Range/缓存响应。当前候选故意只允许loopback使用本地视频。
