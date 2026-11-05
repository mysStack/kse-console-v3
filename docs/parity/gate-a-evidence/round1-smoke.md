# Gate A smoke evidence (mount-only v3dist)

- Time: 2026-11-02T02:26:14.721Z
- Base: `http://192.168.2.131:30881` (NodePort `ks-console-v415-rea`)
- Deploy: `kubesphere-system/ks-console-v415-rea`
- Pod: `ks-console-v415-rea-8777dc48c-2dhsd`
- Host image (unchanged): `ghcr.io/mysstack/ks-console:release-4.1.5-defer-actions-20261102-d475030`
- imageID: `ghcr.io/mysstack/ks-console@sha256:29fba0e139b34042cddb3fcc31e28fe1851bb2053acb95ad2302174c0e900e59`
- Override: hostPath `/opt/ks-console-v3dist-parity` -> `/opt/kubesphere/console/dist/v3dist` (readOnly)
- No second V4 image build

## In-pod provenance

```json
{"schemaVersion":1,"repository":"mysStack/kse-console-v3","ref":"feature/v3-parity","commit":"8843eadf162919f60c823192ea8ef30572aa9408","builtAt":"2026-11-01T15:52:45Z","builder":"docker:node:14-bullseye","publicPath":"/dist/v3dist/"}
```

## HTTP / HTML

- Public `/dist/v3dist/main.fde4b8733d31a10689e2.js` -> 200
- Authed `/consolev3/` HTML refs `main.fde4b8733d31a10689e2.js/.css`

## Core cluster embed list smoke (Playwright)

| Resource | Path | Pass | Wujie | Tables | main hash | v3 HTTP errors |
| --- | --- | --- | ---: | ---: | --- | ---: |
| deployments | `/clusters/host/deployments` | yes | 3 | 19 | hit | 0 |
| statefulsets | `/clusters/host/statefulsets` | yes | 3 | 19 | hit | 0 |
| daemonsets | `/clusters/host/daemonsets` | yes | 3 | 15 | hit | 0 |
| pods | `/clusters/host/pods` | yes | 3 | 19 | hit | 0 |
| services | `/clusters/host/services` | yes | 3 | 18 | hit | 0 |
| ingresses | `/clusters/host/ingresses` | yes | 3 | 10 | hit | 0 |
| jobs | `/clusters/host/jobs` | yes | 3 | 19 | hit | 0 |
| cronjobs | `/clusters/host/cronjobs` | yes | 3 | 17 | hit | 0 |
| secrets | `/clusters/host/secrets` | yes | 3 | 18 | hit | 0 |
| configmaps | `/clusters/host/configmaps` | yes | 3 | 18 | hit | 0 |
| volumes | `/clusters/host/volumes` | yes | 3 | 19 | hit | 0 |
| project-pods | `/clusters/host/projects/kubesphere-system/pods` | yes | 2 | 0 | hit | 0 |
| consolev3-root | `/consolev3/` | yes | 0 | 0 | hit | 0 |

Summary: pass 13/13, v3dist responses 214, main hash hits 26, HTTP errors 0.

Screenshots under `docs/parity/gate-a-evidence/screenshots/core-*.png`.

## Not done in this round

- Detail -> write/read action (YAML edit / scale / terminal) per resource
- RBAC negative cases
- Project-switch / `checkSpringCloudIfActive` probe cost comparison
- Side-by-side A/B against old packaged v3dist (old dir not remounted this round)

## Verdict

**Partial Gate A:** rebuilt v3dist is live via hostPath and core cluster list embeds load without ChunkLoad/asset errors. Full Gate A checklist still open on actions/RBAC/probe.
