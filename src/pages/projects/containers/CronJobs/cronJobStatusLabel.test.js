describe('CronJob status label keys', () => {
  const toNameKey = status =>
    status === 'Running'
      ? 'CRONJOB_RUNNING'
      : status === 'Paused'
        ? 'CRONJOB_PAUSED'
        : status

  it('maps Running/Paused to CRONJOB_* locale keys', () => {
    expect(toNameKey('Running')).toBe('CRONJOB_RUNNING')
    expect(toNameKey('Paused')).toBe('CRONJOB_PAUSED')
    expect(toNameKey('Other')).toBe('Other')
  })
})
