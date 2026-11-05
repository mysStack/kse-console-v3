# Gate A round2d — detail-scoped actions

- Time: 2026-11-02T02:41:04.944Z
- Focus: deployments scale/YAML from detail MORE; pods logs/terminal from detail

## Results
```json
{
  "deployments": {
    "detail": {
      "ok": true,
      "name": "pms-server"
    },
    "more": {
      "ok": true,
      "dataTest": "detail-more",
      "where": "http://192.168.2.131:30881/clusters/host/deployments"
    },
    "menuDiff": [],
    "scale": {
      "ok": false,
      "sig": {
        "ace": 0,
        "dialog": 0,
        "xterm": 0,
        "pre": 0
      },
      "pass": false
    },
    "yaml": {
      "ok": true,
      "dataTest": "detail-editYaml",
      "where": "http://192.168.2.131:30881/clusters/host/deployments",
      "sig": {
        "ace": 2,
        "dialog": 1,
        "xterm": 0,
        "pre": 1
      },
      "pass": true
    }
  },
  "pods": {
    "detail": {
      "ok": true,
      "name": "wms-scheduling-29893120-kxwn2"
    },
    "logs": {
      "ok": true,
      "dataTest": "text:log",
      "where": "http://192.168.2.131:30881/clusters/host/pods",
      "sig": {
        "ace": 0,
        "dialog": 0,
        "xterm": 0,
        "pre": 0
      },
      "pass": false
    },
    "terminal": {
      "ok": false,
      "sig": {
        "ace": 0,
        "dialog": 0,
        "xterm": 0,
        "pre": 0
      },
      "pass": false
    },
    "detailTests": [
      "dashboard-header",
      "detail-attrs",
      "detail-delete",
      "detail-desc",
      "detail-title",
      "detail-viewYaml",
      "panel-container_pl",
      "panel-platform_information",
      "panel-platform_resources",
      "panel-recent_access",
      "panel-volume_pl"
    ]
  }
}
```

## Log
```
DEPLOY_DETAIL more={"ok":true,"dataTest":"detail-more","where":"http://192.168.2.131:30881/clusters/host/deployments"} menu=detail-delete,detail-edit,detail-editConfigTemplate,detail-editHpa,detail-editYaml
DEPLOY_SCALE {"ok":false,"sig":{"ace":0,"dialog":0,"xterm":0,"pre":0},"pass":false}
DEPLOY_YAML {"ok":true,"dataTest":"detail-editYaml","where":"http://192.168.2.131:30881/clusters/host/deployments","sig":{"ace":2,"dialog":1,"xterm":0,"pre":1},"pass":true}
POD_DETAIL_TESTS detail-viewYaml
POD_LOGS {"ok":true,"dataTest":"text:log","where":"http://192.168.2.131:30881/clusters/host/pods","sig":{"ace":0,"dialog":0,"xterm":0,"pre":0},"pass":false}
POD_TERM {"ok":false,"sig":{"ace":0,"dialog":0,"xterm":0,"pre":0},"pass":false}
```
