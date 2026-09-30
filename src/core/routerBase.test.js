import { getRouterBasename } from './routerBase'

describe('getRouterBasename', () => {
  it('strips the consolev3 mount path for embedded routes', () => {
    expect(
      getRouterBasename(
        '/consolev3/dev-workspace/clusters/host/projects/dev-wes/deployments'
      )
    ).toBe('/consolev3')
  })

  it('does not change regular standalone routes', () => {
    expect(getRouterBasename('/dashboard')).toBe('')
  })
})
