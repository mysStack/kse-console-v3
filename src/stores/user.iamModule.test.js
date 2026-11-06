describe('UserStore IAM module names (KS 4.1)', () => {
  const getModule = ({ cluster, workspace, namespace, devops } = {}) => {
    if (namespace) return 'namespacemembers'
    if (devops) return 'members'
    if (workspace) return 'workspacemembers'
    if (cluster) return 'clustermembers'
    return 'users'
  }

  it('uses namespacemembers for project scope', () => {
    expect(getModule({ namespace: 'dev-wms', cluster: 'host' })).toBe(
      'namespacemembers'
    )
  })

  it('keeps workspacemembers / users', () => {
    expect(getModule({ workspace: 'dev-workspace' })).toBe('workspacemembers')
    expect(getModule({})).toBe('users')
  })
})
