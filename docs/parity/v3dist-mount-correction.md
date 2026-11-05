# v3dist mount correction

Earlier mistake: rebuilt v3dist hostPath was mounted on `ks-console-v415-rea` (`:30881`), which must stay a full stock release-4.1.5 baseline.

## Fixed mapping

| Role | Deploy | Port | v3dist |
| --- | --- | ---: | --- |
| Baseline (complete release-4.1.5) | `ks-console-v415-rea` | 30881 | image-bundled `main.558f452048e49db23323.js` |
| Workloads / other | `ks-console` | 30880 | unchanged |
| Experiment (rebuilt parity) | `ks-console-v3dist-parity` | 30883 | hostPath `main.fde4b8733d31a10689e2.js` @ 8843ead |

Parity deploy uses the **same** release-4.1.5 console image as baseline; only `dist/v3dist` differs.

Time: 2026-11-02T02:47:34Z
