# Locale blank probe — c0aa6a9 / 30883

- Time: 2026-11-06
- Tool: `/tmp/v3-locale-blank.mjs`
- Raw: `locale-blank-c0aa6a9.json`

## Result

| Path | Suspected blank keys |
| --- | --- |
| deployments / pods / configmaps / secrets / services / composing | none |
| extensions/management | `NVIDIA` only |

`NVIDIA` is a product name in the extensions UI, not a missing i18n key. **No locale code change this wave.**

Heuristic: ALL_CAPS tokens in visible text after denylisting common acronyms. False positives expected; only fix when a real operator-facing blank string appears.
