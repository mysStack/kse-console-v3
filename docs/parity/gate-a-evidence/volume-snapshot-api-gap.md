# VolumeSnapshot list — resources API 404 (08ad382)

## Observation

Project page `/dev-workspace/.../volume-snapshots` on 30883 shows table empty plus `Not Found resource is not supported`. Sealed 30881 shows friendly “未发现卷快照”.

## API (both ports identical)

| Path | Result |
|------|--------|
| `resources.kubesphere.io/v1alpha3/.../volumesnapshots` | **404 resource is not supported** |
| `snapshot.storage.k8s.io/v1/.../volumesnapshots` | 200, items=0 |

## Fix

`VolumeSnapshotStore.getResourceUrl` → `kapis/snapshot.storage.k8s.io/v1`（并统一 apiVersion 到 v1）。同类：`volumeSnapshotClasses` / `volumeSnapshotContent`。

## Evidence

`snap-recheck-08ad382.json`；修复后需重建 30883 再验。
