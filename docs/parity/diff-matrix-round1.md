# V3dist Parity Diff Matrix (Round 1)

## Verdict

**门禁 A：当前不能批准替换。** 干净重建已打通，但与 `release-4.1.5` 旧产物仍有明确内容缺口，尤其是 locale/KSE 文案与 chunk 图完整性未验证。

## Baselines

| Side | Ref | Notes |
| --- | --- | --- |
| New | `kse-console-v3` `feature/v3-parity` @ `8843ead` | Docker Node 14 client build |
| Old 4.1.5 | `console` `origin/release-4.1.5` @ `f6b0e3b2` `packages/bootstrap/assets/v3dist` | 782 files |
| Old 4.1 | `console` `origin/release-4.1` @ `ee28f29f` same path | 779 files; almost same as 4.1.5 |

## Quantitative snapshot

| Metric | New | release-4.1.5 |
| --- | ---: | ---: |
| Files | 250 | 782 |
| JS | 16 | 434 |
| JS bytes | 10697279 | 27345650 |
| locale-en keys | 3993 | 5604 |
| locale packs | 13 | 4 |

## Classification

| Item | Class | Evidence |
| --- | --- | --- |
| Clean rebuild (Node14/yarn/client) | `already_equivalent` | Docker node:14-bullseye build OK; .v3dist-source.json written |
| publicPath /dist/v3dist/ | `already_equivalent` | Present in new main.js and old main.js |
| Manifest + locale manifest files exist | `already_equivalent` | Both sides have manifest.json and manifest.locale.json |
| Exact JS filename / content hash parity | `already_equivalent_not_required` | New 16 js vs old 434 js; expected under different chunk graph; Gate A does not require hash equality |
| Chunk graph / lazy modules completeness | `needs_verify` | Old has 414 pure-hash js (~414 named in manifest). New consolidates into 16 bundles. Must verify dynamic import runtime loads all routes/actions. |
| locale-en key coverage vs release-4.1.5 | `needs_source` | new=3993 old=5604 missing_in_new=1635; many enterprise/product strings absent from kse-console-v3@8843ead |
| Locale language pack set | `needs_verify` | new packs=['locale-ar', 'locale-de', 'locale-en', 'locale-es', 'locale-fr', 'locale-hi', 'locale-ko', 'locale-lt', 'locale-pl', 'locale-pt', 'locale-tc', 'locale-tr', 'locale-zh'] old packs=['locale-en', 'locale-es', 'locale-tc', 'locale-zh'] |
| checkSpringCloudIfActive symbol | `needs_verify` | String present in both new and old top bundles; runtime behavior/blocking still needs browser evidence |
| Workload Action strings (rollback/scale/editYaml/hpa) | `needs_verify` | Symbols present in both; not proof of KSE-specific action wiring |
| release-4.1 vs release-4.1.5 v3dist delta | `already_equivalent_baseline_note` | 739 common files, 737 identical; mostly rehash + manifests. Parity target should be 4.1.5 behavior, not 4.1 package.json version |
| terminalEntry bundle | `needs_verify` | new=['terminalEntry.647e6924ddee3268f552.css', 'terminalEntry.647e6924ddee3268f552.js']; old=[] |

## Blocking gaps for Gate A

1. **needs_source: locale-en missing ~1635 keys** vs 4.1.5 (sample: ABORTED_CLIENT_TIMEOUTS, ABORTED_CONNECTIONS, ABORTED_CONNECTION_ATTEMPTS, ABOUT_KUBESPHERE_ENTERPRISE, ABSOLUTE_DELAY, ACCESS_ADDRESS_PL, ACCESS_KEY, ACCESS_KEY_DESC, ACCESS_KEY_EMPTY_TIP, ACCESS_MODE_ROX, ACCESS_MODE_RWO, ACCESS_MODE_RWX)
2. **needs_verify: chunk graph** — old ships hundreds of pure-hash lazy files; new emits a compact bundle set. Must prove route/Action lazy loading still resolves under Wujie.
3. **needs_verify: SpringCloud / Wujie lifecycle / route sync** — symbols exist; runtime A/B still required before replace.

## Non-blocking / expected

- Exact file SHA / hashed filenames differ: expected, not a Gate A blocker.
- `release-4.1` vs `release-4.1.5` v3dist almost identical aside from rehash; target behavior is 4.1.5-embedded V3, not upgrading V3 package.json to 4.1.

## Artifacts

- `.build-out/dist` — new rebuild
- `.build-out/parity/old-release-4.1.5` / `old-release-4.1` — extracted baselines
- `.build-out/parity/diff-report.json`
- `.build-out/parity/classification.json`

## Next

1. On `feature/v3-parity`, recover missing KSE locale/source deltas against 4.1.5 behavior (source analysis + REA, no decompiled paste-as-final).
2. Browser/Wujie smoke on isolated console integration branch after locale/chunk risks shrink.
3. Do **not** create `feature/v3dist-rebuild-integration` for replace approval until Gate A blockers close.


> Update 2026-11-02: SpringCloud feature parity deferred as plugin/extension. Gate A must-have excludes SpringCloud pages/locales; only avoid worsening `checkSpringCloudIfActive` probe cost.
