# REA：核心 embed 缺口（locale 回收后）

## 口径
密封为 oracle；本报告只服务可维护源码回收。不宣称 Gate A 关闭。

- 密封 en keys: 5604
- 源码 locale keys（约）: 5548
- 核心路径 t('KEY') 引用: 1133
- 引用缺 locale: 6（其中密封有值: 0）

## 路由/容器路径是否存在
- `deployments`: OK src/configs/steps/deployments.js
- `pods`: OK src/utils/podsStatus.test.js
- `configmaps`: OK src/configs/steps/configmaps.js
- `secrets`: OK src/configs/steps/secrets.js
- `services`: OK src/configs/steps/services.js
- `ingresses`: OK src/configs/steps/ingresses.js
- `statefulsets`: OK src/configs/steps/statefulsets.js
- `daemonsets`: OK src/configs/steps/daemonsets.js
- `jobs`: OK src/configs/steps/jobs.js, src/configs/steps/cronjobs.js
- `cronjobs`: OK src/configs/steps/cronjobs.js
- `volumes`: OK src/configs/steps/volumes.js
- `volume-snapshots`: MISSING 
- `roles`: MISSING 
- `serviceaccounts`: OK src/configs/steps/serviceaccounts.js
- `gateways`: OK src/actions/gateways.js
- `grayrelease`: OK src/stores/grayrelease.js, src/configs/steps/grayreleases.js
- `s2ibuilders`: MISSING 
- `composing`: OK src/pages/projects/routes/composing.alias.test.js
- `alerts`: MISSING 
- `alert-rules`: MISSING 
- `network-policies`: MISSING 
- `log-collections`: MISSING 

## 已有 API 静默/原生补丁（工程树，非血统证明）
- `src/stores/silenceUnsupported.js`: True
- `src/stores/network/ippool.js`: True
- `src/stores/grayrelease.js`: True
- `src/stores/network/policy.js`: True
- `src/stores/s2i/listReject.js`: True
- `src/stores/storageClass.js`: True

## 仍缺 locale 的密封 key（样本）
- （无）

## 建议补丁优先级
1. 补齐 refs_missing_but_in_sealed（若有）
2. 对 MISSING 路由名做宿主别名/容器定位
3. 重建后浏览器 A/B 只记证据，回收未收敛不关 Gate A

JSON: `rea-core-gaps.json`

## 本轮源码补丁

- `src/pages/clusters/containers/Storage/VolumeSnapshotClasses/Detail/index.jsx`：`DETELE_VOLUME_SNAPSHOT_CLASS` → `DELETE_VOLUME_SNAPSHOT_CLASS`（对齐已有 locale key）。
- `POD_CPU_REQUEST` / `POD_MEMORY_REQUEST` 仅出现在注释掉的 JSX，不作为运行时缺口。
