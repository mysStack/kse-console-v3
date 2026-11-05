# Gate A round4 — pods logs/terminal + project switch probe

- Time: 2026-11-02T03:52:23.241Z
- Baseline `:30881` stock `main.558f452048e49db23323`
- Experiment `:30883` rebuilt `main.fde4b8733d31a10689e2`
- Mode: read-mostly (open logs/terminal UI; no mutate)

## Results
```json
{
  "base": {
    "label": "30881",
    "pod": {
      "ok": true,
      "name": "wms-scheduling-29893190-kmzsx",
      "rowText": " wms-scheduling-29893190-kmzsx RUNNING PODS.PHASES.RUNNING NODE_IP 10.42.0.62 2026-11-02 11:50:00 VIEW_YAML DELETE"
    },
    "podDetailTests": [
      "detail-viewYaml",
      "panel-container_pl",
      "panel-volume_pl"
    ],
    "container": {
      "ok": false
    },
    "containerTests": [
      "detail-viewYaml"
    ],
    "logs": {
      "ok": false,
      "sig": {
        "ace": 0,
        "dialog": 0,
        "xterm": 0,
        "pre": 0
      },
      "pass": false
    },
    "terminal": {
      "ok": true,
      "via": "text",
      "sig": {
        "ace": 0,
        "dialog": 0,
        "xterm": 0,
        "pre": 0
      },
      "pass": false
    },
    "switch": {
      "routes": [
        {
          "path": "/clusters/host/projects",
          "notFound": false,
          "probeDelta": 0,
          "ms": 3994,
          "url": "http://192.168.2.131:30881/clusters/host/projects/user",
          "body": "扩展市场 应用商店 工作台 admin platform-admin host 集群 概览 节点 集群节点 项目 应用负载 工作负载 任务 容器组 服务 应用路由 配置 保密字典 配置字典 服务帐户 定制资源定义 存储 持久卷声明 存储类 集群设置 基本信息 集群可见性 集群成员"
        },
        {
          "path": "/clusters/host/projects/kubesphere-system/pods",
          "notFound": false,
          "probeDelta": 0,
          "ms": 4088,
          "url": "http://192.168.2.131:30881/clusters/host/projects/kubesphere-system/pods",
          "body": "扩展市场 应用商店 工作台 admin platform-admin 项目 kubesphere-system 编辑 更多操作 属性 状态 活跃 集群host 企业空间system-workspace 创建时间2026-03-03 16:24:46 创建者- 概览 容器组 网关 "
        },
        {
          "path": "/clusters/host/projects/default/pods",
          "notFound": false,
          "probeDelta": 0,
          "ms": 3964,
          "url": "http://192.168.2.131:30881/clusters/host/projects/default/pods",
          "body": "扩展市场 应用商店 工作台 admin platform-admin 项目 default 编辑 更多操作 属性 状态 活跃 集群host 企业空间system-workspace 创建时间2026-03-03 16:21:25 创建者- 概览 容器组 网关 配额 元数据 已挂载"
        },
        {
          "path": "/clusters/host/deployments",
          "notFound": false,
          "probeDelta": 0,
          "ms": 4136,
          "url": "http://192.168.2.131:30881/clusters/host/deployments",
          "body": ""
        },
        {
          "path": "/clusters/host/pods",
          "notFound": false,
          "probeDelta": 0,
          "ms": 3649,
          "url": "chrome-error://chromewebdata/",
          "body": ""
        },
        {
          "path": "/clusters/host/services",
          "notFound": false,
          "probeDelta": 0,
          "ms": 3563,
          "url": "chrome-error://chromewebdata/",
          "body": ""
        },
        {
          "path": "/workspaces/system-workspace",
          "notFound": false,
          "probeDelta": 0,
          "ms": 3591,
          "url": "chrome-error://chromewebdata/",
          "body": ""
        },
        {
          "path": "/workspaces/dev-workspace",
          "notFound": false,
          "probeDelta": 0,
          "ms": 3578,
          "url": "chrome-error://chromewebdata/",
          "body": ""
        }
      ],
      "probe_total": 1,
      "probe_delta": 0,
      "probes": [
        {
          "url": "http://192.168.2.131:30881/kapis/clusters/host/resources.kubesphere.io/v1alpha3/customresourcedefinitions?name=configurations.springcloud.kubesphere.io",
          "status": 200,
          "ts": 1793591399862
        }
      ]
    },
    "v3": {
      "total": 67,
      "main_hits": 5,
      "errors": 0
    }
  },
  "exp": {
    "label": "30883",
    "pod": {
      "ok": true,
      "name": "wms-admin-29893190-h9g76",
      "rowText": " wms-admin-29893190-h9g76 RUNNING RUNNING NODE_IP 10.42.0.33 2026-11-02 11:50:00 VIEW_YAML DELETE"
    },
    "podDetailTests": [
      "detail-viewYaml",
      "panel-container_pl",
      "panel-platform_information",
      "panel-platform_resources",
      "panel-recent_access",
      "panel-volume_pl"
    ],
    "container": {
      "ok": false
    },
    "containerTests": [
      "detail-viewYaml"
    ],
    "logs": {
      "ok": false,
      "sig": {
        "ace": 0,
        "dialog": 0,
        "xterm": 0,
        "pre": 0
      },
      "pass": false
    },
    "terminal": {
      "ok": true,
      "via": "text",
      "sig": {
        "ace": 0,
        "dialog": 0,
        "xterm": 0,
        "pre": 0
      },
      "pass": false
    },
    "switch": {
      "routes": [
        {
          "path": "/clusters/host/projects",
          "notFound": false,
          "probeDelta": 0,
          "ms": 13262,
          "url": "http://192.168.2.131:30883/clusters/host/projects/user",
          "body": "扩展市场 应用商店 工作台 admin platform-admin host 集群 概览 节点 集群节点 项目 应用负载 工作负载 任务 容器组 服务 应用路由 配置 保密字典 配置字典 服务帐户 定制资源定义 存储 持久卷声明 存储类 集群设置 基本信息 集群可见性 集群成员"
        },
        {
          "path": "/clusters/host/projects/kubesphere-system/pods",
          "notFound": false,
          "probeDelta": 0,
          "ms": 3926,
          "url": "http://192.168.2.131:30883/clusters/host/projects/kubesphere-system/pods",
          "body": "扩展市场 应用商店 工作台 admin platform-admin 项目 kubesphere-system 编辑 更多操作 属性 状态 活跃 集群host 企业空间system-workspace 创建时间2026-03-03 16:24:46 创建者- 概览 容器组 网关 "
        },
        {
          "path": "/clusters/host/projects/default/pods",
          "notFound": false,
          "probeDelta": 0,
          "ms": 3913,
          "url": "http://192.168.2.131:30883/clusters/host/projects/default/pods",
          "body": "扩展市场 应用商店 工作台 admin platform-admin 项目 default 编辑 更多操作 属性 状态 活跃 集群host 企业空间system-workspace 创建时间2026-03-03 16:21:25 创建者- 概览 容器组 网关 配额 元数据 已挂载"
        },
        {
          "path": "/clusters/host/deployments",
          "notFound": false,
          "probeDelta": 0,
          "ms": 4104,
          "url": "http://192.168.2.131:30883/clusters/host/deployments",
          "body": ""
        },
        {
          "path": "/clusters/host/pods",
          "notFound": false,
          "probeDelta": 0,
          "ms": 3966,
          "url": "http://192.168.2.131:30883/clusters/host/pods",
          "body": ""
        },
        {
          "path": "/clusters/host/services",
          "notFound": false,
          "probeDelta": 0,
          "ms": 4014,
          "url": "http://192.168.2.131:30883/clusters/host/services",
          "body": ""
        },
        {
          "path": "/workspaces/system-workspace",
          "notFound": false,
          "probeDelta": 0,
          "ms": 3961,
          "url": "http://192.168.2.131:30883/workspaces/system-workspace/overview/usage",
          "body": "扩展市场 应用商店 工作台 admin platform-admin system-workspace system-workspace is a built-in workspace automatically created by KubeSphere. It contain"
        },
        {
          "path": "/workspaces/dev-workspace",
          "notFound": false,
          "probeDelta": 0,
          "ms": 3916,
          "url": "http://192.168.2.131:30883/workspaces/dev-workspace/overview/usage",
          "body": "扩展市场 应用商店 工作台 admin platform-admin dev-workspace 系统服务 概览 项目 项目 应用管理 应用模板 应用仓库 企业空间设置 基本信息 企业空间配额 企业空间角色 企业空间成员 网关设置 概览 企业空间为 KubeSphere 提供了安"
        }
      ],
      "probe_total": 1,
      "probe_delta": 0,
      "probes": [
        {
          "url": "http://192.168.2.131:30883/kapis/clusters/host/resources.kubesphere.io/v1alpha3/customresourcedefinitions?name=configurations.springcloud.kubesphere.io",
          "status": 200,
          "ts": 1793591471189
        }
      ]
    },
    "v3": {
      "total": 145,
      "main_hits": 20,
      "errors": 0
    }
  }
}
```

## Compact

| Side | Pod detail | Logs | Terminal | Switch probe total | v3 errors |
| --- | --- | --- | --- | ---: | ---: |
| 30881 | yes (wms-scheduling-29893190-kmzsx) | fail | fail | 1 | 0 |
| 30883 | yes (wms-admin-29893190-h9g76) | fail | fail | 1 | 0 |

## Log
```
30881 POD {"ok":true,"name":"wms-scheduling-29893190-kmzsx","rowText":" wms-scheduling-29893190-kmzsx RUNNING PODS.PHASES.RUNNING NODE_IP 10.42.0.62 2026-11-02 11:50:00 VIEW_YAML DELETE"} tests=detail-viewYaml,panel-container_pl,panel-volume_pl
30881 CONTAINER {"ok":false} tests=detail-viewYaml
30881 LOGS {"ok":false,"sig":{"ace":0,"dialog":0,"xterm":0,"pre":0},"pass":false}
30881 TERM {"ok":true,"via":"text","sig":{"ace":0,"dialog":0,"xterm":0,"pre":0},"pass":false}
30881 SWITCH /clusters/host/projects notFound=false probe+0
30881 SWITCH /clusters/host/projects/kubesphere-system/pods notFound=false probe+0
30881 SWITCH /clusters/host/projects/default/pods notFound=false probe+0
30881 SWITCH /clusters/host/deployments notFound=false probe+0
30881 SWITCH /clusters/host/pods notFound=false probe+0
30881 SWITCH /clusters/host/services notFound=false probe+0
30881 SWITCH /workspaces/system-workspace notFound=false probe+0
30881 SWITCH /workspaces/dev-workspace notFound=false probe+0
30883 POD {"ok":true,"name":"wms-admin-29893190-h9g76","rowText":" wms-admin-29893190-h9g76 RUNNING RUNNING NODE_IP 10.42.0.33 2026-11-02 11:50:00 VIEW_YAML DELETE"} tests=detail-viewYaml,panel-container_pl,panel-platform_information,panel-platform_resources,panel-recent_access,panel-volume_pl
30883 CONTAINER {"ok":false} tests=detail-viewYaml
30883 LOGS {"ok":false,"sig":{"ace":0,"dialog":0,"xterm":0,"pre":0},"pass":false}
30883 TERM {"ok":true,"via":"text","sig":{"ace":0,"dialog":0,"xterm":0,"pre":0},"pass":false}
30883 SWITCH /clusters/host/projects notFound=false probe+0
30883 SWITCH /clusters/host/projects/kubesphere-system/pods notFound=false probe+0
30883 SWITCH /clusters/host/projects/default/pods notFound=false probe+0
30883 SWITCH /clusters/host/deployments notFound=false probe+0
30883 SWITCH /clusters/host/pods notFound=false probe+0
30883 SWITCH /clusters/host/services notFound=false probe+0
30883 SWITCH /workspaces/system-workspace notFound=false probe+0
30883 SWITCH /workspaces/dev-workspace notFound=false probe+0
```
