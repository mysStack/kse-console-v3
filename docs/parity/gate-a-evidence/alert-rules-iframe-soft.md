# Soft: 告警规则组 iframe 偶发未挂载

liveCommit: `7ca8432`

## 现象

- 同路径 `/alert-rules` 此前多次 v3dist-ok（见 `alert-rules-mon-7ca8432.json` / `ingress-alert-7ca8432.json`）
- 后续抽检偶发主文档停在宿主壳、无 `consolev3` frame（两侧对称）

## 结论

记 soft / 探针与 Wujie 时序；不按 rebuild-only 缺陷处理。
