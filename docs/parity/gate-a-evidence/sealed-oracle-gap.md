# 密封 oracle 缺口（可维护源码回收）

## 口径
没有密封 embed commit；以密封 `v3dist` 为 oracle，把缺口补回 `kse-console-v3`。
不宣称已找到血统 commit，不宣称 Gate A 关闭。

## 数量
- 密封 locale-en keys: **5604** (`locale-en.60d9ddf6aff8fa136646.json`)
- 源码刮取 keys: **5393**
- 交集: **5369**
- 源码缺失: **235**（启发式 core=220, defer=15）

## Marker
- `ABOUT_KUBESPHERE_ENTERPRISE`: sealed=True source=True
- `MICROSERVICE_PL`: sealed=True source=True
- `CONFIG_REFERENCE`: sealed=False source=False
- `EDGEWIZE`: sealed=False source=False
- `DBPARAM_*`: sealed_count=164 source=True

## Top missing prefixes
- `WHIZARD_*`: 14
- `pipeline_*`: 5
- `IN_*`: 2
- `waitForQualityGate_*`: 2
- `@somebody to help review`: 1
- `AbortPipeline if quality gate status is not green`: 1
- `Absolute duration`: 1
- `Add Parallel Stage`: 1
- `Add Step`: 1
- `Add another credential`: 1
- `Add conditions`: 1
- `Add nesting conditions`: 1
- `Add nesting steps`: 1
- `Allow Empty Results`: 1
- `Are you sure to close this pipeline Editor ?`: 1

## 下一步
1. 先回填 core_missing 到源码 locales（en/zh）
2. defer 前缀单独分桶（插件/企业包）
3. 重建后对照密封 A/B

JSON: `sealed-oracle-gap.json`
