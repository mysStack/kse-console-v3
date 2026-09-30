import { mount } from 'enzyme'
import React from 'react'

jest.mock('stores/configmap', () => function() {})
jest.mock('stores/secret', () => function() {})
jest.mock('stores/federated', () => function() {})

import EnvFromInput from './index'

const configMaps = [{ name: 'app-config', data: { PORT: '8080' } }]
const secrets = [{ name: 'app-secret', data: { TOKEN: 'secret' } }]

it('renders selectable configmaps and serializes an envFrom reference', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <EnvFromInput
      value={[{}]}
      onChange={onChange}
      configMaps={configMaps}
      secrets={secrets}
      resourcesLoaded
    />
  )

  const item = wrapper.find('EnvFromItem')
  expect(item.find('Select')).toHaveLength(2)
  item.find('Select').at(1).prop('onChange')('app-config')

  expect(onChange).toHaveBeenCalledWith([
    { configMapRef: { name: 'app-config' } },
  ])
})

it('shows an explicit loading status while resources are loading', () => {
  const wrapper = mount(
    <EnvFromInput
      value={[]}
      configMaps={[]}
      secrets={[]}
    />
  )

  wrapper.setState({ loading: true, loadError: false })

  expect(wrapper.text()).toContain('ENVIRONMENT_REFERENCE_LOADING')
})

it('shows an explicit error status and retry action when resource loading fails', () => {
  const wrapper = mount(
    <EnvFromInput
      value={[]}
      configMaps={[]}
      secrets={[]}
    />
  )

  wrapper.setState({ loading: false, loadError: true })

  expect(wrapper.text()).toContain('ENVIRONMENT_REFERENCE_LOAD_FAILED')
  expect(wrapper.find('[data-test="env-from-retry"]').length).toBeGreaterThan(0)
})
