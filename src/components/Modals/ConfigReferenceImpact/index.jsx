import React from 'react'
import PropTypes from 'prop-types'

import { Checkbox, Notify } from '@kube-design/components'
import { Modal } from 'components/Base'
import WorkloadStore from 'stores/workload'

import styles from './index.scss'

export default class ConfigReferenceImpact extends React.Component {
  static propTypes = {
    references: PropTypes.array,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
    resourceName: PropTypes.string,
  }

  static defaultProps = {
    references: [],
    visible: false,
    onOk() {},
    onCancel() {},
    isSubmitting: false,
    resourceName: '',
  }

  state = {
    selected: [],
    statuses: {},
    submitting: false,
  }

  getReferenceId = reference =>
    `${reference.module}/${reference.namespace}/${reference.name}`

  handleToggle = reference => {
    const id = this.getReferenceId(reference)
    this.setState(({ selected }) => ({
      selected: selected.includes(id)
        ? selected.filter(item => item !== id)
        : [...selected, id],
    }))
  }

  handleRestart = async () => {
    const { references } = this.props
    const { selected } = this.state
    const selectedReferences = references.filter(reference =>
      selected.includes(this.getReferenceId(reference))
    )

    if (!selectedReferences.length) {
      return
    }

    this.setState({ submitting: true })
    const results = await Promise.all(
      selectedReferences.map(async reference => {
        try {
          await new WorkloadStore(reference.module).recreate(reference)
          return { id: this.getReferenceId(reference), status: 'success' }
        } catch (error) {
          return { id: this.getReferenceId(reference), status: 'failed' }
        }
      })
    )
    const statuses = results.reduce(
      (result, item) => ({ ...result, [item.id]: item.status }),
      {}
    )
    const failed = results.some(item => item.status === 'failed')
    this.setState({ statuses, submitting: false })

    if (failed) {
      Notify.error({ content: t('CONFIG_REFERENCE_RESTART_PARTIAL_FAILED') })
      return
    }

    Notify.success({ content: t('CONFIG_REFERENCE_RESTART_SUCCESS') })
    this.props.onCancel()
  }

  handleSaveOnly = () => {
    Notify.success({ content: t('UPDATE_SUCCESSFUL') })
    this.props.onCancel()
  }

  render() {
    const { references, visible, resourceName } = this.props
    const { selected, statuses, submitting } = this.state

    return (
      <Modal
        width={640}
        title={t('CONFIG_REFERENCE_IMPACT_TITLE')}
        description={t('CONFIG_REFERENCE_IMPACT_DESC', { name: resourceName })}
        visible={visible}
        onCancel={this.handleSaveOnly}
        cancelText={t('CONFIG_REFERENCE_SAVE_ONLY')}
        onOk={this.handleRestart}
        okText={t('CONFIG_REFERENCE_RESTART_SELECTED')}
        disableSubmit={!selected.length || submitting}
        isSubmitting={submitting}
      >
        <div className={styles.wrapper}>
          <p className={styles.hint}>{t('CONFIG_REFERENCE_IMPACT_HINT')}</p>
          {references.map(reference => {
            const id = this.getReferenceId(reference)
            const status = statuses[id]
            return (
              <div className={styles.item} key={id}>
                <Checkbox
                  checked={selected.includes(id)}
                  disabled={submitting}
                  onChange={() => this.handleToggle(reference)}
                >
                  <span className={styles.name}>{reference.name}</span>
                  <span className={styles.kind}>
                    {t(`${reference.module.toUpperCase()}_LOW`)}
                  </span>
                </Checkbox>
                {status && (
                  <span className={styles.status}>
                    {t(
                      status === 'success'
                        ? 'CONFIG_REFERENCE_RESTART_SUCCESS_ITEM'
                        : 'CONFIG_REFERENCE_RESTART_FAILED_ITEM'
                    )}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </Modal>
    )
  }
}
