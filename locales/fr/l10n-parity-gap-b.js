/*
 * Parity gap B: keys referenced by current V3 source but missing from locales/en.
 * Values recovered from release-4.1.5 embedded locale pack where available.
 */

module.exports = {
  // Alerting
  ALERT_RULE_REQUIRED: 'Please enter a rule expression.',
  CPU_USAGE_TCAP: 'CPU Usage',
  DAEMONSETS_VALUES: 'Daemonsets: {values}',
  DEPLOYMENTS_VALUES: 'Deployments: {values}',
  DISABLE_ALARM_TIP: 'After the rule group is disabled, the system will stop generating alerts for the monitored resources. Exercise caution when performing this operation.',
  ENABLE_ALERTING_POLICY: 'Enable Rule Group',
  MEMORY_USAGE_TCAP: 'Memory Usage',
  MESSAGE_REQUIRED: 'Please enter message summary.',
  MONITOR_TARGET_EMPTY: 'Please select a monitoring target.',
  NO_MONITOR_METRIC: 'The alert rule is inactive and no monitoring data is available.',
  OPERATOR_REQUIRED: 'Please set the operator.',
  RESET_MULTIPLE_ALERTING_POLICIES: 'Reset Multiple Rule Groups',
  RESET_MULTIPLE_ALERTING_POLICIES_DESC: 'Are you sure you want to reset the rule groups {name}?',
  RULE_NAME_REQUIRED: 'Please enter a rule name.',
  SEVERITY_REQUIRED: 'Please select an alert severity.',
  STATEFULSETS_VALUES: 'Statefulsets: {values}',
  THRESHOLD_INVALID: 'Please enter a valid metric threshold.',

  // CustomScaling
  ADD_WORKLOAD: 'Add Workload',
  ADD_WORKLOAD_DESC: 'Set up deployments and stateful replica sets as custom ScaledObjects.',
  CREATED_AGO: 'Created {diff}',
  EMPTY_SCALING_OBJECT_MESSAGE: 'The scaledObject cannot be empty',
  ENV_CONTAINER: 'env source container',
  SCALING_OBJECT: 'Scalable Objects',
  UPDATED_AGO: 'Updated {diff}',

  // LogCollection
  LOG_COLLECTION_OS_PASSWORD_TIPS: 'Password for accessing OpenSearch.',
  LOG_COLLECTION_OS_URL_TIPS: 'IP address or hostname of the target OpenSearch instance.',
  LOG_COLLECTION_OS_USER_TIPS: 'Username for accessing OpenSearch.',
  OPENSEARCH_DESC: 'You can use the OpenSearch log receiver to ingest log data into an OpenSearch database. To use this feature, you need to deploy OpenSearch in advance.',

  // SupportLicense
  KUBESPHERE_CLOUD_DESC: 'KubeSphere Cloud builds a Kubernetes-centric digital ecosystem to provide customers with enterprise-level cloud-native services of high quality. It offers KubeSphere Backup, Inspector, and Lite to help you manage, protect, and deliver production-ready applications more efficiently.',
  LICENSE: 'License',

  // ClusterWorkspace
  DELETE_CLUSTER: 'Delete cluster',
  TAG_PL: 'Tags',

  // Other
  PARAMETER: 'Parameter',
  RULES_LIST_EMPTY: 'Please set an alert rule.',

}
