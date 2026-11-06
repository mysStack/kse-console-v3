# Soft: StorageClass list columns (08ad382)

After fixing list API to `kapis/storage.k8s.io/v1`, both sides show `nfs-csi` + `openebs-hostpath`.

| | 30881 sealed | 30883 rebuild |
|--|--|--|
| Rows | 2 | 2 |
| Notable columns | 存储类型（块/文件）+ 过滤 | 默认存储类 |
| YAML detail | pass | pass |

Not treated as rebuild-only functional gap; optional later UI parity if sealed column set must match pixel-for-pixel.
