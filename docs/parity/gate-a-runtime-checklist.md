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
