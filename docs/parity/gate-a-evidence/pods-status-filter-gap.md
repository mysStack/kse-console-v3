# Pods status filter gap vs sealed 4.1.5

- Time: 2026-11-06
- Sealed main snippet: `Pending/Running/Succeeded/Failed/Unknown` with texts `PODS.PHASES.*`
- Rebuild before fix: `Waiting/Running/Completed/Error` → UI 等待中/运行中/已完成/错误
- Sealed UI: 等待中/运行中/成功完成/失败/未知

## Fix (source)

- `src/utils/constants.js` `PODS_STATUS` aligned to sealed values/texts
- zh/en locale keys `PODS.PHASES.*`
- `Pods/index.jsx` `getItemDesc` uses `t(type.toUpperCase())` so `completed` → `COMPLETED`

Evidence unit: `src/utils/podsStatus.test.js`.
