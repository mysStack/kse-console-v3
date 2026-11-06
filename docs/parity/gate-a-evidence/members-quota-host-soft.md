# Soft: 项目成员 / 配额深链

liveCommit: `7ca8432`

## 现象

- `/.../members`、`/.../quota`：30881 与 30883 均落到 `consolev3/dashboard`（宿主 Wujie 路由），非 rebuild-only。
- `/.../base-info`、`/.../roles`：两侧 v3dist-ok。

## 结论

记 soft / host-native；继续优先 workspace 内已挂 v3dist 的列表页。
