# Must-have subset draft (from attribution + embed scan)

## Business chunk aliases

| Alias | In old 4.1.5 | In new rebuild | Notes |
| --- | --- | --- | --- |
| `main.js` | Y | Y |  |
| `common.js` | Y | Y |  |
| `projects.js` | Y | Y |  |
| `clusters.js` | Y | Y |  |
| `workspaces.js` | Y | Y |  |
| `access.js` | Y | Y |  |
| `actions.js` | Y | Y |  |
| `console.js` | Y | Y |  |
| `devops.js` | Y | Y |  |
| `fedprojects.js` | Y | Y |  |
| `settings.js` | Y | Y |  |
| `terminal.js` | Y | Y |  |
| `apps.js` | N | Y | NEW_ONLY |
| `edgewize.js` | Y | N | OLD_ONLY — likely KSE pack / missing entry |
| `nodegroup.js` | Y | N | OLD_ONLY — likely KSE pack / missing entry |
| `observability.js` | Y | N | OLD_ONLY — likely KSE pack / missing entry |
| `vendor.js` | Y | Y |  |
| `terminalEntry.js` | N | Y | NEW_ONLY |
| `react-ace.js` | Y | Y |  |

## Locale gap strategy confirmation

- A/B/C = {'A': 1, 'B_candidate': 34, 'C': 1600, 'D_candidate': 86}
- Do **not** import all 1635 missing keys.
- First must-have locale recovery should follow embedded routes still on V3, plus SpringCloud/microservice and any OLD_ONLY aliases above that are still linked from V4.

## Embed scan signal (heuristic)

- Scanned roots: /home/bruce/code/ks-develop/console, /home/bruce/code/ks-develop/console-release-415, /home/bruce/code/ks-develop/console-v415-rea
- Embed-related files: 629
- Top resource-like tokens:
  - `consolev3`: 242
  - `question`: 54
  - `close`: 52
  - `name`: 48
  - `chevron-down`: 30
  - `add`: 28
  - `caret-down`: 26
  - `information`: 24
  - `exclamation`: 24
  - `docker`: 24
  - `data`: 22
  - `check`: 20
  - `trash`: 20
  - `ippools`: 20
  - `branch`: 18
  - `timed-task`: 16
  - `project`: 16
  - `pod`: 16
  - `cluster`: 14
  - `exporter`: 14
  - `label`: 14
  - `nodes`: 14
  - `edgeappsets`: 14
  - `dashboard`: 13
  - `node`: 12

## Next implementation order

1. Confirm whether V4 still navigates to edgewize/nodegroup/observability V3 entries; if yes, those are hard must-haves for Gate A.
2. Fix B keys that are referenced by live src components (alerting/custom scaling/support) — small wins, source already present.
3. Intersect remaining C keys with active embed routes only.
4. Keep ACE mode count as editor-capability verify, not full restore.


> Update 2026-11-02: SpringCloud feature parity deferred as plugin/extension. Gate A must-have excludes SpringCloud pages/locales; only avoid worsening `checkSpringCloudIfActive` probe cost.
