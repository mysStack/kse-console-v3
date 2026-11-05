# Gate A round11 — enabled extension open-only A/B

- pass=True
- 30881 v3dist HTTP 4xx=0
- 30883 v3dist HTTP 4xx=0

## Discover (management / marketplace)
### 30881
- `/extensions/management` loggedIn=True status=200 final=`http://192.168.2.131:30881/extensions/management`
- `/extensions/marketplace` loggedIn=True status=200 final=`http://192.168.2.131:30881/extensions/marketplace`
- extension detail hrefs: 10

### 30883
- `/extensions/management` loggedIn=True status=200 final=`http://192.168.2.131:30883/extensions/management`
- `/extensions/marketplace` loggedIn=True status=200 final=`http://192.168.2.131:30883/extensions/marketplace`
- extension detail hrefs: 10

## Open compare
| href | 30881 | 30883 | equal |
| --- | --- | --- | --- |
| `/extensions/management/wiztelemetry-bpfconductor` | True | True | True |
| `/extensions/management/oauth2-proxy` | True | True | True |
| `/extensions/management/frontend-forge` | True | True | True |
| `/extensions/management/doris` | True | True | True |
| `/extensions/management/computing-device-manager` | True | True | True |
| `/extensions/management/wiztelemetry-tracing` | True | True | True |
| `/extensions/management/wiztelemetry-bpf-collector` | True | True | True |
| `/extensions/management/whizard-telemetry-ruler` | True | True | True |
| `/extensions/management/s2ibuilder` | True | True | True |
| `/extensions/management/nodegroup` | True | True | True |

No install/enable. JSON: `screenshots-ab/round11-extensions.json`.
