import { normalizeGlobalNavs, normalizeProjectNavs } from './global'

describe('normalizeProjectNavs', () => {
  it('adapts the current object-shaped project navigation to the legacy nav group contract', () => {
    const children = [{ name: 'deployments' }]

    expect(normalizeProjectNavs({ name: 'project', children })).toEqual([
      { name: 'project', children, items: children },
    ])
  })

  it('preserves legacy array-shaped project navigation', () => {
    const navs = [{ name: 'project', items: [{ name: 'deployments' }] }]

    expect(normalizeProjectNavs(navs)).toBe(navs)
  })
})

describe('normalizeGlobalNavs', () => {
  it('adapts the current object-shaped global navigation to a list of items', () => {
    const children = [{ name: 'apps-manage' }]

    expect(normalizeGlobalNavs({ name: 'platform', children })).toEqual(
      children
    )
  })

  it('preserves legacy array-shaped global navigation', () => {
    const navs = [{ name: 'apps-manage' }]

    expect(normalizeGlobalNavs(navs)).toBe(navs)
  })
})
