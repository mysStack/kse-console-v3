const {
  isUnsupportedResourceError,
  unsupportedListResult,
} = require('./unsupported')

describe('isUnsupportedResourceError', () => {
  it('matches the applications CRD miss from the API', () => {
    expect(
      isUnsupportedResourceError({
        status: 'Failure',
        reason: 'Not Found',
        message: 'resource is not supported',
      })
    ).toBe(true)
  })

  it('matches a plain-text 404 body passed as the second reject argument', () => {
    const response = { status: 404, statusText: 'Not Found' }
    expect(
      unsupportedListResult(response, {
        status: 404,
        reason: 'Not Found',
        message: 'resource is not supported',
      })
    ).toEqual({ items: [], totalItems: 0 })
  })

  it('does not treat an empty list or a permission error as unsupported', () => {
    expect(isUnsupportedResourceError(null)).toBe(false)
    expect(
      isUnsupportedResourceError({
        status: 403,
        reason: 'Forbidden',
        message: 'applications.apps.kubesphere.io is forbidden',
      })
    ).toBe(false)
    expect(
      unsupportedListResult({ status: 403, message: 'forbidden' }, null)
    ).toBe(null)
  })
})
