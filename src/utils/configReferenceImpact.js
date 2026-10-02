import { get } from 'lodash'

const supportedKinds = new Set([
  'deployment',
  'statefulset',
  'daemonset',
  'cronjob',
])

const referenceFields = {
  configMap: 'configMapRef',
  secret: 'secretRef',
}

const workloadModules = {
  deployment: 'deployments',
  statefulset: 'statefulsets',
  daemonset: 'daemonsets',
  cronjob: 'cronjobs',
}

export const createRestartPatch = timestamp => ({
  spec: {
    template: {
      metadata: {
        annotations: {
          'kubesphere.io/restartedAt': timestamp || new Date().toISOString(),
        },
      },
    },
  },
})

export const createCronJobRestartPatch = timestamp => ({
  spec: {
    jobTemplate: {
      spec: {
        template: {
          metadata: {
            annotations: {
              'kubesphere.io/restartedAt':
                timestamp || new Date().toISOString(),
            },
          },
        },
      },
    },
  },
})

const normalizeKind = workload =>
  String(get(workload, 'kind', ''))
    .replace(/List$/, '')
    .replace(/StatefulSet/, 'statefulset')
    .replace(/DaemonSet/, 'daemonset')
    .replace(/Deployment/, 'deployment')
    .replace(/CronJob/, 'cronjob')
    .toLowerCase()

const workloadReferences = workload => {
  const templatePath =
    normalizeKind(workload) === 'cronjob'
      ? 'spec.jobTemplate.spec.template.spec'
      : 'spec.template.spec'
  const containers = get(workload, `${templatePath}.containers`, [])
  if (!Array.isArray(containers)) {
    return []
  }

  return containers.reduce((references, container) => {
    const envFrom = Array.isArray(container && container.envFrom)
      ? container.envFrom
      : []
    return references.concat(envFrom)
  }, [])
}

export const findConfigReferenceImpact = (workloads = [], type, name) => {
  const referenceField = referenceFields[type]
  if (!referenceField || !name || !Array.isArray(workloads)) {
    return []
  }

  return workloads.reduce((result, workload) => {
    const kind = normalizeKind(workload)
    if (!supportedKinds.has(kind)) {
      return result
    }

    const matches = workloadReferences(workload).some(item => {
      return get(item, `${referenceField}.name`) === name
    })
    if (!matches) {
      return result
    }

    result.push({
      kind: get(workload, 'kind', kind),
      module: workloadModules[kind],
      name: get(workload, 'name', get(workload, 'metadata.name', '')),
      namespace: get(
        workload,
        'namespace',
        get(workload, 'metadata.namespace', '')
      ),
      cluster: get(workload, 'cluster', ''),
      reason: `${referenceField}:${name}`,
    })
    return result
  }, [])
}

export const getReferenceField = type => referenceFields[type]
