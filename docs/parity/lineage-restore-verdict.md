# 血统核对：能否用旧 V3 源码按 release-4.1.5 还原？

时间：2026-11-05

## 结论

你给的可维护旧源码就是 `mysStack/kse-console-v3`（本机 `feature/v3-parity`，基线 `8843ead`）。这就是当前重建基线，不是「还没拿到源码」。

这份源码**编不出** `release-4.1.5` 密封 `v3dist`（`main.558f4520…`）的同一血统：仓内名叫 `release-4.1.5` 的分支（`0be9122`）是 `8843ead` 的祖先，切过去会倒退。密封包对应的 embed 构建 commit 仍未知。行为 Gate A 用的就是这份已给源码。

## 对照基线

| 侧 | 身份 |
| --- | --- |
| 产品密封物 | `console` `origin/release-4.1.5` → `packages/bootstrap/assets/v3dist`，`locale-en` **5604** keys，`main.558f452048e49db23323.js` |
| 当前工作树 | `kse-console-v3` `feature/v3-parity` @ `8843ead`（在 `0be9122` 上多 24 个 mystack 提交） |

## 候选源码

| 候选 | tip | 与密封 locale 交集 | 密封缺失（约） | 企业 marker | 相对 8843ead |
| --- | --- | ---: | ---: | --- | --- |
| `kse-console-v3` @ 8843ead | 当前 | ~3760 | ~1844 | 无 `ABOUT_KUBESPHERE_ENTERPRISE` / `MICROSERVICE_*` / `DBPARAM_*`；有 `CONFIG_REFERENCE` | — |
| `kse-console-v3` `origin/release-4.1.5` | `0be9122` | ~3760 | ~1844 | 同上且无 Config Reference | **8843ead 的祖先**（更旧） |
| tag `v3.0.0-mystack.6` | `994b158` | ~3760 | ~1844 | 同左 | 8843ead 祖先链上 |
| `console` `origin/release-3.4` | `175710fef` | ~3760 | ~1844 | 同左 | 社区旧 V3，非 KSE embed |

磁盘扫描（`ks-develop` / Downloads / home 归档）**未发现**另一份独立旧 V3 源码包。

## 含义

1. 仓库名 `release-4.1.5` ≠ 产品密封 `v3dist` 的源。那是 early mystack 基线，不是企业 embed 线。
2. 密封物多出来的约 1800 keys / edgewize·企业文案等，**四份候选源里都没有**；无法靠切换分支“还原”。
3. 继续在 `8843ead` 上做行为 Gate A 仍是 **provenance 缺失时的兜底**；真正还原要拿到编出 `main.558f4520` 的源（或可证明等价的私有备份）。
4. 未建议：从密封 JS 反编译当最终源码（无 map，且与原方案冲突）。

## 产物

- `docs/parity/lineage-restore-verdict.json`
