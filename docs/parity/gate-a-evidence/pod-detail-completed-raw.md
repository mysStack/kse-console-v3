# Pod detail status shows raw `Completed`

- Time: 2026-11-06
- 30883 detail attrs: `状态: Completed`
- List filter already uses `PODS.PHASES.*`（成功完成）

## Fix

- `utils/podStatusLocale.js` maps Completed/completed → `PODS.PHASES.SUCCEEDED`
- Pods list column + Detail attrs use the helper
- 验收：两侧详情均为「状态: 运行中」。`pod-status-locale-verify.json`
