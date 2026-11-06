# Gap: S2I / 镜像构建器列表 unsupported 泄漏

liveCommit before fix: `95cc975`

## 现象

- 列表 URL：`kapis/.../resources.kubesphere.io/v1alpha3/.../s2ibuilders`
- 30881 / 30883 均返回 `404 resource is not supported`（集群未装 S2I CRD / 资源网关不支持）
- sealed 页面友好空态；rebuild 曾把 `Not Found resource is not supported` 泄漏进 iframe 文案

## 修复方向

复用 `stores/application/unsupported` 的 `unsupportedListResult`，在 `S2IBuilderStore.fetchList` 静默为空列表（与 applications 一致）。

## 非目标

不宣称 Gate A 关闭；不替换官方镜像；不 push。
