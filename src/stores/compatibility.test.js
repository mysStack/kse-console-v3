import { getRulesUrl } from './user'
import { getProjectResourceUrl } from './project'
import { getWorkspaceClustersUrl } from './workspace'
import ProjectMonitoring from './monitoring/project'
import WorkloadRankStore from './rank/workload'

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

  it('uses the v1beta1 workspace cluster API', () => {
    expect(getWorkspaceClustersUrl('dev-workspace')).toBe(
      'kapis/tenant.kubesphere.io/v1beta1/workspaces/dev-workspace/clusters'
    )
  })

  it('uses the v1beta1 namespace metrics API for project overview', () => {
    global.globals = { app: { isMultiCluster: false } }
    const store = new ProjectMonitoring()

    expect(
      store.getApi({ workspace: 'dev-workspace', namespace: 'dev-wes' })
    ).toBe('kapis/monitoring.kubesphere.io/v1beta1/namespace_metrics')
  })

  it('uses the v1beta1 workload metrics API for workload ranking', () => {
    global.globals = { app: { isMultiCluster: false } }
    const store = new WorkloadRankStore({ namespaces: 'dev-wes' })

    expect(store.fetchUrl).toBe(
      'kapis/monitoring.kubesphere.io/v1beta1/workload_metrics'
    )
  })
})
