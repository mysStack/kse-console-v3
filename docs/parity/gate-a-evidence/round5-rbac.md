# Gate A round5 — RBAC negative A/B (corrected ports)

- Time: 2026-11-02
- Ports: `30881` stock release-4.1.5 v3dist · `30883` rebuilt v3dist hostPath
- Account: ephemeral `gatea-viewer-*` (`platform-regular` + `dev-workspace-viewer` + `dev-wms/viewer`)
- Credentials: 0600 temp files only; deleted after run (not in repo/logs)
- Namespace: `dev-wms` · sample Deployment: `wms-admin-server`

## kubectl auth (setup)

| check | result |
| --- | --- |
| list deployments.apps in dev-wms | yes |
| create/update/patch/delete deployments.apps | no |
| list deployments.apps in kubesphere-system | no |

## Browser + API A/B

| 项 | 30881 stock | 30883 rebuilt |
| --- | --- | --- |
| OAuth login | 200 | 200 |
| Project overview `/clusters/host/projects/dev-wms/overview` | pass | pass |
| Host list `/…/deployments` | 404 (host route) | 404 (host route) |
| Detail `/…/deployments/wms-admin-server/resource-status` | pass (read UI) | pass (read UI) |
| Edit YAML / Delete visible on detail | false | false |
| API GET deployment | 200 | 200 |
| API PATCH deployment | 403 | 403 |
| API POST deployment | 403 | 403 |
| A/B equivalent (read + write deny) | — | **yes** |

### Notes

- Host V4 route `/clusters/host/projects/:ns/deployments` returns Console 404 for this viewer on **both** sides; detail deep-link still renders. Not a rebuilt-v3dist regression.
- Direct `/consolev3/…/deployments` did not yield a stable table for the viewer in automation (blank/overview fallback); operator-facing negative proof is API 403 + detail without write actions.
- Temp user/bindings removed after evidence capture.

### Artifacts

- `screenshots-ab/round5-rbac.json`, `round5b-rbac.json`, `round5c-rbac-routes.json`, `round5d-rbac.json`
- `screenshots-ab/{base,exp}-r5-rbac-*.png`, `{base,exp}-r5d-rbac-*.png`
