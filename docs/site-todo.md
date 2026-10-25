# Website backlog

- [x] Footer 默认显示独立的网站版本号 `v1.2.0`；Git 提交号只在更新记录中作为技术信息展示，本地预览也不将提交号或 `-local` 作为版本。
- [x] Changelog 已整合到 About this site 的 `/about-this-site/#changelog` 区域，Footer 版本号直接链接到该区域。旧 `/updates/` 与 `/website-updates/` 均直接跳转到此处，保留查询参数和已有记录锚点，不再单独列入 sitemap 或搜索索引。
- [ ] 让 Footer 随网站不同页面发生细微变化。仅记录后续需求；本轮不添加页面识别逻辑或 Footer 变体。
- [ ] 确定 Guestbook 的留言机制、存储方式、展示与管理规则后，再实施留言功能。当前 `/guestbook/` 仅说明尚未开放，并提供 Contact 入口；不接入第三方服务，不显示虚构留言。
- [x] 已按真实代码提交 `521eebf`（2026-10-13）补充本轮 Footer 和 Header 更新记录，不预填版本或历史记录。

## Footer implementation notes

- `/guestbook/`、`/colophon/`、`/updates/` 原先均不存在，本轮已建立有效路由。Colophon 和更新记录已填入可核实内容；Guestbook 的留言功能仍待建设。
- 联系方式采用已确认的迁移方案：电话、邮箱和微信继续统一读取 `data/siteMetadata.js`，完整展示在 `/about/#contact`，Footer 提供 Contact 入口。
- `package.json` 的 `2.4.0` 出自初始模板提交 `85b1f75`，不是本站独立版本。本轮不将它用作 Footer 版本。
- 本站版本在 `data/siteVersion.ts` 中独立维护，当前为 `1.2.0`，Footer 统一显示 `v1.2.0`。GitHub Pages 构建时从 `GITHUB_SHA` 读取部署提交，本地读取 Git HEAD 作为预览基础提交；这些信息仅在更新记录中展示，缺少 Git 元数据不影响版本号。此次确定版本显示方式，不为 `v1.2.0` 追补未经核实的历史发布日期或发布记录。
- 当前历史记录包含已核实的 `b721c1c`（2026-10-11）及 `521eebf`（2026-10-13）；源代码仓库与原始模板仓库在 Colophon 中分别列出。
- 字体来源：`css/tailwind.css` 的系统无衬线字体栈。技术来源：`package.json`、`next.config.js`、`contentlayer.config.ts`、`.github/workflows/pages.yml`。致谢来源：仓库 `LICENSE` 及原有 Footer 的模板链接。

- Footer 最新方案：浅色背景、顶部细分割线，左侧显示 `© 年份 Dean Jie Zhong · 版本`，右侧仅保留 Contact 与 About this site。后者复用 `/colophon/`。版本及两个入口使用从左向右展开的连续下划线，文字、空格、箭头作为同一个整体。原有社交地址及 Guestbook 页面仍保留，Footer 不再列出它们；联系方式继续在 About。
