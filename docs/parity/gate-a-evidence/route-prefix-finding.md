# Finding: bare `/clusters/host/projects/...` list URLs 404

- Time: 2026-11-06
- Affects: Gate A screenshot defaults

## Observation

On **both** 30881 and 30883:

| Route | Result |
| --- | --- |
| `/clusters/host/projects/dev-wms/{deployments,pods,secrets,configmaps,services}` | host **页面未找到** |
| `/dev-workspace/clusters/host/projects/dev-wms/...` | real project lists |
| `/clusters/host/projects/dev-wms/secrets|configmaps/:name/detail` | V4-native detail (no Wujie) |

Earlier ab-screenshot defaults used bare `/clusters/host/...` lists. Identical 404 shells on both ports can **pixel-pass without exercising v3dist**.

## Fix

`docs/parity/tools/ab-screenshot.mjs` defaults now use `/dev-workspace/...` for project embeds.

## Detail actions (this wave)

Secret / ConfigMap detail YAML open→cancel and Service YAML open→cancel: **pass** on both ports  
(`detail-actions-c0aa6a9.json`).
