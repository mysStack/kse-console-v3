# Project roles list empty on 30883

- Time: 2026-11-06
- Path: `/dev-workspace/clusters/host/projects/dev-wms/roles`
- Artifact: `fd49fe6` on 30883

## Observation

| Port | Roles list |
| --- | --- |
| 30881 | `viewer` / `operator` present |
| 30883 | 未发现匹配的结果 / 总数：0（snip 含 Not Fo…） |

ServiceAccount `default` YAML open：两侧 pass。

## Next

抓 30883 Wujie 内 roles API 请求与 sealed 对比；查路由/module 名 `roles` vs `projectroles`。
