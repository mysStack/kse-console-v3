# Gate A round10 — post-remount regression (`main.3e3fcb`)

- Time: 2026-11-03
- 30881 stock `main.558f452048e49db23323.js`
- 30883 rebuilt `main.3e3fcb7888ce0f1c36a8.js` (composing alias artifact)

## Results

| 项 | 30881 | 30883 |
| --- | --- | --- |
| 核心集群列表 11 | 11/11 | 11/11 |
| Deploy YAML | pass | pass |
| Roles detail `cluster-viewer` | pass | pass |
| ServiceAccount detail | pass | pass |
| composing JSON | fail (iframe innerText 空) | 同左 |
| composing 截图 | 非 404 | COMPOSED_APP tab + 空表（非 404） |
| SpringCloud probe | 1 | 1 |
| v3dist HTTP 4xx | 0 | 0 |

Core list/YAML/roles 在新制品上无回归。composing 自动化仍不可靠，视觉上 30883 保持 round9 修复（无 Wujie Not Found）。

## Artifacts

`screenshots-ab/round10.json`，`{base,exp}-r10-*.png`
