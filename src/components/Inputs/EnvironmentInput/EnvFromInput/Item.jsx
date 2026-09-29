import React from 'react'
import PropTypes from 'prop-types'
import { Input, Select } from '@kube-design/components'

import { getDisplayName } from 'utils'
import {
  fromEnvFromReference,
  isDuplicateEnvFrom,
  toEnvFromReference,
} from '../envFrom'
import styles from './index.scss'

export default class EnvFromItem extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    arrayValue: PropTypes.array,
    onChange: PropTypes.func,
    configMaps: PropTypes.array,
    secrets: PropTypes.array,
  }

  static defaultProps = {
    value: {},
    arrayValue: [],
    onChange() {},
    configMaps: [],
    secrets: [],
  }

  get parsedValue() {
    return fromEnvFromReference(this.props.value)
  }

  get resourceOptions() {
    const { configMaps, secrets } = this.props
    const { type } = this.parsedValue
    const resources = type === 'configMap' ? configMaps : secrets
    return resources.map(resource => ({
      label: getDisplayName(resource),
      value: resource.name,
    }))
  }

  handleChange = (type, name, prefix) => {
    const { arrayValue, index, onChange } = this.props
    const reference = toEnvFromReference(type, name, prefix)
    if (!reference) {
      onChange({})
      return
    }

    const otherValues = arrayValue.filter((_, position) => position !== index)
    if (isDuplicateEnvFrom(otherValues, reference)) {
      return
    }
    onChange(reference)
  }

  handleTypeChange = type => {
    const { prefix } = this.parsedValue
    this.handleChange(type, '', prefix)
  }

  handleResourceChange = name => {
    const { type, prefix } = this.parsedValue
    this.handleChange(type, name, prefix)
  }

  handlePrefixChange = prefix => {
    const { type, name } = this.parsedValue
    this.handleChange(type, name, prefix)
  }

  render() {
    const { type, name, prefix } = this.parsedValue
    return (
      <div className={styles.item}>
        <Select
          data-test="env-from-type"
          value={type}
          options={[
            { label: t('CONFIGMAP'), value: 'configMap' },
            { label: t('SECRET'), value: 'secret' },
          ]}
          onChange={this.handleTypeChange}
        />
        <Select
          data-test="env-from-resource"
          value={name}
          options={this.resourceOptions}
          placeholder={t('SELECT_RESOURCE')}
          onChange={this.handleResourceChange}
        />
        <Input
          data-test="env-from-prefix"
          value={prefix}
          placeholder={t('ENVIRONMENT_PREFIX')}
          onChange={this.handlePrefixChange}
        />
      </div>
    )
  }
}
