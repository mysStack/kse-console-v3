const { s2iListReject } = require('./listReject')

describe('s2iListReject', () => {
  it('returns empty list for resource-is-not-supported errors', () => {
    expect(
      s2iListReject({
        status: 404,
        reason: 'Not Found',
        message: 'resource is not supported',
      })
    ).toEqual({ items: [], totalItems: 0 })
  })

  it('rejects other errors', async () => {
    await expect(
      s2iListReject({
        status: 403,
        reason: 'Forbidden',
        message: 's2ibuilders is forbidden',
      })
    ).rejects.toMatchObject({ status: 403 })
  })
})
