# Remaining C-gap vs core embeds

- Missing locale keys after B-fix: **1601**

| Bucket | Count | Meaning |
| --- | ---: | --- |
| plugin_defer | 411 | DB/MQ/Edge/GPU/SpringCloud/notify/license-style |
| core_candidate | 133 | Heuristically related to still-embedded core resources |
| other | 1057 | Unclassified; triage only if runtime shows blanks |

- core_candidate present as token in current src: **5**
- core_candidate absent from current src: **128**

## Recommendation

1. Stop bulk locale recovery.
2. Treat plugin_defer as out of Gate A.
3. Only fix core_candidate keys when a core embed page shows missing text/broken action.
4. Move to rebuild integration / runtime A/B on deployments, pods, configmaps, secrets, services, ingresses.
