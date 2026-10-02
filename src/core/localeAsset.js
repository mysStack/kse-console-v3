export const getLocaleAsset = (userLang, localeManifest, embedded) => {
  const localePath = localeManifest && localeManifest[`locale-${userLang}.json`]

  if (!localePath) {
    return null
  }

  return `${embedded ? 'dist/v3dist' : 'dist'}/${localePath}`
}
