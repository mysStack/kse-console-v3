# Soft: 宿主集群级列表文案不对称

liveCommit: `7ca8432`

## 现象

- `/clusters/host/{services,jobs,configmaps,secrets}`：两侧 frameUrl 均进 `consolev3/clusters/host/...`
- sealed 抽到真实列表正文；rebuild 常抽到「host 集群 / 概览 / 节点 …」侧栏壳文案（分类仍被 needle 命中为 v3dist-ok）

## 结论

暂记 soft / 等待与壳层采样偏差；优先用项目内 `dev-workspace/...` 路由做硬门槛。后续可加长等待或按「非侧栏标题」收紧判定。
