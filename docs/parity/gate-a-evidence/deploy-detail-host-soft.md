# Soft: Deployment 详情深链

liveCommit: `7ca8432`

## 现象

- `/deployments/wms-admin-server` 深链：两侧主文档多为宿主工具箱壳，未稳定进入 consolev3 详情正文。
- 列表页 + `table-item-editYaml` 仍可作为只读对称入口（见 `wl-yaml-7ca8432.json`）。

## 结论

host-native / soft；不以 rebuild-only 修详情深链。
