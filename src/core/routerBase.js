export function getRouterBasename(pathname = '') {
  return pathname === '/consolev3' || pathname.startsWith('/consolev3/')
    ? '/consolev3'
    : ''
}
