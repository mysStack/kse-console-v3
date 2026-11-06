# Nodes host route — 30881 vs 30883

- Commit under test: `1d2f57c` (30883 rebuild hostPath)
- Probe: `nodes-1d2f57c.json`

## Result

| Side | Path | Embed | Verdict |
|------|------|-------|---------|
| 30881 | `/clusters/host/nodes` | `consolev3/dashboard` | host V4-native / Wujie fallback |
| 30883 | `/clusters/host/nodes` | `consolev3/dashboard` | same |

Detail `/clusters/host/nodes/dev01` not entered because list already lands on dashboard.

## Attribution

Symmetric on sealed release and rebuild. **Not a rebuild-only Gate A gap.** Same class as apps / workspace IAM / some monitor host routes.
