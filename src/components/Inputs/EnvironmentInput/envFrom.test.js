import {
  isDuplicateEnvFrom,
  toEnvFromReference,
  fromEnvFromReference,
  cleanEnvFrom,
} from './envFrom'

describe('envFrom references', () => {
  it('creates a configmap reference without exposing data', () => {
    expect(toEnvFromReference('configMap', 'app-config', 'APP_')).toEqual({
      configMapRef: { name: 'app-config' },
      prefix: 'APP_',
    })
  })

  it('creates a secret reference without an empty prefix', () => {
    expect(toEnvFromReference('secret', 'app-secret', '')).toEqual({
      secretRef: { name: 'app-secret' },
    })
  })

  it('reads Kubernetes references into safe form values', () => {
    expect(
      fromEnvFromReference({
        secretRef: { name: 'app-secret' },
        prefix: 'SECRET_',
      })
    ).toEqual({ type: 'secret', name: 'app-secret', prefix: 'SECRET_' })
  })

  it('detects duplicates by resource type and name', () => {
    const values = [
      { configMapRef: { name: 'app-config' } },
      { secretRef: { name: 'app-secret' } },
    ]

    expect(
      isDuplicateEnvFrom(values, toEnvFromReference('configMap', 'app-config'))
    ).toBe(true)
    expect(
      isDuplicateEnvFrom(values, toEnvFromReference('secret', 'other-secret'))
    ).toBe(false)
  })

  it('removes incomplete rows before submitting the workload', () => {
    expect(
      cleanEnvFrom([
        { configMapRef: { name: 'app-config' } },
        {},
        { secretRef: { name: '' } },
      ])
    ).toEqual([{ configMapRef: { name: 'app-config' } }])
  })
})
