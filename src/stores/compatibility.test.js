import { getRulesUrl } from './user'
import { getProjectResourceUrl } from './project'

describe('KubeSphere v4 API compatibility', () => {
  it('uses the v1beta1 role template API for project rules', () => {
    expect(
      getRulesUrl({
        name: 'admin',
        cluster: 'host',
        workspace: 'dev-workspace',
        namespace: 'dev-wes',
      })
    ).toBe(
      'clusters/host/kapis/iam.kubesphere.io/v1beta1/users/admin/roletemplates?scope=namespace&namespace=dev-wes'
    )
  })

  it('uses the v1beta1 namespace API without the removed klusters path', () => {
    expect(
      getProjectResourceUrl({
        workspace: 'dev-workspace',
        cluster: 'host',
      })
    ).toBe(
      'kapis/tenant.kubesphere.io/v1beta1/workspaces/dev-workspace/namespaces'
    )
  })
})
