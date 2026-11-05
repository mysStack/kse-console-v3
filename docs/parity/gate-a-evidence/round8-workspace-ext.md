# Gate A round8 — workspace s2i/gray/composing + 扩展入口

- Time: 2026-11-02
- Prefix: `/{workspace}/clusters/host/projects/{ns}` = `/dev-workspace/clusters/host/projects/dev-wms`
- Ports: `30881` stock · `30883` rebuilt

## Results (visual + JSON)

| Path | 30881 | 30883 | 判定 |
| --- | --- | --- | --- |
| `…/s2ibuilders` | IMAGE_BUILDER 空表 + toast `resource is not supported` | 同左 | 环境 CRD 不支持，**A/B 等价** |
| `…/grayrelease/cates` | 蓝绿/金丝雀/镜像 三类卡片 | 同左 | **pass** |
| `…/composing` | `COMPOSED_APP_PL` 空列表 + CREATE | embed **Not Found** | **不等价**（rebuild 缺口） |
| `…/applications/composing` | 宿主「应用」模板空列表 | 同左 | 宿主原生，非 v3dist |
| `/extensions/management` | 扩展中心列表（48 项，已装若干） | 同左 | 入口 **pass**（未做安装/启停） |
| `/extensions/marketplace` | Marketplace 卡片墙 | 同左 | 入口 **pass** |
| `/extensions`、`/extensions/manage` | 404 | 404 | 等价错误路由 |

Probe **1 / 1**。v3dist HTTP 4xx **0 / 0**。

## Notes

- Round7 的 `/clusters/host/projects/dev-wms/{s2i,gray,composing}` 404 是缺 workspace 前缀，不是 v3dist。
- `composing` 是本轮唯一确认的 rebuilt 页面差：stock 走 Composed App 空态，rebuild 在 Wujie 内 Not Found。
- 根因：V4 host `ApplicationComposing/Embed.tsx` 打开 `${wujieUrlPrefix}/composing`；当前 `kse-console-v3` 只注册了 `${PATH}/applications/composing`，rebuild 落到 `*` → `/404`。stock v3dist 能渲染说明发布包含该别名。
- 源码已补 `${PATH}/composing` 列表、`${PATH}/composing/:name` 详情及详情 Tab 双前缀。**未重建 v3dist、未 remount `:30883`，浏览器复验未做。**
- 扩展兼容只验证了管理页/市场能打开且无 crash，**没有**覆盖扩展安装、启用或前端加载。

## Artifacts

`screenshots-ab/round8.json`，`{base,exp}-r8-*.png`
