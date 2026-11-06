/**
 * Map pod status/type strings to sealed-aligned PODS.PHASES.* locale keys.
 */
const MAP = {
  running: 'PODS.PHASES.RUNNING',
  Running: 'PODS.PHASES.RUNNING',
  waiting: 'PODS.PHASES.PENDING',
  Pending: 'PODS.PHASES.PENDING',
  completed: 'PODS.PHASES.SUCCEEDED',
  Completed: 'PODS.PHASES.SUCCEEDED',
  Succeeded: 'PODS.PHASES.SUCCEEDED',
  error: 'PODS.PHASES.FAILED',
  Failed: 'PODS.PHASES.FAILED',
  Error: 'PODS.PHASES.FAILED',
  unknown: 'PODS.PHASES.UNKNOWN',
  Unknown: 'PODS.PHASES.UNKNOWN',
  UnKnown: 'PODS.PHASES.UNKNOWN',
}

export const getPodStatusLocaleKey = statusOrType => {
  const key = String(statusOrType || '')
  return MAP[key] || key.toUpperCase()
}
