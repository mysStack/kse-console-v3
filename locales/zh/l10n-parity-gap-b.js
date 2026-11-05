/*
 * Parity gap B: keys referenced by current V3 source but missing from locales/en.
 * Values recovered from release-4.1.5 embedded locale pack where available.
 */

module.exports = {
  // Alerting
  ALERT_RULE_REQUIRED: '请输入规则表达式。',
  CPU_USAGE_TCAP: 'CPU 用量',
  DAEMONSETS_VALUES: '守护进程集：{values}',
  DEPLOYMENTS_VALUES: '部署: {values}',
  DISABLE_ALARM_TIP: '规则组被禁用后，系统将停止对被监控的资源生成告警。请谨慎执行此操作。',
  ENABLE_ALERTING_POLICY: '启用规则组',
  MEMORY_USAGE_TCAP: '内存用量',
  MESSAGE_REQUIRED: '请输入消息概要。',
  MONITOR_TARGET_EMPTY: '请选择监控目标。',
  NO_MONITOR_METRIC: '当前告警规则未触发告警，暂无监控数据。',
  OPERATOR_REQUIRED: '请设置操作符。',
  RESET_MULTIPLE_ALERTING_POLICIES: '批量重置规则组',
  RESET_MULTIPLE_ALERTING_POLICIES_DESC: '您确定重置规则组 {name} 吗？',
  RULE_NAME_REQUIRED: '请设置规则名称。',
  SEVERITY_REQUIRED: '请选择告警级别。',
  STATEFULSETS_VALUES: '有状态副本集：{values}',
  THRESHOLD_INVALID: '请输入有效的指标阈值。',

  // CustomScaling
  ADD_WORKLOAD: '添加工作负载',
  ADD_WORKLOAD_DESC: '设置部署和有状态副本集作为自定义伸缩对象。',
  CREATED_AGO: '创建于 {diff}',
  EMPTY_SCALING_OBJECT_MESSAGE: '伸缩对象不能为空。',
  ENV_CONTAINER: 'env 源容器',
  SCALING_OBJECT: '伸缩对象',
  UPDATED_AGO: '更新于 {diff}',

  // LogCollection
  LOG_COLLECTION_OS_PASSWORD_TIPS: '用于访问 OpenSearch 的密码。',
  LOG_COLLECTION_OS_URL_TIPS: '目标 OpenSearch 实例的 IP 地址或主机名。',
  LOG_COLLECTION_OS_USER_TIPS: '用于访问 OpenSearch 的用户名。',
  OPENSEARCH_DESC: '您可以使用 OpenSearch 日志接收器将日志数据导入 OpenSearch 数据库。 如需使用此功能，您需要提前部署 OpenSearch。',

  // SupportLicense
  KUBESPHERE_CLOUD_DESC: 'KubeSphere Cloud 围绕 Kubernetes 构建的数字化生态，以极高要求、极高标准，为客户提供企业级的云原生服务与支持，现已有备份容灾、集群巡检、轻量集群等，助力您更便捷高效地管理、保护、交付生产级应用。',
  LICENSE: '许可证',

  // ClusterWorkspace
  DELETE_CLUSTER: '删除集群',
  TAG_PL: '标签',

  // Other
  PARAMETER: '参数',
  RULES_LIST_EMPTY: '请设置告警规则。',

}
