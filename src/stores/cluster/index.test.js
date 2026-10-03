import { getTenantClustersUrl } from './api'

describe('cluster API compatibility', () => {
  it('uses the supported tenant v1beta1 clusters endpoint', () => {
    expect(getTenantClustersUrl()).toBe(
      'kapis/tenant.kubesphere.io/v1beta1/clusters'
    )
    expect(getTenantClustersUrl('/workspaces/dev-workspace')).toBe(
      'kapis/tenant.kubesphere.io/v1beta1/workspaces/dev-workspace/clusters'
    )
  })
})
