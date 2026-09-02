# L-1 网页拓印 v0.2.2 本地预览视觉协议

## 1. Mode and comparison contract

- 模式：Adaptation（沿用已发布 L-One Store 与 File To Text 详情页的视觉语法）。
- 目标：本地 `/store/` 新工具入口与 `/store/l-1-web-capture/` 详情页。
- 参考：现有 Store、File To Text 详情页、L-One 本轮提供的 2D/3D 工具标识、两张 v0.2.2 授权测试原图。
- 视口：1440×900、834×1112、390×844；平台为本机 Chrome。
- 内容状态：v0.2.2 公开内测；真实下载禁用；反馈入口为无链接占位。
- 缺口：两张原图尚未完成未来公开提交所需的设计清理，因此本轮只能作诊断性预览。

## 2. Intent Lock

| Field | 锁定意图 | Evidence | Confidence | 实现后果 | P0 阻塞 |
| --- | --- | --- | --- | --- | --- |
| composition | preserve：大留白、短章节、首屏身份后按功能—滚动—安装—边界—FAQ阅读 | 对外表达规范与现有详情页 | high | 使用纵向章节和受控正文宽度 | 否 |
| visual focus | translate：2D 工具标识与“留下当前网页”成为首屏焦点 | L-One 本轮提供的标识、固定用途 | high | 标识不作背景装饰，不与参数竞争 | 否 |
| spatial/depth hierarchy | preserve：平面白底、细边线、少量卡片层级 | Store 现有视觉 Token | high | 不增加重阴影、玻璃或复杂景深 | 否 |
| material and light | preserve：纸张式白底与近黑文字 | 现有官网 | high | CSS/DOM 为主，图片保持真实截图质感 | 否 |
| typography | preserve：系统中文字体、展示标题人工分行 | 对外表达规范 | high | desktopLines/mobileLines 分别渲染 | 否 |
| color | preserve：白底、近黑正文和真实弹窗的原有颜色 | 现有官网与真实弹窗 | high | 移除自行添加的黄/红功能卡片 | 否 |
| critical assets | preserve：2D 标识作为 Store/首屏身份；3D 标识保留为本地候选；真实测试原图仅限本地预览 | L-One 本轮提供素材与授权哈希 | high | 首段只显示真实弹窗裁切；发布前必须重新确认公开清理素材 | 是，针对公开提交 |
| critical interaction | preserve：原生链接、details FAQ、禁用下载、清晰焦点 | 页面需求与交互基线 | high | 不发明下载或反馈流程 | 否 |

## 3. Rendering route

采用 CSS/DOM + PNG 工具标识 + PNG 真实截图。它能保留语义、响应式与键盘可达性，也是当前静态站最低复杂度方案。拒绝 Canvas/WebGL、AI 生成产品界面和把真实浏览器工具栏作为公开候选图。

## 4. 交互计划

- hover/pressed：仅为可用链接提供轻微反馈。
- focus：所有链接与 FAQ summary 保持高对比焦点环。
- disabled：下载按钮使用原生 `disabled`，文本固定为“内测包准备中”。
- loading/error/empty：详情页没有对应业务流，不新增。
- reduced motion：关闭非必要平滑滚动和过渡。

## 5. Restoration boundary

真实弹窗原图只用于当前本地审核，且只以裁切方式呈现任务区。3D 标识未进入页面，仅保留为本地候选。未来提交前必须重新确认标识授权与公开清理图，并核对路径、哈希、图注和三端截图。真实下载 URL 与反馈链接未授权，本轮不得恢复或猜测。

## 6. Screenshot validity

本轮没有同尺寸成稿参考，因此像素级比较仅为 diagnostic only。截图的 viewport 与本轮验收尺寸 matched；内容状态为本地预览，不能替代 L-One 审核。

## 7. P0 / P1 / P2 处置

- P0：2D 标识必须匹配交接哈希；原图不得被表述为已批准公开素材；失败即 rework。
- P1：三端人工分行、下载禁用、图片可见裁切、安装步骤、FAQ 焦点与无横向溢出必须 fix-now。
- P2：局部间距和细边线可在不改变内容与版面方向的前提下调整；逐项记录为 accept 或 fix-now。

## 8. L-One approved baseline

- `l_one_decision`：L-One 于 2026-09-03 明确通过本任务中最近一次调整后的本地预览。批准对象是当前
  Store 卡片与详情页，包括 2D 标识的页面使用、3D 标识的本地候选状态、首段真实功能图裁切、章节
  合并与重命名、安装提示、限制说明和 FAQ 结构；不是任何更早预览版。
- 分支：`work/A-20260902-01-web-capture-preview`；提交前状态的基准 HEAD：
  `6d43d037af5ea527db3342affcfc864e50cd4`。本批准内容仍为该分支的未提交任务文件，提交时必须逐项
  对照以下哈希，禁止混入任务外变更。
- 三端预览：`E:\L-One知识库\codex\visualizations\2026\09\02\l1-web-capture-preview-r2\desktop-1440x900.png`、
  `tablet-834x1112.png`、`mobile-390x844.png`；首段裁切核对：`desktop-popup-crop-1440x900.png`。
- 已通过：Store Catalog 生成、校验和回退测试；`node scripts/site-audit.js`；
  `node scripts/audit-motion-library.js`；`git diff --check`；三端无横向溢出、FAQ 基本键盘
  可达、Store 卡片可见。

| 文件 | SHA-256 |
| --- | --- |
| `store/catalog.source.json` | `F2AFF0013CCEF12A96536EBF8920AC3B4F11080074A2873EAF47C35A789CD868` |
| `store/index.html` | `6298F9178529F2D1FA1AC960757C9439B48E01E74D2A24B1D76D2B961B274181` |
| `store/store.css` | `0B3034F668003A35513B9D239033118A2C3327422EAE6473AA0BEE6033FC0793` |
| `store/store.js` | `D2A32C5773C198DE1BA505679A141215639FEDC20B5C607560DEB195231467DD` |
| `store/l-1-web-capture/index.html` | `7E2BC839E5D0CB86D57C705506717CFE592F524D321CD78DEAF1404D8FB9DA3B` |
| `store/l-1-web-capture/web-capture.css` | `312FD006A881169BCE621D1B82A2B82B6EFFE9E143C4D25359D781E922DB79DF` |
| `store/l-1-web-capture/web-capture.js` | `8C9C57B5F555CC53E0429B752F79DD677DE962BEF85EA3A526BA92A2ED132101` |
| `store/assets/products/l-1-web-capture/logo-2d-local-preview.png` | `68ED144F372F34B25E16C1D8A810CBAC6E55543790115AE1DD7518AD99865C79` |
| `store/assets/products/l-1-web-capture/logo-3d-local-preview.png` | `9F7F6DE885CB2454FBA762B10D065E0895A86DD42FF854ACAC6F0B4EF441418C` |
| `store/l-1-web-capture/assets/real-popup-preview.png` | `D961EBE7A6A8239CC48957A1230E4A7A0A02077A6446250194E476CBE7F61AEA` |
| `store/l-1-web-capture/assets/real-long-page-preview.png` | `EFAAD8B0538B75709380B753A41731684C185784DA7E7C6D7A2DB78EB71AFB98` |

## 9. 2026-09-03 verified channel-field delta

- 经 L-One 授权，本批准基线仅增加已核验的下载与反馈字段：下载 URL
  `https://github.com/L-One-Tools/l-one-tools-releases/releases/download/l-1-web-imprint-v0.2.2/L-1-.-v0.2.2-.zip`；
  远程响应文件名 `L-1-.-v0.2.2-.zip`；`16,700` bytes；SHA-256
  `FB9441ED595E24E6A6B9E8DD3D994E353B412FA22EFC44C923AD7E7D499DF055`；Release
  `https://github.com/L-One-Tools/l-one-tools-releases/releases/tag/l-1-web-imprint-v0.2.2`；版本资料
  `https://github.com/L-One-Tools/l-one-tools-releases/tree/main/l-1-web-imprint/0.2.2_2026-09-03`；反馈
  `https://github.com/L-One-Tools/l-one-tools-releases/issues/3`。
- 独立核验：下载端点 HTTP 200、附件名、`Content-Length: 16700`、`Accept-Ranges: bytes` 和 SHA-256
  一致；Release、版本资料与反馈 Issue 为 HTTP 200。三端截图位于
  `E:\L-One知识库\codex\visualizations\2026\09\03\l1-web-capture-release-fields\`。
- 变动文件当前 SHA-256：`store/l-1-web-capture/index.html`
  `5568BD37B3A4A94460CD34FAB36635A3F1671A0D3A300F873327C06486A314C0`；
  `store/releases/l-1-web-capture.json` `ACF13CF35DD4A4AF37F871C01B35AF669C3BA0B05CC624D0116D05FC874126AA`；
  `store/catalog.source.json` `7963707E9C07D175F14F479464112157852A21D23F6A4500DD92604136F79C3B`；
  `public/data/store/catalog.json` `B210C1C4079F534D38A5FBF6701960F1AE957AF3F8A159399335B3A65A6468E7`；
  `public/data/store/catalog.last-known-good.json` `B210C1C4079F534D38A5FBF6701960F1AE957AF3F8A159399335B3A65A6468E7`。

## 10. Production release and rollback

- 当前批准基线已锁定。后续仅允许接入已经核验的真实下载链接与反馈入口；正文、图片、主布局、版本、
  Logo、人工分行、功能承诺或交互任一变化，批准立即失效，必须重新预览并交 L-One 审核。
- 已核验下载与反馈字段已按最小范围接入 Store Catalog 和详情页。PR [#10](https://github.com/L-One-Tools/L-One-main-site/pull/10)
  的 `sync` CI 已通过；合并提交 `3d570089591d1fee9da75f746e59de1d9756bc98`。
- 生产验证：`https://l-one.asia/store/`、`https://l-one.asia/store/l-1-web-capture/` 与
  `https://l-one.asia/public/data/store/catalog.json` 均为 HTTP 200；三个线上文件 SHA-256 与合并仓库
  对应文件一致。生产三端截图位于 `E:\L-One知识库\codex\visualizations\2026\09\03\l1-web-capture-production\`。
- 回滚使用 `git revert -m 1 3d570089591d1fee9da75f746e59de1d9756bc98` 创建可审计回退提交；不删除
  GitHub Release、ZIP 或 Issue。撤回后官网停止使用下载入口，并指导用户从 `chrome://extensions` 移除扩展。
