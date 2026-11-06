# Gate A runtime checklist (core embeds only)

> 总路线：`docs/parity/v3dist-rebuild-roadmap.md`（2026-11-06）。本文件只跟踪 Gate A 运行时对照。

## Scope

- Rebuild under test: `kse-console-v3` `feature/v3-parity` artifact (`.build-out/dist` or 30883 Node workspace publish)
- Host baseline: `console` `release-4.1.5` (do not modify published branch; use isolated integration branch when wiring)
- **Out of scope:** SpringCloud feature pages/locales (plugin). Still watch probe cost.
- **Out of scope:** DB/MQ/Edge/GPU/notification enterprise packs unless page is actually opened in env.

## Pre-conditions

- [x] New artifact has `.v3dist-source.json` with commit SHA
- [x] Manifest/locale packs load (`manifest.json`, `manifest.locale.json`, `locale-zh`/`locale-en`)
- [ ] Integration uses approved tag/digest only; old v3dist retained for instant rollback

## Core pages to A/B (old v3dist vs rebuild)

For each resource: open list → detail → one write/read action → refresh/back → namespace switch.

| Resource | List | Detail | Action smoke | RBAC negative | Notes |
| --- | --- | --- | --- | --- | --- |
| deployments | r3 | r3 | YAML r3; HPA r7 visual | r5 | HPA 基线菜单 / 实验对话框 |
| pods | r3 | r4 | terminal r4; logs r4i | | stock 无 CONTAINER_LOGS tab |
| configmaps | r3/r6 | r6 | YAML r6 | | |
| secrets | r3/r6 | r6 | view r6 | | |
| services | r3 | | YAML r3 | | |
| ingresses | r3/r6 | r6 | YAML r6 | | |
| statefulsets | r3/r6 | r6 | YAML r6 | | |
| daemonsets | r3/r6 | r6 | YAML r6b | | |
| jobs / cronjobs | r3/r6 | r6 | Cron YAML r6; Job 无 YAML 菜单 | | |
| volumes / volume-snapshots | r3/r6 | r6 | view; snapshots 空表 r7 | | |
| roles / serviceaccounts | r7 | r10 | open | | |
| gateways / grayrelease / s2ibuilders / composing | r7/r8/r9 | | gray/s2i 开; composing 404 已修 (r9/r10) | | s2i CRD unsupported both |
| alerts / alert-rules / log-collections / networkpolicies | r7 | | open | | 部分空表 |

## Cross-cutting

- [x] Wujie first load / destroy / keep-alive
- [x] Project switch does **not** regress beyond current host-fixed probe behavior
- [x] `checkSpringCloudIfActive` request count/latency not worse than current release image
- [x] No new extension compatibility break for enabled extensions in test env (r11 open-only management/marketplace)
- [x] 131 remains read-mostly; mutating tests only in isolated env

## Pass rule

Gate A pass = core rows above behave equivalently for operators, not locale-key count parity and not ACE mode file count parity.


## Snapshot (/mnt/c/Users/mys93)

- New locale-en keys: 4027 / old 5604 (missing 1601)
- Core embed resources: 25
- Deferred SpringCloud resources: 5
- Remaining missing split: plugin_defer=411, core_candidate=133, other=1057


## Round1 status (2026-11-02)

- Mount-only override on `ks-console-v415-rea` verified; main `fde4b8733d31a10689e2`.
- Cluster list embeds smoke: deployments/statefulsets/daemonsets/pods/services/ingresses/jobs/cronjobs/secrets/configmaps/volumes + `/consolev3/` = 13/13 pass, 0 v3dist HTTP errors.
- Evidence: `docs/parity/gate-a-evidence/round1-smoke.md`.
- Still open: detail/actions, RBAC negative, probe non-regression, old-vs-new A/B remount.


## Round3 corrected A/B (2026-11-02)

> 纠正：`:30881` 为完整 release-4.1.5 基线，不得挂载重建 v3dist。实验侧改为 `:30883` `ks-console-v3dist-parity`。

| 项 | 30881 baseline | 30883 parity |
| --- | --- | --- |
| v3dist main | `main.558f452048e49db23323.js` | `main.fde4b8733d31a10689e2.js` |
| 核心列表 11 项 | 11/11 pass | 11/11 pass |
| Deploy detail | pass | pass |
| Deploy Edit YAML | pass | pass |
| Service Edit YAML | pass | pass |
| Deploy HPA dialog | flaky/false in automation | pass |
| SpringCloud CRD probe | 1 | 1 |
| v3dist HTTP errors | 0 | 0 |

Evidence: `docs/parity/gate-a-evidence/round3-ab-smoke.md`, screenshots `screenshots-ab/`.
Still open: pods logs/terminal, RBAC negative, namespace switch, old evidence on wrongly-mounted 30881 invalidated.




## Round4 pods/switch (2026-11-02)

| 项 | 30881 stock | 30883 rebuilt |
| --- | --- | --- |
| Terminal | True | True |
| CONTAINER_LOGS tab | False | True |
| Logs via tab click (live stream) | n/a (no tab) | True (`exp-r4i-after-click.png`) |
| Switch probe total | 1 | 1 |

Evidence: `docs/parity/gate-a-evidence/round4b-pods.md`, `screenshots-ab/round4i-logs.json`.
Note: stock missing CONTAINER_LOGS/MONITORING; rebuilt is a superset. Direct host `/logs` URL is unreliable under Wujie — use tab click.


## Round5 RBAC negative (2026-11-02)

| 项 | 30881 stock | 30883 rebuilt |
| --- | --- | --- |
| Viewer login | True | True |
| Project overview read | True | True |
| Deploy detail read | True | True |
| API GET / PATCH / POST | 200 / 403 / 403 | 200 / 403 / 403 |
| A/B write-deny equivalent | — | True |

Evidence: `docs/parity/gate-a-evidence/round5-rbac.md`.
Note: host list route `/projects/:ns/deployments` 404 for viewer on both sides (host routing); not a v3dist delta. Temp viewer cleaned up.


## Round6 remaining core detail/YAML (2026-11-02)

| 项 | 30881 stock | 30883 rebuilt |
| --- | --- | --- |
| STS / CronJob / Ingress / ConfigMap YAML | True | True |
| DaemonSet YAML | True (r6b) | True (r6b; r6 first miss) |
| Secret / Volume view | True | True |
| Job list+detail | True | True |
| Job YAML menu | automation miss | automation miss |
| Deploy HPA dialog | not captured | True |
| SpringCloud probe | 1 | 1 |
| v3dist HTTP errors | 0 | 0 |

Evidence: `docs/parity/gate-a-evidence/round6-detail-yaml.md`.

## Round7 Wujie / secondary / HPA visual (2026-11-02)

| 项 | 30881 stock | 30883 rebuilt |
| --- | --- | --- |
| Wujie deployments↔pods keep-alive | True | True |
| Job list more | edit/rerun/delete（无 YAML） | 同左 |
| HPA | 更多操作含「编辑自动扩缩」 | AUTOSCALING 对话框 |
| Cluster secondary open (8) | no crash | no crash |
| Project s2i/gray/composing (no workspace) | 404 | 404 |
| Probe / v3 4xx | 1 / 0 | 1 / 0 |

Evidence: `docs/parity/gate-a-evidence/round7-wujie-secondary.md`.

## Round8 workspace s2i/gray/composing + extensions (2026-11-02)

| 项 | 30881 stock | 30883 rebuilt |
| --- | --- | --- |
| `…/s2ibuilders` | empty + CRD unsupported toast | 同左 |
| `…/grayrelease/cates` | 三类灰度卡片 | 同左 |
| `…/composing` | Composed App 空列表 | **Wujie Not Found** |
| `/extensions/management` | 列表可开 | 同左 |
| `/extensions/marketplace` | 可开 | 同左 |
| Probe / v3 4xx | 1 / 0 | 1 / 0 |

Evidence: `docs/parity/gate-a-evidence/round8-workspace-ext.md`.

## Round9 composing remount (2026-11-02)

| 项 | 30881 stock | 30883 rebuilt |
| --- | --- | --- |
| v3dist main | `main.558f452048e49db23323.js` | `main.3e3fcb7888ce0f1c36a8.js` |
| composing 404 | false | **false（已修）** |
| composing UI | 专用空卡片 | CRDApps 空表 + CRD unsupported toast |

Evidence: `docs/parity/gate-a-evidence/round9-composing.md`. Jest 3 passed. 30881 未改。

## Round10 post-remount regression (2026-11-03)

| 项 | 30881 stock | 30883 `main.3e3fcb` |
| --- | --- | --- |
| 核心列表 11 | 11/11 | 11/11 |
| Deploy YAML | True | True |
| Roles / SA detail | True | True |
| composing 404 | false | false（视觉） |
| Probe / v3 4xx | 1 / 0 | 1 / 0 |

Evidence: `docs/parity/gate-a-evidence/round10-post-remount.md`.
Still open: extension install/enable。composing 空态已改成自制应用空卡片，源码还在工作区。正式镜像未批准替换。本地 tag 见文末 pin 记录。


## Snapshot round11 (2026-11-06)

Enabled-extension open-only A/B on 30881 vs 30883. Evidence: `docs/parity/gate-a-evidence/round11-extensions.md`. No install/enable mutations.

## Snapshot tools baseline (2026-11-06)

- `docs/parity/tools` ab-screenshot: **7/7 PASS** (maxDiffRatio=0.02) vs 30881/30883.
- asset-manifest-diff sealed vs rebuild recorded (782 vs 250 files; expected chunk graph gap).
- Evidence: `docs/parity/gate-a-evidence/tools-baseline.md`, `screenshots-ab/tooling/`, `asset-manifest-diff.json`.
- Fix-loop: no fail paths → no rebuild today.
- Still open for Gate A close-out: 批准替换；composing 空态样式非阻塞。性能对照与本地 tag 已有记录。

## Snapshot perf-ab (2026-11-06)

- pass=True
- Evidence: `docs/parity/gate-a-evidence/perf-ab.md`, `screenshots-ab/perf/perf-ab-report.json`
- Rule: wall Δ<=+3s or <=+50%; v3dist transfer not >2x baseline

## Snapshot pin b96fdc2 (2026-11-06)

| 项 | 值 |
| --- | --- |
| commit | `b96fdc29328e84f2aeefc5daa712e8832cbfafde` |
| tag | `v3dist-parity-20261106`（仅本地） |
| 30883 main | `main.a0f7286afd2bc5b69a7c.js` |
| sha256 | `73e98e386e599c39f7f4175eea780f5aca3750a7ae7cc3aefe7286a18511f7a2` |
| builtAt | `2026-11-05T17:18:04Z` |
| 冒烟 | deployments ratio 0；composing ratio 0.0149；pass |
| 30881 | 密封 `main.558f452048e49db23323.js` 仍 HTTP 200；重建 main 不在该端口 |

证据：`docs/parity/gate-a-evidence/screenshots-ab/pin-b96fdc2/ab-screenshot-report.json`。未批准进正式镜像。

## Snapshot pin c0aa6a9 composing (2026-11-06)

| 项 | 值 |
| --- | --- |
| commit | `c0aa6a963d4c9c4d73e127881bcf88fe84621694` |
| tag | `v3dist-parity-20261106-composing`（仅本地） |
| 30883 main | `main.9a287bcc468b4db7c212.js` |
| sha256 | `877da0659805a25389b14c246a0d2b3bc66b425c7f7c6d31a26615ff67722c9d` |
| builtAt | `2026-11-06T01:36:43Z` |
| dirty | false |
| 冒烟 | deployments 0；composing 0.0098；pass |
| 7 路径 | 全过：deployments/pods/cm/secrets/services/composing/ext×2 |
| 宿主 | 30881 `…merged…ad724a3`；30883 `…defer-actions…d475030`（有意未对齐） |

证据：`screenshots-ab/c0aa6a9-smoke/`、`screenshots-ab/c0aa6a9-ab7/ab-screenshot-report.json`。未批准进正式镜像。

## Snapshot continuous wave5 (2026-11-06)

- Locale blank probe: no real missing keys (`NVIDIA` false positive). `locale-blank-c0aa6a9.md`
- Roles / SA open A/B: `screenshots-ab/c0aa6a9-rbac-open` pass
- Composing create dialog open→cancel on 30881+30883: pass（只读，不提交）。`composing-create-open-c0aa6a9.json`
- Deployment Edit YAML open→cancel：两侧 editors/modals 1→0。`deploy-yaml-open-c0aa6a9.json`
- Perf lite 3 路径再测：pass。`perf-ab-c0aa6a9.json`（30883 wall/transfer 均不劣）
- Workloads2 open A/B (ingresses/volumes/sts/daemonsets): pass。`screenshots-ab/c0aa6a9-workloads2`
- Jobs/CronJobs/CM/Secrets open A/B: pass。`screenshots-ab/c0aa6a9-jobs-cm`
- NetworkPolicies/Alerts/AlertRules/SA open A/B: pass。`screenshots-ab/c0aa6a9-net-alert`
- Gateways/GrayRelease/S2I/LogCollections open A/B: pass。`screenshots-ab/c0aa6a9-gateway-s2i`
- HPA dialog probe: 30883 可开可关；30881 自动化仍 flaky（同 round3）。见 `deploy-hpa-open-c0aa6a9.md`。不改码。
- Route finding: bare `/clusters/host/projects/...` lists 404 on both ports; tools default switched to `/dev-workspace/...`. `route-prefix-finding.md`
- Secret/CM detail YAML + Service YAML read-only: pass。`detail-actions-c0aa6a9.json`
- Pods filter gap vs sealed（成功完成/失败/未知）已修源码，待重编验收。`pods-status-filter-gap.md`
- 2026-11-06 `48f97d7` 已挂 30883；Pod 状态过滤文案验收通过：等待中/运行中/成功完成/失败/未知。`pods-filter-verify.json`
- 未宣称 Gate A 关闭；仍为 hostPath A/B，未替换官方镜像。
- ws-core `/dev-workspace` 截图 A/B（阈值 0.03）pass；pods ratio≈0.027 仍属 live 漂移。`48f97d7-ws-core-report.json`
- Ingress YAML 只读：`dev-web/matrix`（dev-wms 无路由）两侧打开/取消 pass。`ingress-yaml-48f97d7.json`
- PVC YAML（dev-db/data-postgresql-dev-0）两侧打开通过；Jobs 过滤 失败/已完成/运行中 对齐。`volumes-jobs-48f97d7.json`
- 发现：30883 PVC 更多操作多出「创建快照」，密封包无。`pvc-snapshot-action-gap.md`（未修）
- `6948b34` 已挂 30883；PVC 创建快照菜单差异已对齐密封包（两侧均无该入口）。
- `fd49fe6` 已挂 30883；CronJob 状态不再露 `Running`，列表为运行中。`sts-cron-fd49fe6.json`
- StatefulSet `dev-db/postgresql-dev` 与 CronJob `dev-wms/wms-scheduling` YAML 只读打开两侧通过。
- DaemonSet `kubesphere-monitoring-system/node-exporter` YAML 只读两侧通过；HPA 本波仅 deployments 列表 smoke。`daemonset-hpa-fd49fe6.json`
- ServiceAccount `dev-wms/default` YAML 只读两侧通过。`sa-role-fd49fe6.json`
- 发现：项目角色列表 30883 为空、30881 有 viewer/operator。`project-roles-list-gap.md`（未修）
- `ffbdbae` 已挂 30883；项目角色列表空洞已修（IAM v1beta1）。`sa-role-ffbdbae.json`
- 网络隔离页（v3 embed）两侧通过。`members-network-strict-ffbdbae.json`
- 企业空间角色/成员路由当前未嵌入 v3dist（落到 dashboard），暂不纳入 Gate A v3dist 缺口。
- API 抽检：workspaceroles/clusterroles 的 v1alpha2 404、v1beta1 200（RoleStore 已切 v1beta1）。
- `653cbe2` 已挂 30883：UserStore/常量 IAM 切 v1beta1 + namespacemembers。`iam-v1beta1-alignment.md`
- VolumeSnapshot（项目/集群）与 StorageClass 列表 v3 embed 两侧通过。`snapshots-storage-ffbdbae.json`
- composing 自制应用列表 v3 embed 两侧通过；applications/hpa 路由两侧均落到 dashboard（非重建独有）。`hpa-apps-653cbe2.json`
- Deployment YAML 只读两侧通过（653cbe2）。`deploy-yaml-653cbe2.json`
- Alert / S2I 相关列表路径 v3 embed 两侧通过。`alerts-s2i-653cbe2.json`
- 项目网关 gateways v3 embed 两侧通过；grayreleases 两侧 dashboard（非重建独有）。`gateway-gray-653cbe2.json`
- 监控/日志多路径两侧行为一致（多为非 embed）；custom-monitoring 两侧 embed 通过。`monitor-log-653cbe2.json`
- 项目 base-info/overview 两侧 embed 通过；quota/limitranges 两侧同为非 embed 或空（无独有缺口）。`quota-limit-653cbe2.json`
- `653cbe2` 回归：项目角色列表仍含 viewer/operator。`sa-role-653cbe2.json`
- 服务网格/Spring 相关路径两侧对称（多为非 embed）。`mesh-spring-653cbe2.json`
- `1d2f57c` 已挂 30883；Pod 详情/列表状态中文对齐（无 raw Completed）。`pod-status-locale-verify.json`
- Jobs 列表/详情状态中文（已完成/运行中）正常；events 路由两侧 dashboard。`events-job-1d2f57c.json`
- StorageClass/PV 详情 YAML 初探未打开（菜单探测）。`sc-pv-yaml-1d2f57c.json`
- Host `nodes` 两侧均落到 dashboard（非重建独有）。`nodes-1d2f57c.json` / `nodes-host-v4-native.md`
- Host projects/components/CRD/monitor-cluster 两侧均 dashboard（对称）。`cluster-ns-components-1d2f57c.json`
- **重建独有（已修）**：SC 列表曾打 `resources.kubesphere.io/v1alpha3/storageclasses` 404；`08ad382` 改 `kapis/storage.k8s.io/v1` 后 30883 列表+YAML 与 30881 对齐。`sc-list-api-gap.md` / `sc-list-yaml-08ad382.json`（live `main.1e374d4cf69f85406801.js`）
- Soft：SC 列表列集合仍有差异（sealed 有「存储类型」过滤；重建为「默认存储类」列），不挡列表数据。
- 项目 secrets/cm/services 抽检帧 URL 正确，部分侧文案空为等待抖动。`project-config-wave-08ad382.json`
- volumes/PVC/SA/Secret 抽检两侧 embed 通过；SA default YAML 打开两侧通过。`volumes-sa-08ad382.json`
- 集群设置 base-info/visibility/members/roles/log-receivers 两侧均 dashboard（对称非独有）；项目 CM 列表 embed 通过。`cluster-settings-08ad382.json`
- Secret/CM/Service 详情 YAML（`/detail`）抽检见 `secret-cm-yaml-08ad382.json`。
- Secret/CM/Service **列表行** 编辑 YAML 抽检见 `list-yaml-actions-08ad382.json`（详情深链两侧易落 dashboard，对称）。
- Deployment 详情 tab（resource-status/revision/monitors/env/events）对称抽检。`deploy-tabs-08ad382.json`
- Deployment `wms-scheduling-server` 详情 tab 抽检（见最新 `deploy-tabs-08ad382.json`）；revision 两侧常落 dashboard。
- StatefulSet `postgresql-dev` 详情 tab 对称抽检。`sts-tabs-08ad382.json`
- Pod 详情 tab + 日志/终端入口只读对称抽检。`pod-logs-08ad382.json`
- CronJob `wms-scheduling` 列表/详情 tab 对称抽检。`cron-job-tabs-08ad382.json`
- CronJob 列表 API 两侧均 200；30883 默认可能停在「任务」子 tab 致空表，点「定时任务」后应有数据（见 `cron-list-net-08ad382.json` / `cron-tab-click-08ad382.json`）。
- Ingress（dev-web）列表/YAML 与 IngressClass 路径对称抽检。`ingress-wave-08ad382.json`
- Jobs 列表（任务子 tab）对称抽检。`jobs-wave-08ad382.json`
- 企业空间 overview/projects/members/roles/repos 对称归类。`workspace-wave-08ad382.json`
- DaemonSet node-exporter 详情 tab 对称抽检。`ds-tabs-08ad382.json`
- 工具箱入口对称（宿主 chrome，非 v3dist 独有面）。`toolbox-wave-08ad382.json`
- DaemonSet node-exporter（system-workspace 前缀）详情+YAML 抽检。`ds-system-ws-08ad382.json`
- Pod 容器日志入口点击打开/关闭只读抽检。`pod-log-open-08ad382.json`
- 项目 PVC `data-postgresql-dev-0` 详情 YAML 只读抽检。`pvc-yaml-08ad382.json`
- ConfigMap 经列表进入详情 YAML 抽检。`cm-via-list-08ad382.json`
- Secret 详情 YAML 两侧抽检。`secret-via-list-08ad382.json`
- Secret 列表行 YAML 抽检（详情深链两侧易 dashboard）。`secret-list-yaml-08ad382.json`
- Service 列表行 YAML 抽检。`svc-list-yaml-08ad382.json`
- Deployments 状态过滤 UI 对称抽检。`deploy-filter-08ad382.json`
- 平台 access/users|roles 与 /workspaces 对称归类。`users-wave-08ad382.json`
- 告警/自定义监控路径 08ad382 复扫。`alerts-recheck-08ad382.json`
- 项目成员/角色 08ad382 复扫。`members-recheck-08ad382.json`
- 网络隔离/网关 08ad382 复扫。`network-recheck-08ad382.json`
- 项目 base-info/overview/quota 08ad382 对称抽检。`project-base-08ad382.json`
- 应用 composing/template 08ad382 复扫。`apps-recheck-08ad382.json`
- S2I builders 08ad382 复扫。`s2i-recheck-08ad382.json`
- 灰度发布路径 08ad382 复扫（多为 dashboard 对称）。`gray-recheck-08ad382.json`
- 卷快照 + SC 列表 08ad382 复扫（含 SC 修复后数据）。`snap-recheck-08ad382.json`
- **重建独有（已修）**：VolumeSnapshot 列表改 snapshot.storage.k8s.io/v1；`4aa18ae` 挂载后无 resource is not supported。`snap-verify-4aa18ae.json` / `volume-snapshot-api-gap.md`
- CRD 集群/项目路径对称抽检（4aa18ae）。`crd-wave-4aa18ae.json`
- Pods 列表中文状态 4aa18ae 复扫。`pods-list-4aa18ae.json`
- StatefulSet 列表 4aa18ae 抽检。`sts-list-4aa18ae.json`
- CronJob 列表（点定时任务 tab）4aa18ae 抽检。`cron-list-4aa18ae.json`
- 重建挂载到 95cc975（含 secret URL 空格修复）；SC+Snapshot 回归。`post-rebuild-sc-snap-95cc975.json`
- Deployments 列表 95cc975 对称抽检。`deploy-list-95cc975.json`
- Service/Ingress/ConfigMap/Secret/Snapshot 列表 95cc975 对称抽检。`svc-ing-cm-secret-snap-95cc975.json`
- PVC/ServiceAccount/Jobs 列表 95cc975 对称抽检。`pvc-sa-jobs-95cc975.json`
- Pods/Events/PV/VolumeSnapshotClass 95cc975 对称抽检。`pods-events-pv-95cc975.json`
- ConfigMap/Secret 行内编辑 YAML + 项目配额 95cc975。`yaml-quota-95cc975.json`
- Soft：宿主 PV / VolumeSnapshotClass 深链易落 dashboard。`host-pv-snapshotclass-soft.md`
- ConfigMap/Secret data-test YAML + HPA/成员 95cc975。`yaml-dt-hpa-members-95cc975.json`
- StorageClass YAML + 项目概览/告警 95cc975。`sc-yaml-alerts-overview-95cc975.json`
- 项目概览/告警 + 企业空间概览/仓库/项目列表 95cc975（加长等待）。`overview-ws-repos-95cc975.json`
- 日志接收器/灰度/镜像构建/告警策略 分类抽检 95cc975。`logging-gray-image-95cc975.json`
- S2I 镜像构建器 rebuild API leak 探针。`s2i-network-probe-95cc975.json`
- S2I 列表 unsupported 静默空态（对齐 applications）。`s2i-unsupported-gap.md`
- unsupported 泄漏面扫描（applications/s2i/hpa/roles/gateway）。`unsupported-scan-95cc975.json`
- S2I unsupported 静默修复 7ca8432 验收。`s2i-verify-7ca8432.json`
- S2I 7ca8432 加长等待 iframe 验收。`s2i-verify-7ca8432b.json`
- S2I 7ca8432 热身后 iframe 验收。`s2i-verify-7ca8432c.json`
- 网络隔离/网关/项目角色 7ca8432 对称抽检。`net-roles-gw-7ca8432.json`
- 告警/概览配额/宿主 CRD/集群角色 分类抽检 7ca8432。`crd-limits-alerts-7ca8432.json`
- Deployments/STS/Jobs 行内 YAML 抽检 7ca8432。`wl-yaml-7ca8432.json`
- Secret 创建/镜像仓库 UI 抽检 7ca8432。`registry-secret-create-7ca8432.json`
- DaemonSet/STS/Pods 列表 7ca8432 回归抽检。`ds-sts-pods-7ca8432.json`
- unsupported 二次扫描（含 S2I 回归）7ca8432。`unsupported-scan2-7ca8432.json`
- 告警规则组/告警/监控/日志 分类抽检 7ca8432。`alert-rules-mon-7ca8432.json`
- 项目基本信息/成员/角色/配额 分类抽检 7ca8432。`project-settings-7ca8432.json`
- Soft：项目成员/配额深链两侧 host-dashboard。`members-quota-host-soft.md`
- SC 列表/YAML 重试 + 企业空间应用分类 7ca8432。`sc-yaml-ws-apps-7ca8432.json`
- Service/Ingress/CronJob 7ca8432 回归。`svc-ing-cron-7ca8432.json`
- ConfigMap/Secret/PVC/Snapshot/SC 7ca8432 回归。`config-storage-7ca8432.json`
- ServiceAccount/Jobs/Deployments(+YAML) 7ca8432 回归。`sa-jobs-deploy-7ca8432.json`
- 宿主集群概览/节点/项目/工作负载 分类抽检 7ca8432。`cluster-host-wave-7ca8432.json`
- 宿主 services/jobs/configmaps/secrets 分类抽检 7ca8432。`host-lists-7ca8432.json`
- Soft：宿主集群列表 rebuild 易采到壳层文案。`host-lists-soft.md`
- 宿主 services 加严判定重试 7ca8432。`host-services-retry-7ca8432.json`
- Ingress/网关/告警规则 7ca8432 再抽检。`ingress-alert-7ca8432.json`
- toolbox/kubeconfig/components + S2I/applications 三次扫描 7ca8432。`toolbox-scan3-7ca8432.json`
- 网络隔离/SA/角色/基本信息 7ca8432 再抽检。`np-sa-role-7ca8432.json`
- Deployment 详情（含事件 tab）7ca8432。`deploy-detail-7ca8432.json`
- Soft：Deployment 详情深链两侧宿主壳。`deploy-detail-host-soft.md`
- Service/CM/Secret/SC 列表与 YAML 再抽检 7ca8432。`list-yaml-more-7ca8432.json`
- CronJob/Jobs 行内 YAML 7ca8432。`cron-job-yaml-7ca8432.json`
- 项目角色/SA 列表与 YAML 抽检 7ca8432。`roles-sa-yaml-7ca8432.json`
- StorageClass YAML 再试 7ca8432。`sc-yaml2-7ca8432.json`
- Snapshot/PVC 空态与创建入口 7ca8432。`snap-pvc-create-7ca8432.json`
- 告警规则组列表/创建入口 7ca8432。`alert-rules-ops-7ca8432.json`
- 告警规则组热身重试 7ca8432。`alert-rules-ops2-7ca8432.json`
- Soft：告警规则组 iframe 偶发未挂载（两侧对称）。`alert-rules-iframe-soft.md`
- 稳定列表心跳 Deploy/Service/Pod/CM 7ca8432。`heartbeat-7ca8432.json`
- S2I/SA 心跳 7ca8432。`s2i-sa-hb-7ca8432.json`
- Ingress/网关/网络隔离心跳 7ca8432。`net-hb-7ca8432.json`
- SC/Snapshot/PVC/Secret 心跳 7ca8432。`storage-hb-7ca8432.json`
- namespacenetworkpolicies unsupported 静默（共享 silenceUnsupported）。`namespacenetworkpolicies-unsupported-gap.md`
- CronJob/Jobs 心跳（rebuild 前）7ca8432。`cron-jobs-hb-7ca8432.json`
- 角色/基本信息心跳 7ca8432。`roles-baseinfo-hb-7ca8432.json`
