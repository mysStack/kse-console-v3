# resources.kubesphere.io unsupported 扫描（第三轮）

liveCommit: `9b1819f`

## 明确 404 / not supported

| module | 处理 |
|--------|------|
| applications | 已有 unsupportedListResult |
| s2ibuilders | 已静默 |
| namespacenetworkpolicies | 已静默 |
| volumesnapshots / storageclasses | 已改 native API |
| ippools | 本轮静默 |
| strategies（灰度） | 本轮 grayrelease fetchList 静默 |
| gateways / routers | 宿主页 soft；Gateway 多用自定义 URL |
| volumesnapshotclasses/contents | 宿主 soft / 已有 snapshot stores |
| resourcequotas（resources v1alpha3 列表） | Quota 主路径用 v1alpha2/quotas |
| customresourcedefinitions / validatingwebhook | 宿主 dashboard soft |

## 结论

继续优先修「项目内 v3dist 仍会打到 unsupported 列表」的 store；宿主 dashboard 对称页记 soft。
