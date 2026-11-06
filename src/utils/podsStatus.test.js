const { PODS_STATUS } = require('./constants')

describe('PODS_STATUS', () => {
  it('matches sealed release-4.1.5 filter phases', () => {
    expect(PODS_STATUS.map(s => s.value)).toEqual([
      'Pending',
      'Running',
      'Succeeded',
      'Failed',
      'Unknown',
    ])
    expect(PODS_STATUS.map(s => s.text)).toEqual([
      'PODS.PHASES.PENDING',
      'PODS.PHASES.RUNNING',
      'PODS.PHASES.SUCCEEDED',
      'PODS.PHASES.FAILED',
      'PODS.PHASES.UNKNOWN',
    ])
  })
})
