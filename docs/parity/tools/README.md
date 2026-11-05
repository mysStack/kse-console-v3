# Gate A parity tools

效率工具落地目录（不替代 30881/30883 行为门禁）。

## Install

```bash
cd docs/parity/tools
npm install
npx playwright install chromium
```

## 1) Screenshot A/B（Playwright + pixelmatch）

```bash
eval "$(grep -E '^export KS_TEST_' ~/.bashrc)"
npm run ab:shot
# or
AB_PATHS='/clusters/host/projects/dev-wms/deployments,/extensions/management' npm run ab:shot
```

输出：`../gate-a-evidence/screenshots-ab/tooling/`（含 `ab-screenshot-report.json` 与 diff PNG）。

## 2) Asset / manifest diff（密封 vs 重建目录）

```bash
npm run diff:assets -- \
  ../../.build-out/parity/old-release-4.1.5 \
  ../../.build-out/dist
```

无 source map 时仍可用；关注 `aliasOnlyOld` / `aliasOnlyNew`。

## 3) Webpack stats + analyzer + bundle-diff

主仓构建（Node 14）：

```bash
STATS=1 ANALYZE=1 yarn build:client
# → dist/webpack-stats.json
# → dist/webpack-bundle-report.html
```

两次构建对比：

```bash
npm run diff:bundle -- /path/old/webpack-stats.json /path/new/webpack-stats.json
```

`webpack-bundle-diff@0.7.x` 对应 Webpack 4。密封旧包没有 stats 时，先用 asset-manifest-diff；同源连续构建再用 bundle-diff。
