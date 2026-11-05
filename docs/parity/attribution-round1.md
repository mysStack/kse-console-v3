# V3 Parity Attribution — Round 1

## Locale missing keys vs release-4.1.5

- Old locale-en keys: **5604**
- New built locale-en keys: **3993**
- Missing in new: **1635**
- Extra in new (keep): **24**

### Bucket counts

| Bucket | Count | Meaning |
| --- | ---: | --- |
| A | 1 | In current locales/source, not emitted to built locale-en |
| B_candidate | 34 | Present in current tree, not in locale pack path |
| C | 1600 | Not found in current `feature/v3-parity` tree |
| D_candidate | 86 | Heuristic defer list (subset of B/C) |

### Top prefixes among missing

- `DBPARAM_*`: 164
- `SORT_*`: 71
- `CLUSTER_*`: 44
- `DATABASE_*`: 34
- `MICROSERVICE_*`: 30
- `NOTIFICATION_*`: 25
- `ADD_*`: 24
- `NODE_*`: 22
- `BACKUP_*`: 19
- `EDIT_*`: 19
- `KAFKA_*`: 19
- `SELECT_*`: 19
- `CREATE_*`: 17
- `EDGE_*`: 17
- `GPU_*`: 15
- `INVALID_*`: 15
- `WHIZARD_*`: 14
- `DELETE_*`: 12
- `SILENCE_*`: 12
- `CPU_*`: 11

### Top prefixes in C (true source gaps)

- `DBPARAM_*`: 164
- `SORT_*`: 71
- `CLUSTER_*`: 44
- `DATABASE_*`: 34
- `MICROSERVICE_*`: 30
- `NOTIFICATION_*`: 25
- `ADD_*`: 22
- `NODE_*`: 22
- `BACKUP_*`: 19
- `EDIT_*`: 19
- `KAFKA_*`: 19
- `SELECT_*`: 19
- `CREATE_*`: 17
- `EDGE_*`: 17
- `GPU_*`: 15
- `INVALID_*`: 15
- `WHIZARD_*`: 14
- `SILENCE_*`: 12
- `DELETE_*`: 11
- `JVM_*`: 11

### Samples

#### A
- `WARRANTY` — babel.config.js, jest.config.js, .eslintrc.js

#### B_candidate
- `ADD_WORKLOAD` — docs/parity/classification-round1.json, src/components/Forms/CustomScaling/BaseInfo/WorkloadAddCard/index.jsx, src/components/Forms/CustomScaling/BaseInfo/WorkloadTableForm/index.jsx
- `ADD_WORKLOAD_DESC` — docs/parity/classification-round1.json, src/components/Forms/CustomScaling/BaseInfo/WorkloadAddCard/index.jsx
- `ALERT_RULE_REQUIRED` — docs/parity/classification-round1.json, src/components/Forms/AlertingPolicy/AlertingRules/AddRuleForm/CustomRule/index.jsx
- `CPU_USAGE_TCAP` — src/configs/alerting/metrics/workload.js
- `CREATED_AGO` — src/components/Forms/CustomScaling/BaseInfo/WorkloadAddCard/Card.jsx, src/components/Forms/CustomScaling/BaseInfo/WorkloadTableForm/Card.jsx
- `DAEMONSETS_VALUES` — src/pages/projects/containers/Alerting/Policies/Detail/AlertRules/RuleList/Item.jsx
- `DELETE_CLUSTER` — src/utils/events.js, src/stores/cluster/index.js
- `DEPLOYMENTS_VALUES` — src/pages/projects/containers/Alerting/Policies/Detail/AlertRules/RuleList/Item.jsx
- `DISABLE_ALARM_TIP` — src/actions/alerting.js
- `EMPTY_SCALING_OBJECT_MESSAGE` — src/components/Forms/CustomScaling/BaseInfo/index.jsx
- `ENABLE_ALERTING_POLICY` — src/pages/projects/containers/Alerting/Policies/index.jsx, src/pages/projects/containers/Alerting/Policies/Detail/index.jsx
- `ENV_CONTAINER` — src/components/Forms/CustomScaling/BaseInfo/WorkloadAddCard/index.jsx
- `KUBESPHERE_CLOUD_DESC` — src/pages/console/containers/Support/index.jsx
- `LICENSE` — src/pages/apps/components/Modals/HelmUpload/files.js
- `LOG_COLLECTION_OS_PASSWORD_TIPS` — src/components/Forms/Opensearch/Settings/index.jsx
- `LOG_COLLECTION_OS_URL_TIPS` — src/components/Forms/Opensearch/Settings/index.jsx
- `LOG_COLLECTION_OS_USER_TIPS` — src/components/Forms/Opensearch/Settings/index.jsx
- `MEMORY_USAGE_TCAP` — src/configs/alerting/metrics/workload.js
- `MESSAGE_REQUIRED` — src/components/Forms/AlertingPolicy/AlertingRules/AddRuleForm/CustomRule/index.jsx, src/components/Forms/AlertingPolicy/AlertingRules/AddRuleForm/TemplateRule/WorkloadRule.jsx, src/components/Forms/AlertingPolicy/AlertingRules/AddRuleForm/TemplateRule/NodeRule.jsx
- `MONITOR_TARGET_EMPTY` — src/components/Forms/AlertingPolicy/AlertingRules/AddRuleForm/TemplateRule/WorkloadRule.jsx
- `NO_MONITOR_METRIC` — src/components/Modals/Monitoring/AlertMonitoring/index.jsx
- `OPENSEARCH_DESC` — src/pages/clusters/containers/LogCollections/config.js, src/components/Modals/LogCollectionCreate/config.js
- `OPERATOR_REQUIRED` — src/components/Forms/AlertingPolicy/AlertingRules/AddRuleForm/TemplateRule/WorkloadRule.jsx, src/components/Forms/AlertingPolicy/AlertingRules/AddRuleForm/TemplateRule/NodeRule.jsx
- `PARAMETER` — src/components/Forms/CD/Advance/SyncSetting.jsx
- `RESET_MULTIPLE_ALERTING_POLICIES` — src/actions/alerting.js

#### C
- `ABORTED_CLIENT_TIMEOUTS` — docs/parity/classification-round1.json
- `ABORTED_CONNECTIONS` — docs/parity/classification-round1.json
- `ABORTED_CONNECTION_ATTEMPTS` — docs/parity/classification-round1.json
- `ABOUT_KUBESPHERE_ENTERPRISE` — docs/parity/classification-round1.json
- `ABSOLUTE_DELAY` — docs/parity/classification-round1.json
- `ACCESS_ADDRESS_PL` — docs/parity/classification-round1.json
- `ACCESS_KEY` — docs/parity/classification-round1.json
- `ACCESS_KEY_DESC` — docs/parity/classification-round1.json
- `ACCESS_KEY_EMPTY_TIP` — docs/parity/classification-round1.json
- `ACCESS_MODE_ROX` — docs/parity/classification-round1.json
- `ACCESS_MODE_RWO` — docs/parity/classification-round1.json
- `ACCESS_MODE_RWX` — docs/parity/classification-round1.json
- `ACL_DESC` — docs/parity/classification-round1.json
- `ACTIVATE` — docs/parity/classification-round1.json
- `ACTIVATED` — docs/parity/classification-round1.json
- `ACTIVATION_CODE` — docs/parity/classification-round1.json
- `ACTIVATION_CONDITION_SCAP` — docs/parity/classification-round1.json
- `ACTIVATION_TIME` — docs/parity/classification-round1.json
- `ACTIVATION_TYPE` — docs/parity/classification-round1.json
- `ACTIVECLIENTS` — docs/parity/classification-round1.json
- `ACTIVE_CONNECTIONS` — docs/parity/classification-round1.json
- `ACTIVE_PARTS` — docs/parity/classification-round1.json
- `ACTIVE_SESSIONS` — docs/parity/classification-round1.json
- `ACTIVITY` — docs/parity/classification-round1.json
- `ADD_CURRENT_USER` — docs/parity/classification-round1.json

#### D_candidate
- `ABORTED_CLIENT_TIMEOUTS` — docs/parity/classification-round1.json
- `ABOUT_KUBESPHERE_ENTERPRISE` — docs/parity/classification-round1.json
- `ACTIVATION_CODE` — docs/parity/classification-round1.json
- `ACTIVATION_CONDITION_SCAP` — docs/parity/classification-round1.json
- `ACTIVATION_TIME` — docs/parity/classification-round1.json
- `ACTIVATION_TYPE` — docs/parity/classification-round1.json
- `ADD_CURRENT_USER` — docs/parity/classification-round1.json
- `ADD_EDGE_IPPOOL` — docs/parity/classification-round1.json
- `ADD_EDGE_IPPOOL_DES` — docs/parity/classification-round1.json
- `ADD_EMAIL_NOTIFICATION_SUBSCRIPTION` — docs/parity/classification-round1.json
- `ALL_SILENT_NOTIFICATIONS` — docs/parity/classification-round1.json
- `ALL_SILENT_NOTIFICATIONS_DESC` — —
- `ALL_SILENT_NOTIFICATIONS_TCAP` — —
- `CACHE_COMPONENT_LOW` — —
- `CLIENT_COUNT` — —
- `COMPONENT_PARAMETER_CONFIG` — —
- `COMPONENT_REPLICA_COUNT` — —
- `CONFIGURATION_CONTENT_EMPTY_DESC` — —
- `CREATE_EDGEWIZE_CLUSTER` — —
- `CREATE_NOTIFICATION_SUBSCRIPTION` — —
- `CURRENT_CONFIGURATION_CONTENT` — —
- `CURRENT_USER` — —
- `CUSTOM_SILENT_NOTIFICATIONS` — —
- `CUSTOM_SILENT_NOTIFICATIONS_DESC` — —
- `CUSTOM_SILENT_NOTIFICATIONS_TCAP` — —

### Extra keys in new build (do not drop)

- `ADD_ENVIRONMENT_REFERENCE`
- `CONFIG_REFERENCE_IMPACT_CHECKING`
- `CONFIG_REFERENCE_IMPACT_DESC`
- `CONFIG_REFERENCE_IMPACT_HINT`
- `CONFIG_REFERENCE_IMPACT_LOAD_FAILED`
- `CONFIG_REFERENCE_IMPACT_TITLE`
- `CONFIG_REFERENCE_RESTART_FAILED_ITEM`
- `CONFIG_REFERENCE_RESTART_PARTIAL_FAILED`
- `CONFIG_REFERENCE_RESTART_SELECTED`
- `CONFIG_REFERENCE_RESTART_SUCCESS`
- `CONFIG_REFERENCE_RESTART_SUCCESS_ITEM`
- `CONFIG_REFERENCE_SAVE_ONLY`
- `ENVIRONMENT_PREFIX`
- `ENVIRONMENT_REFERENCE_DESC`
- `ENVIRONMENT_REFERENCE_LOADING`
- `ENVIRONMENT_REFERENCE_LOAD_FAILED`
- `ENVIRONMENT_REFERENCE_PL`
- `NO_CONFIGMAP_SECRET`
- `PREFER_NOSCHEDULE`
- `RUN_FAILED`
- `RUN_SUCCESSFUL`
- `SELECT_RESOURCE`
- `VALIDATE_FAILED`
- `VALIDATE_SUCCESS`

## Manifest / module graph

- Old manifest entries: **466**
- New manifest entries: **50**

| Category in old manifest | Count |
| --- | ---: |
| other | 447 |
| assets | 18 |
| entrypoints | 1 |

- Old src-like module keys: 0
- Present in current tree: 0
- Missing from current tree: 0

## Minimal closure list (recommended)

1. **Close A first** — if A>0, fix locale packaging/emission before any feature port.

2. **Triage B_candidate** — decide wiring vs dead strings.

3. **For C** — split into:

   - must-have for Gate A routes/actions now in use by V4 embeds

   - deferrable extension/enterprise packs (intersect D_candidate)

4. **Do not** chase old pure-hash chunk count; verify runtime chunk loading after content gaps shrink.

5. Keep all extra new keys related to Config/Environment Reference.

## Gate A impact

There is a packaging gap (A). Fix emission first, then re-measure C.


## C family breakdown (refined)

| Family | Count | Gate relevance |
| --- | ---: | --- |
| db_middleware | 256 | `P3_defer_or_extension` |
| microservice_springcloud | 40 | `P1_verify_known_regression` |
| edge | 22 | `P3_defer` |
| gpu_ai | 15 | `P3_defer` |
| backup_dr | 23 | `P2_if_enabled_in_env` |
| notification | 25 | `P3_defer_plugin` |
| network_storage_access | 46 | `P2_core_if_routes_embedded` |
| cluster_node | 66 | `P2_core_if_routes_embedded` |
| sort_table_ui | 164 | `P1_shared_ui_strings_maybe_false_gap` |
| enterprise_license | 22 | `P2_branding_if_shown` |
| unclassified | 921 | `needs_manual_triage` |

## Practical conclusion

- Packaging gap is negligible (**A=1**).
- **1600** keys are absent from current source tree; this is a **source-lineage gap**, not a rebuild bug.
- Largest absent family is **DB/middleware params (`DBPARAM_*` etc.)**, likely KSE extension content not present in `feature/v3-artifact-decouple`.
- Next concrete action: intersect missing C keys with **currently embedded V3 routes in console release-4.1.5**, produce a must-have subset; do not try to import all 1635 keys blindly.
- Parallel: verify SpringCloud/microservice behavior with REA evidence because that family is both missing-keys and a known runtime blocker.


## Chunk graph correction (important)

Old `manifest.json` contains many **ACE editor language-mode aliases** (e.g. `abap.js`, `python.js`, `dockerfile.js`) mapping to pure-hash files. Approximate split:

- assets: 18
- business-like aliases: 25
- ace/vendor-like aliases: 418
- other: 4
- ace/vendor-like JS bytes: 17411130

So the 434 vs 16 JS file gap is **not** all missing business modules. A large share is editor grammar chunks. Gate A should verify terminal/YAML editor still loads needed modes, not require restoring every ACE mode file.

New build also exposes `terminalEntry` entrypoint; old manifest entrypoints only list `main`.


> Update 2026-11-02: SpringCloud feature parity deferred as plugin/extension. Gate A must-have excludes SpringCloud pages/locales; only avoid worsening `checkSpringCloudIfActive` probe cost.
