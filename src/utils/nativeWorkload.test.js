import {
  getNativeWorkloadBridge,
  navigateToNativeWorkload,
} from './nativeWorkload'

describe('native workload bridge', () => {
  afterEach(() => {
    delete window.$wujie
  })

  it('does not intercept V3 actions without the host bridge', () => {
    expect(getNativeWorkloadBridge()).toBe(null)
    expect(
      navigateToNativeWorkload({ mode: 'create', kind: 'deployments' })
    ).toBe(false)
  })

  it('delegates native navigation to the host', () => {
    const navigate = jest.fn()
    window.$wujie = {
      props: {
        nativeWorkloadForm: true,
        navigateToNativeWorkload: navigate,
      },
    }

    expect(
      navigateToNativeWorkload({
        mode: 'edit',
        kind: 'statefulsets',
        name: 'redis',
      })
    ).toBe(true)
    expect(navigate).toHaveBeenCalledWith({
      mode: 'edit',
      kind: 'statefulsets',
      name: 'redis',
    })
  })
})
