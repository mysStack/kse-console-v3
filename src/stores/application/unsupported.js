export function isUnsupportedResourceError(error) {
  if (!error) {
    return false
  }
  if (typeof error === 'string') {
    return error.toLowerCase().includes('not supported')
  }
  if (typeof error !== 'object') {
    return false
  }
  const text = `${error.message || ''} ${error.reason || ''}`.toLowerCase()
  return text.includes('not supported')
}

export function unsupportedListResult(first, second) {
  if (
    isUnsupportedResourceError(first) ||
    isUnsupportedResourceError(second)
  ) {
    return { items: [], totalItems: 0 }
  }
  return null
}
