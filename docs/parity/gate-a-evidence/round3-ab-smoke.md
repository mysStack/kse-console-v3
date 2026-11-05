# Gate A round3 — corrected A/B (30881 vs 30883)

- Time: 2026-11-02T03:44:20.921Z
- Baseline `:30881` `ks-console-v415-rea` stock v3dist `main.558f452048e49db23323`
- Experiment `:30883` `ks-console-v3dist-parity` rebuilt `main.fde4b8733d31a10689e2` @ 8843ead
- Same host image family (release-4.1.5); only v3dist differs on experiment via hostPath
- Prior 30881-mounted evidence invalidated

## Summary

```json
{
  "base": {
    "list_pass": 11,
    "list_total": 11,
    "list_fail": [],
    "actions": {
      "detail": {
        "ok": true,
        "name": "global-wms-server",
        "hasStatus": true
      },
      "yaml": {
        "ok": true,
        "dt": "table-item-editYaml",
        "sig": {
          "ace": 2,
          "dialog": 1,
          "xterm": 0,
          "pre": 1
        },
        "pass": true
      },
      "svcYaml": {
        "ok": true,
        "dt": "table-item-editYaml",
        "sig": {
          "ace": 2,
          "dialog": 1,
          "xterm": 0,
          "pre": 1
        },
        "pass": true
      },
      "hpa": {
        "ok": false,
        "sig": {
          "ace": 0,
          "dialog": 1,
          "xterm": 0,
          "pre": 0
        },
        "pass": false
      },
      "v3_total": 245,
      "main_hits": 15,
      "v3_errors": 0,
      "probe": 1
    },
    "probe": 1
  },
  "exp": {
    "list_pass": 11,
    "list_total": 11,
    "list_fail": [],
    "actions": {
      "detail": {
        "ok": true,
        "name": "oms-server",
        "hasStatus": false
      },
      "yaml": {
        "ok": true,
        "dt": "table-item-editYaml",
        "sig": {
          "ace": 2,
          "dialog": 1,
          "xterm": 0,
          "pre": 1
        },
        "pass": true
      },
      "svcYaml": {
        "ok": true,
        "dt": "table-item-editYaml",
        "sig": {
          "ace": 2,
          "dialog": 1,
          "xterm": 0,
          "pre": 1
        },
        "pass": true
      },
      "hpa": {
        "ok": true,
        "dt": "detail-editHpa",
        "sig": {
          "ace": 0,
          "dialog": 1,
          "xterm": 0,
          "pre": 0
        },
        "pass": true
      },
      "v3_total": 260,
      "main_hits": 30,
      "v3_errors": 0,
      "probe": 1
    },
    "probe": 1
  }
}
```

## List rows

| Side | Path | Pass | Rows | mainHit | errors |
| --- | --- | --- | ---: | --- | ---: |
| base | `/clusters/host/deployments` | yes | 10 | true | 0 |
| base | `/clusters/host/statefulsets` | yes | 10 | true | 0 |
| base | `/clusters/host/daemonsets` | yes | 6 | true | 0 |
| base | `/clusters/host/pods` | yes | 10 | true | 0 |
| base | `/clusters/host/services` | yes | 10 | true | 0 |
| base | `/clusters/host/ingresses` | yes | 2 | true | 0 |
| base | `/clusters/host/jobs` | yes | 10 | true | 0 |
| base | `/clusters/host/cronjobs` | yes | 8 | true | 0 |
| base | `/clusters/host/configmaps` | yes | 10 | true | 0 |
| base | `/clusters/host/secrets` | yes | 10 | true | 0 |
| base | `/clusters/host/volumes` | yes | 10 | true | 0 |
| exp | `/clusters/host/deployments` | yes | 10 | true | 0 |
| exp | `/clusters/host/statefulsets` | yes | 10 | true | 0 |
| exp | `/clusters/host/daemonsets` | yes | 6 | true | 0 |
| exp | `/clusters/host/pods` | yes | 10 | true | 0 |
| exp | `/clusters/host/services` | yes | 10 | true | 0 |
| exp | `/clusters/host/ingresses` | yes | 2 | true | 0 |
| exp | `/clusters/host/jobs` | yes | 10 | true | 0 |
| exp | `/clusters/host/cronjobs` | yes | 8 | true | 0 |
| exp | `/clusters/host/configmaps` | yes | 10 | true | 0 |
| exp | `/clusters/host/secrets` | yes | 10 | true | 0 |
| exp | `/clusters/host/volumes` | yes | 10 | true | 0 |

## Actions

```json
{
  "base": {
    "detail": {
      "ok": true,
      "name": "global-wms-server",
      "hasStatus": true
    },
    "yaml": {
      "ok": true,
      "dt": "table-item-editYaml",
      "sig": {
        "ace": 2,
        "dialog": 1,
        "xterm": 0,
        "pre": 1
      },
      "pass": true
    },
    "svcYaml": {
      "ok": true,
      "dt": "table-item-editYaml",
      "sig": {
        "ace": 2,
        "dialog": 1,
        "xterm": 0,
        "pre": 1
      },
      "pass": true
    },
    "hpa": {
      "ok": false,
      "sig": {
        "ace": 0,
        "dialog": 1,
        "xterm": 0,
        "pre": 0
      },
      "pass": false
    },
    "v3_total": 245,
    "main_hits": 15,
    "v3_errors": 0,
    "probe": 1
  },
  "exp": {
    "detail": {
      "ok": true,
      "name": "oms-server",
      "hasStatus": false
    },
    "yaml": {
      "ok": true,
      "dt": "table-item-editYaml",
      "sig": {
        "ace": 2,
        "dialog": 1,
        "xterm": 0,
        "pre": 1
      },
      "pass": true
    },
    "svcYaml": {
      "ok": true,
      "dt": "table-item-editYaml",
      "sig": {
        "ace": 2,
        "dialog": 1,
        "xterm": 0,
        "pre": 1
      },
      "pass": true
    },
    "hpa": {
      "ok": true,
      "dt": "detail-editHpa",
      "sig": {
        "ace": 0,
        "dialog": 1,
        "xterm": 0,
        "pre": 0
      },
      "pass": true
    },
    "v3_total": 260,
    "main_hits": 30,
    "v3_errors": 0,
    "probe": 1
  }
}
```

## Probes (checkSpringCloudIfActive CRD)

- base: 1
- exp: 1

## Log
```
LIST 30881-baseline /clusters/host/deployments pass=true rows=10 mainHit=true bad=0
LIST 30881-baseline /clusters/host/statefulsets pass=true rows=10 mainHit=true bad=0
LIST 30881-baseline /clusters/host/daemonsets pass=true rows=6 mainHit=true bad=0
LIST 30881-baseline /clusters/host/pods pass=true rows=10 mainHit=true bad=0
LIST 30881-baseline /clusters/host/services pass=true rows=10 mainHit=true bad=0
LIST 30881-baseline /clusters/host/ingresses pass=true rows=2 mainHit=true bad=0
LIST 30881-baseline /clusters/host/jobs pass=true rows=10 mainHit=true bad=0
LIST 30881-baseline /clusters/host/cronjobs pass=true rows=8 mainHit=true bad=0
LIST 30881-baseline /clusters/host/configmaps pass=true rows=10 mainHit=true bad=0
LIST 30881-baseline /clusters/host/secrets pass=true rows=10 mainHit=true bad=0
LIST 30881-baseline /clusters/host/volumes pass=true rows=10 mainHit=true bad=0
ACTIONS 30881-baseline {"detail":{"ok":true,"name":"global-wms-server","hasStatus":true},"yaml":{"ok":true,"dt":"table-item-editYaml","sig":{"ace":2,"dialog":1,"xterm":0,"pre":1},"pass":true},"svcYaml":{"ok":true,"dt":"table-item-editYaml","sig":{"ace":2,"dialog":1,"xterm":0,"pre":1},"pass":true},"hpa":{"ok":false,"sig":{"ace":0,"dialog":1,"xterm":0,"pre":0},"pass":false},"v3_total":245,"main_hits":15,"v3_errors":0,"probe":1}
LIST 30883-parity /clusters/host/deployments pass=true rows=10 mainHit=true bad=0
LIST 30883-parity /clusters/host/statefulsets pass=true rows=10 mainHit=true bad=0
LIST 30883-parity /clusters/host/daemonsets pass=true rows=6 mainHit=true bad=0
LIST 30883-parity /clusters/host/pods pass=true rows=10 mainHit=true bad=0
LIST 30883-parity /clusters/host/services pass=true rows=10 mainHit=true bad=0
LIST 30883-parity /clusters/host/ingresses pass=true rows=2 mainHit=true bad=0
LIST 30883-parity /clusters/host/jobs pass=true rows=10 mainHit=true bad=0
LIST 30883-parity /clusters/host/cronjobs pass=true rows=8 mainHit=true bad=0
LIST 30883-parity /clusters/host/configmaps pass=true rows=10 mainHit=true bad=0
LIST 30883-parity /clusters/host/secrets pass=true rows=10 mainHit=true bad=0
LIST 30883-parity /clusters/host/volumes pass=true rows=10 mainHit=true bad=0
ACTIONS 30883-parity {"detail":{"ok":true,"name":"oms-server","hasStatus":false},"yaml":{"ok":true,"dt":"table-item-editYaml","sig":{"ace":2,"dialog":1,"xterm":0,"pre":1},"pass":true},"svcYaml":{"ok":true,"dt":"table-item-editYaml","sig":{"ace":2,"dialog":1,"xterm":0,"pre":1},"pass":true},"hpa":{"ok":true,"dt":"detail-editHpa","sig":{"ace":0,"dialog":1,"xterm":0,"pre":0},"pass":true},"v3_total":260,"main_hits":30,"v3_errors":0,"probe":1}
```

## Deploy image identity

- baseline image: `ghcr.io/mysstack/ks-console:release-4.1.5-defer-actions-20261102-a516994`
- parity image: `ghcr.io/mysstack/ks-console:release-4.1.5-defer-actions-20261102-d475030`
- Note: host image tags currently differ slightly (`a516994` vs `d475030`); A/B isolate is still v3dist hostPath on parity only.
