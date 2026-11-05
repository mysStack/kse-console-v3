# Gate A round6 — remaining core detail / YAML (30881 vs 30883)

- Time: 2026-11-02
- Baseline `:30881` stock v3dist · Experiment `:30883` rebuilt v3dist
- Admin session; YAML/HPA opened only, no save (131 read-mostly)

## Resource A/B

| Resource | List both | Detail both | YAML / view | Notes |
| --- | --- | --- | --- | --- |
| statefulsets | pass | pass | YAML pass both | `v4-pvc-sts-7fa` |
| daemonsets | pass | pass | YAML pass both (retry `round6b`) | first exp pass failed `no-table` after detail remount |
| jobs | pass | pass | YAML not opened both | list kebab present; `editYaml` click missed both sides |
| cronjobs | pass | pass | YAML pass both | `wms-scheduling` |
| ingresses | pass | pass | YAML pass both | `prometheus-ingress` |
| configmaps | pass | pass | YAML pass both | |
| secrets | pass | pass | view only | no YAML action required |
| volumes | pass | pass | view only | |

v3dist HTTP errors: **0 / 0**. SpringCloud probe: **1 / 1**.

## HPA recheck

| 侧 | Result | Evidence |
| --- | --- | --- |
| 30883 | **pass** — `AUTOSCALING` dialog (`detail-editHpa`) | `exp-r6-deploy-hpa.png`, `exp-r6b-deploy-hpa.png` |
| 30881 | **not captured** — `更多操作` visible on detail; automation opened YAML instead of HPA (`text-fallback`) | `base-r6-deploy-hpa.png`, `base-r6b-deploy-hpa.png` |

Same pattern as round3 (exp HPA stable; baseline automation flaky). Not treated as rebuilt regression.

## Artifacts

- `screenshots-ab/round6.json`, `round6b.json`
- `screenshots-ab/{base,exp}-r6-*-detail.png`, `*-yaml.png`
- `screenshots-ab/{base,exp}-r6b-*.png`
