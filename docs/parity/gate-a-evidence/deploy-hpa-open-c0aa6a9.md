# HPA dialog probe — c0aa6a9

- Time: 2026-11-06
- Route: `/dev-workspace/clusters/host/projects/dev-wms/deployments/wms-admin-server`
- Raw: `deploy-hpa-open-c0aa6a9.json`

## Result

| Side | Opened modal | Closed |
| --- | --- | --- |
| 30881 | false（自动化偶发，与 round3 flaky 一致） | n/a |
| 30883 | true（modals=1） | true |

**不据此改码。** 菜单项「编辑自动扩缩」两侧文案都在；基线侧 Playwright 打开不稳定。YAML 打开/取消已在同页稳定通过。

下一步若要钉 HPA，优先加长等待或人工点一次基线确认，而不是改 V3 源码。
