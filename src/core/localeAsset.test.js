import { getLocaleAsset } from './localeAsset'

describe('getLocaleAsset', () => {
  it('uses the embedded V3 asset root', () => {
    expect(
      getLocaleAsset(
        'en',
        { 'locale-en.json': 'locale-en.123.json' },
        true
      )
    ).toBe('dist/v3dist/locale-en.123.json')
  })

  it('keeps the standalone V3 asset root', () => {
    expect(
      getLocaleAsset(
        'zh',
        { 'locale-zh.json': 'locale-zh.456.json' },
        false
      )
    ).toBe('dist/locale-zh.456.json')
  })

  it('returns no asset when the requested locale is unavailable', () => {
    expect(getLocaleAsset('fr', {}, true)).toBeNull()
  })
})
