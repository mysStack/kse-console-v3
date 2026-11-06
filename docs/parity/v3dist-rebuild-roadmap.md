# V3 可重建 → 替换 → V4 渐进原生化 总路线

> 状态：当前有效（2026-11-06）  
> 仓库：`mysStack/kse-console-v3`（本文件）+ `mysStack/console`（V4 宿主）  
> 主计划指针：`/home/bruce/code/ks-develop/console-v4-migration-plan.md` 已增加同日执行口径  
> 不推倒 `release-4.1.5`；不反编译密封 `v3dist` 当最终源码；A/B 不双打 V4 镜像。

## 一句话

先把仍在用的 V3 变成**可维护、可重建、可替换**的过渡层，再按模块换成 V4 原生，最后删除 Wujie / `v3dist`。这是长期工程，必须过渡，不能一步全改 V4。

## 阶段总览

| 阶段 | 名称 | 做什么 | 完成标准 |
| --- | --- | --- | --- |
| 0 | 基线冻结 | 保留 4.1.5 与密封 `v3dist`；对照口固定 | 30881 基线干净；30883 可挂实验产物；可回滚 |
| 1 | 可维护 V3 源码 | Git 工程可 `build` 出带 SHA 的 `v3dist` | 稳定重建；尽量对齐密封血统；缺口有归因 |
| 2 | Gate A 替换门禁 | 只换静态 `v3dist`，与密封物行为 A/B | 清单等价 + 钉 tag/digest + 批准进镜像 |
| 3 | Gate B 模块原生 | 逐资源 V4 实现并验收后拆该资源 V3 桥 | 每模块 `REA→DEV→VERIFY→PR`，部署后 Playwright |
| 4 | 清理 V3 | 无运行时 V3 依赖后删除桥接与产物 | 无 `/consolev3`、无 `v3dist`、无 Wujie |

## 阶段 0 — 基线与对照环境

| 端口 | Deploy | 角色 |
| ---: | --- | --- |
| 30881 | `ks-console-v415-rea` | **完整** `release-4.1.5`（密封 `main.558f4520…`），禁止挂实验 v3dist |
| 30883 | `ks-console-v3dist-parity` | 同 V4 镜像 + hostPath 挂**重建** v3dist |
| 30880 | `ks-console` | 其他用途，不与 Gate A 基线混淆 |

- 节点 hostPath：`dev01:/opt/ks-console-v3dist-parity` → 容器 `/opt/kubesphere/console/dist/v3dist`
- Node 工作区（可选提效）：Pod `ks-console-v3-node-workspace`，源码 `/opt/kse-console-v3-src`，见 `30883-node-git-workspace.md`
- 日常：改源码 → `bash /tmp/v3-30883-resync-build.sh`（或等价：同步 + `yarn build:client` + 拷贝 + 删 parity Pod）→ 浏览器 A/B

## 阶段 1 — 可维护 V3 源码

**定义：** 有 `src/` / `locales/` / 锁文件，能用 Node 14 编出 `/dist/v3dist/`，产物带 `.v3dist-source.json`（ref + commit）。不是改压缩包，也不是反编译糊墙。

| 项 | 口径 |
| --- | --- |
| 工作分支 | `feature/v3-parity`（自 `feature/v3-artifact-decouple`） |
| 理想 | 血统 = 编出 4.1.5 密封 `v3dist` 的源树 |
| 现实（2026-11-05） | 密封 commit **未知**；仓内 `origin/release-4.1.5`（`0be9122`）是 `8843ead` **祖先**，更空，不能当还原基线；见 `lineage-restore-verdict.md` |
| 当前兜底 | `b96fdc2`（tag `v3dist-parity-20261106`）做**行为**逼近；密封 embed commit 仍未知 |
| 范围 | 仍被 V4 嵌入的核心页；SpringCloud **功能**延后；probe 不恶化 |
| 禁止 | 整包反编译当最终源；为文件数追平恢复全部 ACE mode |

## 阶段 2 — Gate A（替换门禁）

**操作员行为等价**，不要求 JS 哈希 / locale key 数量一致。

必须覆盖（详见 `gate-a-runtime-checklist.md`）：

- 构建可追溯；manifest/chunk/locale 加载
- 核心 embed：列表 / 详情 / YAML 等 Action / RBAC
- Wujie 首次加载、卸载、保活、切项目
- 已启用扩展无新增兼容回退
- 相对旧产物无显著性能退化

**通过后才允许：** 钉 V3 tag/digest → 保留旧包回滚 → V4 镜像构建只拉已批准 tag。  
**通过前：** 30883 hostPath 只算实验，不得宣称可替换或进正式镜像。

### 当前实验闭环（落实说法）

```
改 kse-console-v3 源码
  → Node14 编译 v3dist
  → 挂载到 30883 Pod
  → 与 30881 密封 v3dist A/B 对比
```

## 阶段 3 — Gate B（模块原生化）

在**已可替换 v3dist** 之上逐模块迁移。建议序：CM/Secret/SA → Deployment → STS/DS/Pod → Service/Ingress/Job/CronJob → 其余。

每模块：`REA → DEV → VERIFY（构建→部署→Playwright）→ PR`；一类资源通过 ≠ 另一类通过；过了才拆该模块 V3 桥。

## 阶段 4 — 清理

全部嵌入与 Action/扩展入口无 V3 运行时依赖后，删除 Wujie、`/consolev3`、`v3dist` 及对应构建依赖。

## 提效工具：什么有用、什么不能替代

| 手段 | 用途 | 不能替代 |
| --- | --- | --- |
| **REA**（静态字符串/路由/Action + 运行时 Network/页面对照） | 阶段 1 找缺口归因；阶段 3 模块开发前定行为契约 | **不能**代替 Gate A 的浏览器 A/B，也不能代替 VERIFY 部署验收 |
| Playwright / `playwright` skill | Gate A/B 自动化对照与回归 | 不能只跑本地单测就报通过 |
| 30883 Node 工作区 + resync 脚本 | 缩短「改码→出包→挂载」 | 不是 `yarn start` 直挂 Wujie |
| diff-matrix / attribution 文档 | 量化新旧产物差异，收敛 must-have | 不能当 Gate A 通过证明 |
| 并行 Agent（只读取证） | 扩展清单、路由盘点、失败归类 | 不得并行改同一模块分支夹带功能 |

**REA 结论：** 值得用，而且阶段 1/3 **应该**用——用来少走弯路、精确补源码/定原生范围。它提高的是**分析效率**，不是跳过「编译→挂载→对比→钉 tag」或「部署后浏览器验收」。

### GitHub 上可引入的提效工具（2026-11-06 调研）

按「对我们这条线性价比」排序，不是星数榜。

| 优先级 | 工具 | 仓库 | 用在哪 |
| --- | --- | --- | --- |
| P0 | Playwright 自带 `toHaveScreenshot` | [microsoft/playwright](https://github.com/microsoft/playwright) | Gate A：30881 vs 30883 核心页截图回归（已在用 Playwright，补 snapshot 即可） |
| P0 | `webpack-bundle-diff` | [smikula/webpack-bundle-diff](https://github.com/smikula/webpack-bundle-diff) | 阶段 1：新旧 `stats.json` 模块级 diff（你们是 Webpack 4，选兼容 `<1.0`） |
| P0 | `webpack-bundle-analyzer` | [webpack/webpack-bundle-analyzer](https://github.com/webpack/webpack-bundle-analyzer) | 看 chunk 组成，避免瞎猜体积 |
| P1 | `bundle-stats` | [relative-ci/bundle-stats](https://github.com/relative-ci/bundle-stats) | 多构建对比报告（CI 友好） |
| P1 | CI bundle diff Action | [launchdarkly-labs/webpack-bundle-diff-action](https://github.com/launchdarkly-labs/webpack-bundle-diff-action) | PR 上自动评论包体变化 |
| P2 | `source-map-explorer` | [danvk/source-map-explorer](https://github.com/danvk/source-map-explorer) | **仅当**构建打开 `.map` 时；当前密封物无 map，对旧包帮助有限 |
| P2 | `playwright-odiff` / odiff | [dmtrKovalenko/odiff](https://github.com/dmtrKovalenko/odiff) | 截图对比更快更稳（可选替换 pixelmatch） |
| 可选 | Lost Pixel / Argos / Pixelguard | 各 visual regression SaaS/CLI | 团队要托管基线再上；本地 Playwright 已够起步 |
| 慎用 | `patch-package` | [ds300/patch-package](https://github.com/ds300/patch-package) | 只适合钉依赖热修，不当 V3 源码恢复手段 |

**已落地：**  
1）`docs/parity/tools` Playwright+pixelmatch 截图 A/B（`yarn parity:ab-shot`）— 首轮 7/7 PASS。  
2）`yarn build:client:stats` / `STATS=1 ANALYZE=1` 产出 `webpack-stats.json` + analyzer HTML；`parity:diff-bundle` 包装 `webpack-bundle-diff@0.6.0`（Webpack 4）。密封旧包无 stats 时先用 `parity:diff-assets`。

## 当前进度快照（2026-11-06）

- [x] 阶段 0 对照口纠正（30881 干净 / 30883 实验）
- [x] `8843ead` 可重建 + 多轮核心 embed A/B 取证（r1–r10）
- [x] composing 宿主别名缺口定位与修复（已进入 `b96fdc2`）
- [x] 30883 Node14 git 工作区
- [x] Gate A：已启用扩展只读 A/B（r11 management/marketplace + 详情入口）
- [x] 提效工具落地并跑通首轮基线（`docs/parity/tools`：ab-screenshot 7/7、asset-manifest-diff）
- [x] 可维护旧源码已给定：`kse-console-v3` `feature/v3-parity`（不是另找一棵树）
- [ ] 密封 `main.558f4520` 的 embed 构建 commit 仍未知；当前以这份源码做行为等价，不宣称字节级还原
- [x] Gate A：性能对照（perf-ab 首轮）
- [x] 本地 tag `v3dist-parity-20261106` → `b96fdc2`；后续 composing 空态已进 `c0aa6a9`
- [x] 本地 tag `v3dist-parity-20261106-composing` → `c0aa6a9`；30883 产物 `main.9a287bcc468b4db7c212.js`，sha256 `877da0659805a25389b14c246a0d2b3bc66b425c7f7c6d31a26615ff67722c9d`（2026-11-06T01:36:43Z）。未 push，未批准进正式镜像
- [x] c0aa6a9 七路径截图 A/B 全过（见 `screenshots-ab/c0aa6a9-ab7`）
- [x] c0aa6a9 连续扩面：7路径 + workloads2 + jobs/cm + YAML + perf + locale/create（见 checklist wave5–9）
- [ ] 批准用该 digest 替换正式镜像中的密封 v3dist
- [ ] 阶段 3 在「可替换」成立后按模块推进（Workload 等历史证据不可直接继承为当前通过）

**钉版记录 c0aa6a9（2026-11-06）：** 连续计划见本机 `gate_a_continuous`。干净提交重编挂 30883；冒烟 + 7 路径 pass。composing 空卡片已对齐。30881 仍是密封 `main.558f4520…`。

**宿主镜像差（有意保留）：** 30881=`release-4.1.5-merged-20261102-ad724a3`；30883=`release-4.1.5-defer-actions-20261102-d475030`。本轮不把 30883 宿主改成 merged，避免冲掉 defer-actions 实验口径；对照结论需带着「宿主不完全同镜像」读。Gate A 仍未关闭，没有批准替换。

## 相关文档

- `gate-a-runtime-checklist.md` — Gate A 清单与轮次记录  
- `gate-a-evidence/tools-baseline.md` — 提效工具首轮基线  
- `lineage-restore-verdict.md` — 为何仓内 `release-4.1.5` 不能当密封血统  
- `30883-node-git-workspace.md` — Node 工作区用法  
- `docs/parity/tools/README.md` — ab-shot / asset-diff / bundle-diff 用法  
- `core-must-have.md` / `c-gap-vs-core.md` — 范围与延后项  
- `diff-matrix-round1.md` / `attribution-round1.md` — 首轮差异与归因  
