import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import ConfigMapStore from 'stores/configmap'
import SecretStore from 'stores/secret'
import FederatedStore from 'stores/federated'
import { Button } from '@kube-design/components'

import ArrayInput from '../../ArrayInput'
import Item from './Item'
import styles from './index.scss'

export default class EnvFromInput extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    namespace: PropTypes.string,
    cluster: PropTypes.string,
    isFederated: PropTypes.bool,
    configMaps: PropTypes.array,
    secrets: PropTypes.array,
  }

  static defaultProps = {
    value: [],
    onChange() {},
    configMaps: undefined,
    secrets: undefined,
  }

  constructor(props) {
    super(props)
    this.configMapStore = new ConfigMapStore()
    this.secretStore = new SecretStore()

    if (props.isFederated) {
      this.configMapStore = new FederatedStore({
        module: this.configMapStore.module,
      })
      this.secretStore = new FederatedStore({
        module: this.secretStore.module,
      })
    }

    this.state = {
      configMaps: props.configMaps || [],
      secrets: props.secrets || [],
    }
  }

  componentDidMount() {
    if (!this.props.configMaps && !this.props.secrets) {
      this.handleGetResource()
    }
  }

  handleGetResource = () => {
    const { namespace, cluster } = this.props
    const params = { namespace, cluster }
    Promise.all([
      this.configMapStore.fetchListByK8s(params),
      this.secretStore.fetchListByK8s(params),
    ]).then(([configMaps, secrets]) => {
      this.setState({ configMaps, secrets })
    })
  }

  checkItemValid = item => {
    const reference = item && (item.configMapRef || item.secretRef)
    return Boolean(reference && reference.name)
  }

  render() {
    const { configMaps, secrets } = this.state
    const { value, onChange, ...rest } = this.props
    const values = value && value.length ? value : [{}]

    return (
      <div className={styles.wrapper}>
        <div className={styles.heading}>{t('ENVIRONMENT_REFERENCE_PL')}</div>
        <ArrayInput
          {...rest}
          value={values}
          onChange={onChange}
          itemType="object"
          checkItemValid={this.checkItemValid}
          addText={t('ADD_ENVIRONMENT_REFERENCE')}
          desc={t('ENVIRONMENT_REFERENCE_DESC')}
        >
          <Item configMaps={configMaps} secrets={secrets} />
        </ArrayInput>
        {isEmpty(configMaps) && isEmpty(secrets) && (
          <div className={styles.empty}>{t('NO_CONFIGMAP_SECRET')}</div>
        )}
        <Button
          type="flat"
          className={styles.refresh}
          onClick={this.handleGetResource}
        >
          {t('REFRESH')}
        </Button>
      </div>
    )
  }
}
