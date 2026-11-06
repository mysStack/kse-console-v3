# Gap: IPPool unsupported

liveCommit before fix: `9b1819f`

## 现象

- `resources.kubesphere.io/v1alpha3/.../ippools` → `resource is not supported`
- `network.kubesphere.io/v1alpha1/ippools` → 404 page not found

## 修复

`IPPool.fetchList` 使用 `silenceUnsupportedListReject`。
