import { getLocaleAsset, getPreferredLang } from './localeAsset'

describe('getLocaleAsset', () => {
  it('uses the embedded V3 asset root', () => {
    expect(
      getLocaleAsset('en', { 'locale-en.json': 'locale-en.123.json' }, true)
    ).toBe('dist/v3dist/locale-en.123.json')
  })

  it('keeps the standalone V3 asset root', () => {
    expect(
      getLocaleAsset('zh', { 'locale-zh.json': 'locale-zh.456.json' }, false)
    ).toBe('dist/locale-zh.456.json')
  })

  it('returns no asset when the requested locale is unavailable', () => {
    expect(getLocaleAsset('fr', {}, true)).toBeNull()
  })

  it('preserves the host language preference when embedded', () => {
    expect(getPreferredLang(undefined, 'zh', 'en')).toBe('zh')
    expect(getPreferredLang('tc', 'zh', 'en')).toBe('tc')
    expect(getPreferredLang(undefined, undefined, 'en')).toBe('en')
  })
})
