# Soft: 宿主 PV / VolumeSnapshotClass 深链

liveCommit: `95cc975`

## 现象

- `/clusters/host/volumes`：30881 常落到 `consolev3/dashboard`；30883 可进存储侧栏，文案仍偏宿主壳。
- `/clusters/host/volume-snapshot-classes`：两侧均易落到 dashboard（V4 宿主路由 / Wujie 落点问题），非 rebuild-only API 缺口。

## 结论

记为 soft / host-native，不按 rebuild 缺陷修；继续优先 workspace 项目内资源对称。
