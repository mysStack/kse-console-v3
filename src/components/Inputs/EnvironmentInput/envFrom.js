const referenceTypes = {
  configMap: 'configMapRef',
  secret: 'secretRef',
}

export const toEnvFromReference = (type, name, prefix = '') => {
  const refType = referenceTypes[type]
  if (!refType) {
    return null
  }

  const reference = {
    [refType]: { name },
  }

  return prefix ? { ...reference, prefix } : reference
}

export const fromEnvFromReference = reference => {
  if (reference && reference.configMapRef) {
    return {
      type: 'configMap',
      name: reference.configMapRef.name || '',
      prefix: reference.prefix || '',
    }
  }

  if (reference && reference.secretRef) {
    return {
      type: 'secret',
      name: reference.secretRef.name || '',
      prefix: reference.prefix || '',
    }
  }

  return { type: 'configMap', name: '', prefix: '' }
}

export const isDuplicateEnvFrom = (values = [], candidate) => {
  if (!candidate) {
    return false
  }

  const candidateType = candidate.configMapRef ? 'configMapRef' : 'secretRef'
  const candidateName = candidate[candidateType].name

  if (!candidateName) {
    return false
  }

  return values.some(item => {
    const type = item && item.configMapRef ? 'configMapRef' : 'secretRef'
    return (
      item &&
      item[type] &&
      type === candidateType &&
      item[type].name === candidateName
    )
  })
}

export const cleanEnvFrom = (values = []) =>
  values.filter(item => {
    const reference = item && (item.configMapRef || item.secretRef)
    return reference && reference.name
  })
