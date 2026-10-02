import {
  createCronJobRestartPatch,
  createRestartPatch,
  findConfigReferenceImpact,
} from './configReferenceImpact'

const workload = (kind, name, envFrom) => ({
  kind,
  name,
  namespace: 'demo',
  spec: {
    template: {
      spec: {
        containers: [{ name: 'app', envFrom }],
      },
    },
  },
})

describe('config reference impact discovery', () => {
  it('creates a pod template restart patch without changing workload settings', () => {
    expect(createRestartPatch('2026-10-02T00:00:00.000Z')).toEqual({
      spec: {
        template: {
          metadata: {
            annotations: {
              'kubesphere.io/restartedAt': '2026-10-02T00:00:00.000Z',
            },
          },
        },
      },
    })
  })

  it('updates the future pod template for CronJobs', () => {
    expect(createCronJobRestartPatch('2026-10-02T00:00:00.000Z')).toEqual({
      spec: {
        jobTemplate: {
          spec: {
            template: {
              metadata: {
                annotations: {
                  'kubesphere.io/restartedAt': '2026-10-02T00:00:00.000Z',
                },
              },
            },
          },
        },
      },
    })
  })

  it('finds references across supported workload kinds without reading secret data', () => {
    const workloads = [
      workload('Deployment', 'web', [{ configMapRef: { name: 'app-config' } }]),
      workload('StatefulSet', 'worker', [
        { secretRef: { name: 'app-secret' } },
      ]),
      workload('DaemonSet', 'node', [
        { configMapRef: { name: 'other-config' } },
      ]),
      {
        kind: 'CronJob',
        name: 'scheduled',
        namespace: 'demo',
        spec: {
          jobTemplate: {
            spec: {
              template: {
                spec: {
                  containers: [
                    {
                      envFrom: [{ secretRef: { name: 'app-secret' } }],
                    },
                  ],
                },
              },
            },
          },
        },
      },
      workload('Job', 'one-shot', [{ configMapRef: { name: 'app-config' } }]),
    ]

    expect(
      findConfigReferenceImpact(workloads, 'configMap', 'app-config')
    ).toEqual([expect.objectContaining({ kind: 'Deployment', name: 'web' })])
    expect(
      findConfigReferenceImpact(workloads, 'secret', 'app-secret')
    ).toEqual([
      expect.objectContaining({ kind: 'StatefulSet', name: 'worker' }),
      expect.objectContaining({ kind: 'CronJob', name: 'scheduled' }),
    ])
  })

  it('checks every container and ignores incomplete or unrelated references', () => {
    const workloads = [
      {
        kind: 'Deployment',
        name: 'multi',
        namespace: 'demo',
        spec: {
          template: {
            spec: {
              containers: [
                {
                  env: [
                    { valueFrom: { secretKeyRef: { name: 'app-secret' } } },
                  ],
                },
                { envFrom: [{ secretRef: { name: 'app-secret' } }] },
                { envFrom: [{ configMapRef: {} }] },
              ],
            },
          },
        },
      },
    ]

    expect(
      findConfigReferenceImpact(workloads, 'secret', 'app-secret')
    ).toHaveLength(1)
    expect(
      findConfigReferenceImpact(workloads, 'configMap', 'missing')
    ).toEqual([])
  })
})
