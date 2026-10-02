const EMBEDDED_PREFIX = '/consolev3'

export const getHostRoute = pathname => {
  if (!pathname || !pathname.startsWith(`${EMBEDDED_PREFIX}/`)) {
    return null
  }

  return pathname.slice(EMBEDDED_PREFIX.length) || '/'
}

export const getEmbeddedRoute = pathname => {
  if (!pathname) {
    return EMBEDDED_PREFIX
  }
  return pathname.startsWith(EMBEDDED_PREFIX)
    ? pathname
    : `${EMBEDDED_PREFIX}${
        pathname.startsWith('/') ? pathname : `/${pathname}`
      }`
}

export const notifyHostRouteChange = location => {
  if (typeof window === 'undefined' || !window.__POWERED_BY_WUJIE__) {
    return
  }

  const pathname = location?.pathname || window.location.pathname
  const search = location?.search || window.location.search
  const hash = location?.hash || window.location.hash
  const embeddedPath = getEmbeddedRoute(pathname)
  const route = `${embeddedPath}${search}${hash}`
  window.$wujie?.bus?.$emit('consoleRouteChange', route)
  if (window.parent !== window) {
    window.parent.postMessage(
      { type: 'consoleRouteChange', route },
      window.location.origin
    )
  }
}
