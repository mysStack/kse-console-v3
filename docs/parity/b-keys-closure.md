# B-key locale closure

- Added keys: **34**
- Skipped already in en: []
- Files: `locales/en/l10n-parity-gap-b.js`, `locales/zh/l10n-parity-gap-b.js`
- Source of truth for values: `release-4.1.5` embedded `locale-en` / `locale-zh`

## Embed verification (same round)

| Module | V4 status | Gate A impact |
| --- | --- | --- |
| SpringCloud (`configurations` / `microservices` / `microservicegateways` / `servicerouting` / instances) | Still `ConsoleV3ResourceList` / Wujie detail embeds in `console-release-415` | **Must-have** for Gate A; keep `checkSpringCloudIfActive` runtime verification |
| edgewize | No `ConsoleV3ResourceList` hit; V4 Apps call `/v2/edgewize` APIs | Old `edgewize.js` alias **not** a current Wujie must-have |
| nodegroup | No V3 embed hit; label fields in Edge app UI | Not a hard V3 chunk dependency |
| observability / whizard | Native V4 `whizard-telemetry` routes | Old `observability.js` alias non-blocking for core Gate A |

## Locale merge check

- `locales/en` merge now includes all 34 B keys (`merged_count` rose from built 3993 baseline toward ~4027).
- Synced `l10n-parity-gap-b.js` to all language folders for locale-plugin file sync.



> Update 2026-11-02: SpringCloud feature parity deferred as plugin/extension. Gate A must-have excludes SpringCloud pages/locales; only avoid worsening `checkSpringCloudIfActive` probe cost.
