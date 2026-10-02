import { getEmbeddedRoute, getHostRoute } from './routeSync'

describe('getHostRoute', () => {
  it('removes the consolev3 prefix from an embedded route', () => {
    expect(
      getHostRoute(
        '/consolev3/dev-workspace/clusters/host/projects/dev-wes/deployments/wes-v2-server/resource-status'
      )
    ).toBe(
      '/dev-workspace/clusters/host/projects/dev-wes/deployments/wes-v2-server/resource-status'
    )
  })

  it('ignores routes outside the embedded console', () => {
    expect(getHostRoute('/login')).toBeNull()
  })

  it('adds the embedded prefix to history paths', () => {
    expect(getEmbeddedRoute('/projects')).toBe('/consolev3/projects')
    expect(getEmbeddedRoute('/consolev3/projects')).toBe('/consolev3/projects')
  })
})
