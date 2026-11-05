# Gate A tools baseline

- Time: 2026-11-05T16:18:04Z
- ab-screenshot exit: 0
- ab pass: true (threshold maxDiffRatio=0.02)
- paths: 7

| Path | ratio | result |
| --- | ---: | --- |
| `/clusters/host/projects/dev-wms/deployments` | 0 | PASS |
| `/clusters/host/projects/dev-wms/pods` | 0.00675 | PASS |
| `/clusters/host/projects/dev-wms/configmaps` | 0 | PASS |
| `/clusters/host/projects/dev-wms/services` | 0 | PASS |
| `/dev-workspace/clusters/host/projects/dev-wms/composing` | 0.01487 | PASS |
| `/extensions/management` | ~0.000025 | PASS |
| `/extensions/marketplace` | 0 | PASS |

## Asset / manifest diff (sealed 4.1.5 vs live 30883 rebuild)

| metric | value |
| --- | ---: |
| oldFiles | 782 |
| newFiles | 250 |
| onlyOld | 578 |
| onlyNew | 46 |
| sizeChanged | 5 |
| oldAliases | 447 |
| newAliases | 31 |

File-count / ACE-chunk gap is expected; Gate A does not require hash or file-count parity.

## Artifacts

- `screenshots-ab/tooling/ab-screenshot-report.json`
- `screenshots-ab/tooling/30881__*.png` / `30883__*.png` / `diff__*.png`
- `asset-manifest-diff.json`

## Triage (fix-loop)

- No `pass=false` paths → **no V3 code change / rebuild required for today**.
- composing ratio highest but under threshold; known empty-state style drift vs stock (r9 note), not Wujie 404.
