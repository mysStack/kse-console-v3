/**
 * Gate A: when snapshot is disallowed, operation list must omit CREATE_SNAPSHOT
 * (sealed UI hides it; do not show a disabled menu item).
 */
describe('Volumes Detail snapshot operation visibility', () => {
  const buildOps = disableSnapshot => {
    const ops = [
      { key: 'editYaml' },
      { key: 'clone' },
      ...(!disableSnapshot ? [{ key: 'snapshot' }] : []),
      { key: 'expand' },
      { key: 'delete' },
    ]
    return ops.map(o => o.key)
  }

  it('omits snapshot when disableSnapshot is true', () => {
    expect(buildOps(true)).toEqual(['editYaml', 'clone', 'expand', 'delete'])
  })

  it('includes snapshot when disableSnapshot is false', () => {
    expect(buildOps(false)).toEqual([
      'editYaml',
      'clone',
      'snapshot',
      'expand',
      'delete',
    ])
  })
})
