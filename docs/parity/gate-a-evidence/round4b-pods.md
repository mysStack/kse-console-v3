# Gate A round4 — pods terminal/logs + switch probe (corrected)

- Time: 2026-11-02T04:15:00Z (logs recheck round4i)
- Pod under test: `ks-console-v415-rea-658ff66b98-59kz8` / container `ks-console`
- Ports: `30881` stock release-4.1.5 v3dist · `30883` rebuilt v3dist hostPath

## Results

| 项 | 30881 baseline (stock v3dist) | 30883 parity (rebuilt) |
| --- | --- | --- |
| Terminal (`detail-terminal`) | pass | pass |
| Container detail tabs | `RESOURCE_STATUS`, `ENVIRONMENT_VARIABLE_PL` only | `RESOURCE_STATUS`, `MONITORING`, `ENVIRONMENT_VARIABLE_PL`, `CONTAINER_LOGS` |
| CONTAINER_LOGS tab visible | false | true |
| Tab click → live log stream | n/a (no tab) | **pass** (screenshot `exp-r4i-after-click.png`) |
| Direct host `/logs` URL | stays on resource-status; no logs UI | host URL `/logs` but embed often remounts on `RESOURCE_STATUS` (`exp-r4i-direct-logs.png`) |
| Logs operator verdict | stock gap — cannot A/B | pass via tab navigation |
| Switch SpringCloud probe total | 1 | 1 |

### Notes

- Stock baseline container detail lacks `CONTAINER_LOGS` / `MONITORING`; rebuilt is a **superset**, not a regression.
- Authoritative logs check is screenshot of active `CONTAINER_LOGS` + streamed lines after `a[href*="/logs"]` click. Wujie/DOM `innerText` often empty across frames; do not use host-URL-only or `pre>0` alone.
- Earlier automated `pre>0` on baseline `/logs` was a false positive (URL stayed on resource-status).
- Probe count remained 1 per side across project/workspace navigations.

### Artifacts

- `screenshots-ab/round4.json`, `round4d.json` — terminal / switch
- `screenshots-ab/round4h-logs.json`, `round4i-logs.json` — logs automation
- `screenshots-ab/base-r4h-logs.png`, `exp-r4h-logs.png`
- `screenshots-ab/base-r4i-after-click.png`, `exp-r4i-after-click.png`
- `screenshots-ab/base-r4i-direct-logs.png`, `exp-r4i-direct-logs.png`
