# Gate A round9 — composing alias rebuild + remount

- Time: 2026-11-02
- Unit test: `yarn test src/pages/projects/routes/composing.alias.test.js` → **3 passed** (docker `node:14-bullseye`)
- Artifact: `main.3e3fcb7888ce0f1c36a8.js` @ HEAD `8843ead` + uncommitted composing alias
- Remount: hostPath `/opt/ks-console-v3dist-parity` only; bounce `ks-console-v3dist-parity`
- `:30881` still stock `main.558f452048e49db23323.js`

## Browser A/B `/dev-workspace/clusters/host/projects/dev-wms/composing`

| 侧 | v3dist main | 结果 |
| --- | --- | --- |
| 30881 | `main.558f452048e49db23323.js` 200 | COMPOSED_APP 空态 + CREATE |
| 30883 | `main.3e3fcb7888ce0f1c36a8.js` 200 | **不再是 Wujie Not Found**；CRDApps 列表空 + toast `resource is not supported` |

JSON `pass=true` both (`round9-composing.json`). 404 缺口关闭。空态样式与 stock 不完全一致（stock 专用空卡片；rebuild 表格空 + CRD 不支持 toast，与 s2i 同类环境限制）。

## Commands

- `docker run node:14-bullseye` + `yarn install --frozen-lockfile` + jest + `yarn build:client` `V3_PUBLIC_PATH=/dist/v3dist/`
- helper 写 hostPath 后 `kubectl delete pod -l app=ks-console-v3dist-parity`
- Playwright cookies + composing URL

未提交源码；未改 30881。
