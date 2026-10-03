export const getClusterCardFields = data => [
  { key: 'nodeCount', value: data.nodeCount },
  { key: 'kubernetesVersion', value: data.kubernetesVersion },
  { key: 'kubeSphereVersion', value: data.kubeSphereVersion },
  { key: 'provider', value: data.provider },
  { key: 'tags', value: data.tags },
]
