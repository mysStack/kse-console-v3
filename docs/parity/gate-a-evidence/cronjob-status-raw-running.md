# CronJob status shows raw `Running` on rebuild

- Time: 2026-11-06
- Path: `/dev-workspace/.../dev-wms/cronjobs`
- 30881: `wms-scheduling - 运行中`
- 30883 (pre-fix): `wms-scheduling - Running`

## Cause

`getCronJobStatus` returns `Running`/`Paused`; list/detail used `t(status)` but locale keys are `CRONJOB_RUNNING` / `CRONJOB_PAUSED`.

## Fix

Map status → `CRONJOB_*` before `t()` in list column and detail attrs.
- 验收：`fd49fe6` 挂载后 30883 CronJob 列表/详情为中文运行中。`sts-cron-fd49fe6.json`
