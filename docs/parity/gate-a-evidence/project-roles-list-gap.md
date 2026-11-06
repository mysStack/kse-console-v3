# Project roles list empty on 30883

- Time: 2026-11-06
- Path: `/dev-workspace/clusters/host/projects/dev-wms/roles`
- Artifact: `fd49fe6` on 30883 (pre-fix)

## Observation

| Port | Roles list |
| --- | --- |
| 30881 | `viewer` / `operator` present |
| 30883 | 未发现匹配的结果 / 总数：0（snip 含 Not Fo…） |

ServiceAccount `default` YAML open：两侧 pass。

## Root cause

30883 `RoleStore` called `kapis/iam.kubesphere.io/v1alpha2/.../roles` → **404**.  
Working paths: `iam.v1beta1` and `resources.v1alpha3` (sealed list uses the latter).

## Fix

`src/stores/role.js`: switch list/template URLs from `v1alpha2` → `v1beta1`.
