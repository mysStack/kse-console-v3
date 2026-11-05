# Core V3 embed must-have (SpringCloud deferred)

## Scope decision

- **Deferred as plugin:** SpringCloud pages, locales, `MICROSERVICE_*` content.
- **Still watch (non-feature):** do not worsen `checkSpringCloudIfActive` probe cost in rebuilt v3dist.
- **In scope for Gate A:** non-SpringCloud V3 embeds still linked from console `release-4.1.5`.

- Locale after B-fix: old=5604, new=4027, missing=1601

## Core embeds

| Resource | Files | Missing-locale heuristic hits |
| --- | ---: | ---: |
| `pods` | 3 | 6 |
| `alert-rules` | 2 | 5 |
| `composing` | 2 | 0 |
| `cronjobs` | 2 | 0 |
| `daemonsets` | 2 | 0 |
| `ingresses` | 2 | 15 |
| `jobs` | 2 | 0 |
| `roles` | 2 | 0 |
| `s2ibuilders` | 2 | 0 |
| `services` | 2 | 7 |
| `statefulsets` | 2 | 0 |
| `volume-snapshots` | 2 | - |
| `volumes` | 2 | - |
| `alerts` | 1 | 5 |
| `base-info` | 1 | - |
| `configmaps` | 1 | 0 |
| `custom-monitoring` | 1 | - |
| `deployments` | 1 | 2 |
| `gateways` | 1 | 33 |
| `grayrelease` | 1 | 0 |
| `log-collections` | 1 | 4 |
| `networkpolicies` | 1 | 0 |
| `secrets` | 1 | 4 |
| `serviceAccounts` | 1 | - |
| `serviceaccounts` | 1 | 0 |

## Deferred SpringCloud embeds

- `configurations` (2 files)
- `microservicegateways` (2 files)
- `microservices` (2 files)
- `servicerouting` (2 files)
- `microservice-instances` (1 files)

## Next closure order

1. Runtime/contract verify against top core embeds: deployments, pods, configmaps, secrets, services, ingresses.
2. Do not bulk-import DBPARAM/KAFKA/EDGE/GPU enterprise locale packs.
3. Remaining ~1601 missing keys stay mostly plugin/enterprise C gaps unless a core embed proves need.
4. Gate A checklist: route/Action/RBAC/Wujie for core embeds + probe non-regression.

