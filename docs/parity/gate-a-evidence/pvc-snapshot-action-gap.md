# PVC more-actions gap: 创建快照

- Time: 2026-11-06
- Artifact: 30883 `48f97d7` vs sealed 30881
- Resource: `dev-db/data-postgresql-dev-0`

## Observation

| Port | 更多操作 |
| --- | --- |
| 30881 sealed | 编辑 YAML / 克隆 / 扩展 / 删除 |
| 30883 rebuild | 编辑 YAML / 克隆 / **创建快照** / 扩展 / 删除 |

PVC YAML open→cancel: both pass.
Jobs list filters: both `失败/已完成/运行中` (JOB_STATUS, expected).
Jobs YAML: both open; cancel close flaky on both (`closed:false`).

## Implication

Rebuild exposes Volume Snapshot create action that sealed build does not. Treat as Gate A behavior gap (extra capability), not a missing feature.

## Next

Locate enablement condition (`hasVolumeSnapshot` / globals / cluster config) and align with sealed hide rules if intentional.
