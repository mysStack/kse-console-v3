import React from 'react'
import { shallow } from 'enzyme'

const mockRecreate = jest.fn(() => Promise.resolve())

jest.mock('stores/workload', () =>
  jest.fn().mockImplementation(() => ({ recreate: mockRecreate }))
)

import ConfigReferenceImpact from './index'

const references = [
  {
    module: 'deployments',
    kind: 'Deployment',
    namespace: 'demo',
    name: 'web',
  },
]

it('restarts only the selected workload and closes after success', async () => {
  const onCancel = jest.fn()
  const wrapper = shallow(
    <ConfigReferenceImpact
      references={references}
      resourceName="app-config"
      onCancel={onCancel}
      visible
    />
  )

  wrapper.instance().handleToggle(references[0])
  await wrapper.instance().handleRestart()

  expect(mockRecreate).toHaveBeenCalledWith(references[0])
  expect(onCancel).toHaveBeenCalled()
})
