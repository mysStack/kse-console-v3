const { silenceUnsupportedListReject } = require('./silenceUnsupported')

describe('silenceUnsupportedListReject', () => {
  it('returns empty list for resource-is-not-supported errors', () => {
    expect(
      silenceUnsupportedListReject({
        status: 404,
        reason: 'Not Found',
        message: 'resource is not supported',
      })
    ).toEqual({ items: [], totalItems: 0 })
  })

  it('rejects other errors', async () => {
    await expect(
      silenceUnsupportedListReject({
        status: 403,
        reason: 'Forbidden',
        message: 'forbidden',
      })
    ).rejects.toMatchObject({ status: 403 })
  })
})
