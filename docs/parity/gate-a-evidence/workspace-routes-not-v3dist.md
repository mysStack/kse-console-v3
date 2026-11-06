# Workspace roles/members routes not embedding v3dist

- Time: 2026-11-06
- Paths: `/dev-workspace/workspaces/dev-workspace/{roles,members}`
- Observation: Wujie frame URL becomes `/consolev3/dashboard` on both 30881 and 30883.
- Network policies project path embeds correctly under `/consolev3/.../networkpolicies`.

Treat workspace IAM pages as V4-host scope until a real consolev3 embed path is confirmed.
