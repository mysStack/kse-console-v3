# IAM v1beta1 alignment (follow-on)

- Time: 2026-11-06
- Cluster probe: `members` / IAM `v1alpha2` → 404; `namespacemembers` + `v1beta1` → 200
- Changes:
  - `stores/user.js`: list URL `v1beta1`, namespace module `namespacemembers`
  - `stores/cluster/member.js`: same
  - `utils/constants.js` API_VERSIONS: users/globalroles/workspaceroles → v1beta1
- Note: workspace roles UI currently not embedded in v3dist; still align stores for when/if used.
