# 30883 Node14 git workspace

## Layout

| 组件 | 作用 |
| --- | --- |
| `ks-console-v3dist-parity` NodePort **30883** | V4 host；hostPath 挂载重建 v3dist |
| Pod `ks-console-v3-node-workspace` | Node 14，挂源码 + 产出目录 |
| 节点 `dev01` 源码 | `/opt/kse-console-v3-src`（本机 git 工作树同步） |
| 节点产出 | `/opt/ks-console-v3dist-parity` → 容器 `/opt/kubesphere/console/dist/v3dist` |

## 日常

```bash
bash /tmp/v3-30883-resync-build.sh
# or
kubectl -n kubesphere-system exec -it ks-console-v3-node-workspace -- bash
cd /opt/kse-console-v3-src && export V3_PUBLIC_PATH=/dist/v3dist/
STATS=1 ANALYZE=1 yarn build:client
cp -a dist/. /opt/ks-console-v3dist-parity/
kubectl -n kubesphere-system delete pod -l app=ks-console-v3dist-parity
```

构建会额外产出 `webpack-stats.json` / `webpack-bundle-report.html`（供 `docs/parity/tools` 做 bundle-diff）。

## Gate A 提效工具

见 `docs/parity/tools/README.md`：

```bash
cd docs/parity/tools && npm i && npx playwright install chromium
eval "$(grep -E '^export KS_TEST_' ~/.bashrc)"
npm run ab:shot
npm run diff:assets -- ../../.build-out/parity/old-release-4.1.5 ../../.build-out/dist
```

嵌入仍走静态 `/dist/v3dist`（不是 webpack-dev-server 直挂 Wujie）。
