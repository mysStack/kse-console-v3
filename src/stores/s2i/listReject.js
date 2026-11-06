import { unsupportedListResult } from 'stores/application/unsupported'

export function s2iListReject(first, second) {
  const empty = unsupportedListResult(first, second)
  if (empty) {
    return empty
  }
  const error = second && second.message ? second : first
  if (typeof window !== 'undefined' && window.onunhandledrejection) {
    window.onunhandledrejection(error)
  }
  return Promise.reject(error)
}
