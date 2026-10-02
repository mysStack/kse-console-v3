export const getLocaleAsset = (userLang, localeManifest, embedded) => {
  const localePath = localeManifest && localeManifest[`locale-${userLang}.json`]

  if (!localePath) {
    return null
  }

  return `${embedded ? 'dist/v3dist' : 'dist'}/${localePath}`
}

// The embedded V3 runtime does not receive the V3 user object. Prefer an
// explicitly selected language from the host cookie before falling back to
// the browser language so the child does not silently switch to English.
export const getPreferredLang = (userLang, cookieLang, browserLang) =>
  userLang || cookieLang || browserLang
