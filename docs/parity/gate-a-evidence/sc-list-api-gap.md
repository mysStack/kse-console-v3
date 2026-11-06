# StorageClass list empty on rebuild (1d2f57c) — root cause

## Observation

- 30881 sealed list: `nfs-csi` + `openebs-hostpath` visible.
- 30883 rebuild list: empty / no known SC names.
- Detail `/clusters/host/storageclasses/openebs-hostpath` + **编辑 YAML** open/cancel: **both sides pass** once name is known (`sc-yaml-net-1d2f57c.json`).

## Network

| Side | List request | Result |
|------|--------------|--------|
| 30881 | `/clusters/host/kapis/storage.k8s.io/v1/storageclasses?...` | 200, items=2 |
| 30883 | `/kapis/clusters/host/resources.kubesphere.io/v1alpha3/storageclasses?...` | **404 resource is not supported** |

API probe (both ports): `resources.kubesphere.io/v1alpha3/storageclasses` 404; `kapis/storage.k8s.io/v1/storageclasses` 200.

## Fix direction

`StorageClassStore.getResourceUrl` was pinned to removed `resources.kubesphere.io/v1alpha3`; align to sealed `kapis/storage.k8s.io/v1` (via `getPath` → `getClusterUrl`).

## Not in scope here

- Host `nodes` / `projects` / `components` / CRD / `monitor-cluster` → both sides `consolev3/dashboard` (host V4-native).
- Cluster PV detail deep-links tried → dashboard both sides; list still usable.
