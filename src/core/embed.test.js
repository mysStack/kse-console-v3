import { isWujieEmbedded } from './embed'

describe('isWujieEmbedded', () => {
  afterEach(() => {
    delete window.__POWERED_BY_WUJIE__
  })

  it('detects a Wujie child window', () => {
    window.__POWERED_BY_WUJIE__ = true

    expect(isWujieEmbedded()).toBe(true)
  })

  it('keeps standalone V3 mode when the marker is absent', () => {
    expect(isWujieEmbedded()).toBe(false)
  })
})
