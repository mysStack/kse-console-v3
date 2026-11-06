import { getPodStatusLocaleKey } from './podStatusLocale'

describe('getPodStatusLocaleKey', () => {
  it('maps Completed/completed to SUCCEEDED phase key', () => {
    expect(getPodStatusLocaleKey('Completed')).toBe('PODS.PHASES.SUCCEEDED')
    expect(getPodStatusLocaleKey('completed')).toBe('PODS.PHASES.SUCCEEDED')
  })

  it('maps Running/waiting/error', () => {
    expect(getPodStatusLocaleKey('Running')).toBe('PODS.PHASES.RUNNING')
    expect(getPodStatusLocaleKey('waiting')).toBe('PODS.PHASES.PENDING')
    expect(getPodStatusLocaleKey('error')).toBe('PODS.PHASES.FAILED')
  })
})
