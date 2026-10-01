export function getNativeWorkloadBridge() {
  const props = window.$wujie && window.$wujie.props
  return props && props.nativeWorkloadForm ? props : null
}

export function navigateToNativeWorkload({ mode, kind, name }) {
  const bridge = getNativeWorkloadBridge()
  if (!bridge || typeof bridge.navigateToNativeWorkload !== 'function') {
    return false
  }

  bridge.navigateToNativeWorkload({ mode, kind, name })
  return true
}
