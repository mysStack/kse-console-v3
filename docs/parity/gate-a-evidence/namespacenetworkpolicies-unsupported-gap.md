# Gap: namespacenetworkpolicies unsupported

liveCommit before fix: `7ca8432`

## 现象

- `kapis/.../resources.kubesphere.io/v1alpha3/.../namespacenetworkpolicies` → `404 resource is not supported`
- 同批探测：`applications` / `s2ibuilders` / `volumesnapshots` 亦 unsupported（后两者已有静默或 native API 修复）

## 修复

`NetworkPolicy.fetchList` 复用 `silenceUnsupportedListReject`（与 S2I/applications 一致）。
