# Gate A round2c — detail/actions (frame table + data-test DOM click)

- Time: 2026-11-02T02:39:17.417Z
- Probe count: 1
- Probe: http://192.168.2.131:30881/kapis/clusters/host/resources.kubesphere.io/v1alpha3/customresourcedefinitions?name=configurations.springcloud.kubesphere.io #200

## Results
```json
[
  {
    "resource": "deployments",
    "listPath": "/clusters/host/deployments",
    "list": true,
    "frames": [
      "http://192.168.2.131:30881/clusters/host/deployments",
      "http://192.168.2.131:30881/consolev3/clusters/host/deployments",
      "http://192.168.2.131:30881/consolev3/dashboard"
    ],
    "detail_error": "locator.innerText: Error: strict mode violation: locator('body') resolved to 2 elements:\n    1) <body>…</body> aka locator('body').filter({ hasText: '扩展市场应用商店工作台adminplatform-' })\n    2) <body>…</body> aka locator('wujie-app body')\n\nCall log:\n  \u001b[2m- waiting for locator('body')\u001b[22m\n",
    "actions": {
      "editYaml": {
        "pass": true,
        "clicked": {
          "ok": true,
          "where": "http://192.168.2.131:30881/clusters/host/deployments",
          "name": "table-item-editYaml"
        },
        "sig": {
          "ace": 2,
          "dialog": 1,
          "xterm": 0,
          "pre": 1,
          "texts": []
        }
      },
      "scale": {
        "pass": false,
        "clicked": {
          "ok": false
        },
        "sig": {
          "ace": 0,
          "dialog": 0,
          "xterm": 0,
          "pre": 0,
          "texts": []
        }
      }
    },
    "menu_data_tests": [
      "table-item-edit",
      "table-item-editYaml",
      "table-item-redeploy",
      "table-item-delete"
    ]
  },
  {
    "resource": "pods",
    "listPath": "/clusters/host/pods",
    "list": true,
    "frames": [
      "http://192.168.2.131:30881/clusters/host/pods",
      "http://192.168.2.131:30881/consolev3/clusters/host/pods",
      "http://192.168.2.131:30881/consolev3/dashboard"
    ],
    "detail_error": "locator.innerText: Error: strict mode violation: locator('body') resolved to 2 elements:\n    1) <body>…</body> aka locator('body').filter({ hasText: '扩展市场应用商店工作台adminplatform-' })\n    2) <body>…</body> aka locator('wujie-app body')\n\nCall log:\n  \u001b[2m- waiting for locator('body')\u001b[22m\n",
    "actions": {
      "viewLog": {
        "pass": false,
        "clicked": {
          "ok": false
        },
        "sig": {
          "ace": 0,
          "dialog": 0,
          "xterm": 0,
          "pre": 0,
          "texts": []
        }
      },
      "terminal": {
        "pass": false,
        "clicked": {
          "ok": false
        },
        "sig": {
          "ace": 0,
          "dialog": 0,
          "xterm": 0,
          "pre": 0,
          "texts": []
        }
      }
    },
    "menu_data_tests": [
      "table-item-viewYaml",
      "table-item-delete"
    ]
  },
  {
    "resource": "services",
    "listPath": "/clusters/host/services",
    "list": true,
    "frames": [
      "http://192.168.2.131:30881/clusters/host/services",
      "http://192.168.2.131:30881/consolev3/clusters/host/services",
      "http://192.168.2.131:30881/consolev3/dashboard"
    ],
    "detail_error": "locator.innerText: Error: strict mode violation: locator('body') resolved to 2 elements:\n    1) <body>…</body> aka locator('body').filter({ hasText: '扩展市场应用商店工作台adminplatform-' })\n    2) <body>…</body> aka locator('wujie-app body')\n\nCall log:\n  \u001b[2m- waiting for locator('body')\u001b[22m\n",
    "actions": {
      "editYaml": {
        "pass": true,
        "clicked": {
          "ok": true,
          "where": "http://192.168.2.131:30881/clusters/host/services",
          "name": "table-item-editYaml"
        },
        "sig": {
          "ace": 2,
          "dialog": 1,
          "xterm": 0,
          "pre": 1,
          "texts": []
        }
      }
    },
    "menu_data_tests": [
      "table-item-edit",
      "table-item-editYaml",
      "table-item-editService",
      "table-item-editGateway",
      "table-item-delete"
    ]
  },
  {
    "resource": "configmaps",
    "listPath": "/clusters/host/configmaps",
    "list": true,
    "frames": [
      "http://192.168.2.131:30881/clusters/host/configmaps",
      "http://192.168.2.131:30881/consolev3/clusters/host/configmaps",
      "http://192.168.2.131:30881/consolev3/dashboard"
    ],
    "detail_error": "locator.innerText: Error: strict mode violation: locator('body') resolved to 2 elements:\n    1) <body>…</body> aka locator('body').filter({ hasText: '扩展市场应用商店工作台adminplatform-' })\n    2) <body>…</body> aka locator('wujie-app body')\n\nCall log:\n  \u001b[2m- waiting for locator('body')\u001b[22m\n",
    "actions": {
      "editYaml": {
        "pass": true,
        "clicked": {
          "ok": true,
          "where": "http://192.168.2.131:30881/clusters/host/configmaps",
          "name": "table-item-editYaml"
        },
        "sig": {
          "ace": 2,
          "dialog": 1,
          "xterm": 0,
          "pre": 1,
          "texts": []
        }
      }
    },
    "menu_data_tests": [
      "table-item-edit",
      "table-item-editYaml",
      "table-item-editConfigMap",
      "table-item-delete"
    ]
  },
  {
    "resource": "secrets",
    "listPath": "/clusters/host/secrets",
    "list": true,
    "frames": [
      "http://192.168.2.131:30881/clusters/host/secrets",
      "http://192.168.2.131:30881/consolev3/clusters/host/secrets",
      "http://192.168.2.131:30881/consolev3/dashboard"
    ],
    "detail_error": "locator.innerText: Error: strict mode violation: locator('body') resolved to 2 elements:\n    1) <body>…</body> aka locator('body').filter({ hasText: '扩展市场应用商店工作台adminplatform-' })\n    2) <body>…</body> aka locator('wujie-app body')\n\nCall log:\n  \u001b[2m- waiting for locator('body')\u001b[22m\n",
    "actions": {
      "editYaml": {
        "pass": true,
        "clicked": {
          "ok": true,
          "where": "http://192.168.2.131:30881/clusters/host/secrets",
          "name": "table-item-editYaml"
        },
        "sig": {
          "ace": 2,
          "dialog": 1,
          "xterm": 0,
          "pre": 1,
          "texts": []
        }
      }
    },
    "menu_data_tests": [
      "table-item-edit",
      "table-item-editYaml",
      "table-item-editSecret",
      "table-item-delete"
    ]
  }
]
```

## Log
```
MENU deployments table-item-edit,table-item-editYaml,table-item-redeploy,table-item-delete
ACTION deployments/editYaml pass=true clicked={"ok":true,"where":"http://192.168.2.131:30881/clusters/host/deployments","name":"table-item-editYaml"} sig={"ace":2,"dialog":1,"xterm":0,"pre":1,"texts":[]}
ACTION deployments/scale pass=false clicked={"ok":false} sig={"ace":0,"dialog":0,"xterm":0,"pre":0,"texts":[]}
MENU pods table-item-viewYaml,table-item-delete
ACTION pods/viewLog pass=false clicked={"ok":false} sig={"ace":0,"dialog":0,"xterm":0,"pre":0,"texts":[]}
ACTION pods/terminal pass=false clicked={"ok":false} sig={"ace":0,"dialog":0,"xterm":0,"pre":0,"texts":[]}
MENU services table-item-edit,table-item-editYaml,table-item-editService,table-item-editGateway,table-item-delete
ACTION services/editYaml pass=true clicked={"ok":true,"where":"http://192.168.2.131:30881/clusters/host/services","name":"table-item-editYaml"} sig={"ace":2,"dialog":1,"xterm":0,"pre":1,"texts":[]}
MENU configmaps table-item-edit,table-item-editYaml,table-item-editConfigMap,table-item-delete
ACTION configmaps/editYaml pass=true clicked={"ok":true,"where":"http://192.168.2.131:30881/clusters/host/configmaps","name":"table-item-editYaml"} sig={"ace":2,"dialog":1,"xterm":0,"pre":1,"texts":[]}
MENU secrets table-item-edit,table-item-editYaml,table-item-editSecret,table-item-delete
ACTION secrets/editYaml pass=true clicked={"ok":true,"where":"http://192.168.2.131:30881/clusters/host/secrets","name":"table-item-editYaml"} sig={"ace":2,"dialog":1,"xterm":0,"pre":1,"texts":[]}
```
