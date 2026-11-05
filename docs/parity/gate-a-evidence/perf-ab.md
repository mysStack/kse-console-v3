# Gate A performance A/B (30881 vs 30883)

- Time: 2026-11-05T16:26:05.909Z
- pass=true
- Rule: wallClock delta <= +3000ms OR <= +50%; v3dist transfer not >2x baseline (+500KB slack)
- Method: Playwright domcontentloaded + 4.5s settle (avoid networkidle hang)

| Path | 30881 ms | 30883 ms | Δms | transfer Δ | pass |
| --- | ---: | ---: | ---: | ---: | --- |
| `/clusters/host/projects/dev-wms/deployments` | 5648 | 5404 | -244 | -1082578 | true |
| `/clusters/host/projects/dev-wms/pods` | 5388 | 5161 | -227 | 194 | true |
| `/clusters/host/projects/dev-wms/configmaps` | 5062 | 4897 | -165 | 194 | true |
| `/clusters/host/projects/dev-wms/services` | 5140 | 4870 | -270 | 194 | true |
| `/dev-workspace/clusters/host/projects/dev-wms/composing` | 5184 | 4950 | -234 | -137946 | true |

JSON: `screenshots-ab/perf/perf-ab-report.json`
