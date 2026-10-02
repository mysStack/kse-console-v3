/**
 * Wujie exposes this flag inside the child window. Keeping the check in one
 * place lets the legacy console keep its standalone layout while rendering
 * only page content when it is mounted by the current Console shell.
 */
export const isWujieEmbedded = () =>
  typeof window !== 'undefined' && window.__POWERED_BY_WUJIE__ === true
