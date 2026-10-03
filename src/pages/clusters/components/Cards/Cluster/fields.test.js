import { getClusterCardFields } from './fields'

describe('cluster card fields', () => {
  it('keeps the KubeSphere version and tags visible when the API provides them', () => {
    expect(
      getClusterCardFields({
        nodeCount: 1,
        kubernetesVersion: 'v1.31.13+k3s1',
        kubeSphereVersion: 'v4.1.4-12+7bf4ea82300ec1',
        provider: 'kubesphere',
        tags: ['production'],
      })
    ).toEqual([
      { key: 'nodeCount', value: 1 },
      { key: 'kubernetesVersion', value: 'v1.31.13+k3s1' },
      { key: 'kubeSphereVersion', value: 'v4.1.4-12+7bf4ea82300ec1' },
      { key: 'provider', value: 'kubesphere' },
      { key: 'tags', value: ['production'] },
    ])
  })
})
