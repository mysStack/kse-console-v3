# c0aa6a9 host image risk

- Time: 2026-11-06
- Decision: **do not** retarget `ks-console-v3dist-parity` to the 30881 merged image in this wave.

| Deploy | Port | Image |
| --- | ---: | --- |
| `ks-console-v415-rea` | 30881 | `ghcr.io/mysstack/ks-console:release-4.1.5-merged-20261102-ad724a3` |
| `ks-console-v3dist-parity` | 30883 | `ghcr.io/mysstack/ks-console:release-4.1.5-defer-actions-20261102-d475030` |

## Why keep the gap

- 30883 was stood up on the defer-actions host so Action/menu experiments stay isolated from the pristine baseline host.
- Switching 30883 to merged would mix two variables (host binary + v3dist) and invalidate the current “only remount static v3dist” reading of Gate A evidence.
- Screenshot A/B on c0aa6a9 still passed under this host gap; treat results as **v3dist behavior under defer-actions host**, not pure host-identical A/B.

## When to revisit

Only after an explicit decision to:
1. freeze a single host tag for both ports, and
2. re-run the full Gate A screenshot + perf set on that pair.
