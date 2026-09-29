# mysStack KubeSphere Console V3 维护说明

本仓库维护仍由主 Console 通过 `/consolev3/*` 嵌入的旧版 KubeSphere Console 页面。

## 来源

- 初始源码基线：`mysStack/console` Git 提交 `bd995f410`。
- 该基线是 Console 4.0 迁移前保留的 V3 React 源码，包含工作负载环境变量等仍在使用的页面。
- 原始许可证为仓库根目录的 `LICENSE`（AGPL-3.0）。修改后的网络服务应按许可证要求向用户提供对应源码。

## 开发边界

- `/consolev3/*` 页面和其 `src/` 实现在本仓库修改。
- 现代 React/TypeScript Console 页面仍在 `mysStack/console` 仓库修改。
- 本仓库构建的静态资源将作为 `v3dist` 被主 Console 镜像携带；不要手工修改压缩后的 `v3dist` 文件。

## 当前技术基线

- React 16.6.3
- Webpack 4
- Node.js 14（构建兼容基线）

## 分支和发布

- `main`：已审核的维护基线。
- `release-4.1.5`：当前 KubeSphere 4.1.5 集成线。
- `feature/*`：从 `release-4.1.5` 创建的功能分支。
- `v3-*`：可被主 Console 固定引用的 V3 构建产物版本。

GitHub Actions 会在 `main`、`release-4.1.5` 和 Pull Request 上使用 Node 14 构建，并上传 `dist/` 构建产物。主 Console 集成时应固定具体提交或 `v3-*` 标签，不直接依赖移动分支。

React、Webpack、Babel 和旧版组件库升级属于独立迁移任务，不与业务功能改动混合。
