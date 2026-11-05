# v3dist hostPath mount (no second V4 image build)

- Deploy: `kubesphere-system/ks-console-v415-rea`
- Pod: `ks-console-v415-rea-8777dc48c-2dhsd`
- Node hostPath: `/opt/ks-console-v3dist-parity` on `dev01`
- Mount: `/opt/kubesphere/console/dist/v3dist` (readOnly)
- Source: rebuilt `console-v3dist.tgz` from `feature/v3-parity` @ 8843ead

## Rollback

```bash
# remove mount annotation/volume from deploy, or point hostPath back to image content
kubectl -n kubesphere-system rollout undo deploy/ks-console-v415-rea
# or delete host override and remount original by removing volumeMount
```

Also keep helper seed path; replacing files under `/opt/ks-console-v3dist-parity` then deleting the pod reloads content without rebuilding image.
