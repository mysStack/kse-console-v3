import { Modal } from 'components/Base'
import { Notify } from '@kube-design/components'

import WorkloadStore from 'stores/workload'
import ConfigReferenceImpact from 'components/Modals/ConfigReferenceImpact'
import { findConfigReferenceImpact } from 'utils/configReferenceImpact'

const WORKLOAD_MODULES = [
  'deployments',
  'statefulsets',
  'daemonsets',
  'cronjobs',
]

export const discoverConfigReferenceImpact = async ({
  cluster,
  namespace,
  type,
  name,
}) => {
  const lists = await Promise.all(
    WORKLOAD_MODULES.map(module => {
      const store = new WorkloadStore(module)
      return store.fetchList({ cluster, namespace, limit: -1 }).then(items =>
        items.map(item => ({
          ...item,
          kind: item.kind || module.replace(/s$/, ''),
        }))
      )
    })
  )

  return findConfigReferenceImpact(
    lists.reduce((all, list) => all.concat(list), []),
    type,
    name
  )
}

export const showConfigReferenceImpact = async params => {
  const { cluster, namespace, type, name } = params
  Notify.info({ content: t('CONFIG_REFERENCE_IMPACT_CHECKING') })
  let references
  try {
    references = await discoverConfigReferenceImpact(params)
  } catch (error) {
    Notify.error({ content: t('CONFIG_REFERENCE_IMPACT_LOAD_FAILED') })
    return []
  }

  if (!references.length) {
    Notify.success({ content: t('UPDATE_SUCCESSFUL') })
    return references
  }

  Modal.open({
    modal: ConfigReferenceImpact,
    onCancel() {},
    cluster,
    namespace,
    references,
    resourceType: type,
    resourceName: name,
  })
  return references
}
