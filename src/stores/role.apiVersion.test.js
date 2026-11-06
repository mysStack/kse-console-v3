describe('RoleStore API version strings', () => {
  const getResourceUrl = (module = 'roles', params = {}) => {
    let path = ''
    if (params.cluster) path += `/klusters/${params.cluster}`
    if (params.namespace) path += `/namespaces/${params.namespace}`
    return `kapis/iam.kubesphere.io/v1beta1${path}/${module}`
  }

  it('builds v1beta1 namespace roles URL', () => {
    expect(getResourceUrl('roles', { cluster: 'host', namespace: 'dev-wms' })).toBe(
      'kapis/iam.kubesphere.io/v1beta1/klusters/host/namespaces/dev-wms/roles'
    )
  })

  it('does not use retired v1alpha2', () => {
    expect(getResourceUrl({})).not.toMatch(/v1alpha2/)
    expect(getResourceUrl({})).toMatch(/v1beta1/)
  })
})
