# Gate A round7 — Job 菜单、HPA、Wujie keep-alive、次要 embed

- Time: 2026-11-02
- Ports: `30881` stock · `30883` rebuilt
- Admin; open-only / dialogs not saved

## Job more menu

Both sides expose `table-item-edit` / `table-item-rerun` / `table-item-delete`. **No `editYaml`.** CronJob YAML already passed in round6. Job YAML is not an operator action on this list (equivalent, not a rebuild regression).

## HPA (visual)

| 侧 | 自动化 JSON | 截图 |
| --- | --- | --- |
| 30881 | pass=false（未点进对话框） | `base-r7-hpa.png`：**更多操作** 含「编辑自动扩缩」 |
| 30883 | `detail-editHpa` 已点，host innerText 漏检 | `exp-r7-hpa.png`：**AUTOSCALING** 对话框 |

Operator 能力等价；locale keys 在 rebuilt 对话框上仍可见（与既有 locale 缺口一致，不作为 Gate A 失败）。

## Wujie keep-alive

deployments → pods → deployments：两侧 iframe=2、表格有行、无 ChunkLoadError、无新的 v3dist 4xx。

| 侧 | pass |
| --- | --- |
| 30881 | True |
| 30883 | True |

## Secondary open-only

Cluster routes (roles / serviceaccounts / volume-snapshots / alerts / alert-rules / networkpolicies / gateways / log-collections): **8/8 无 404、无 crash**（部分空表，环境数据不足）。

Project-level without workspace prefix (`/clusters/host/projects/dev-wms/{s2ibuilders,grayrelease,applications/composing}`): **两侧均为 Console 404**（host 路由，非 v3dist 差）。未再扩 workspace 路径。

SpringCloud probe **1 / 1**。v3dist HTTP errors **0 / 0**。

## Artifacts

`screenshots-ab/round7.json`，`{base,exp}-r7-*.png`
