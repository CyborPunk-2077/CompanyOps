# Remote Reconciliation — 2026-08-18

A prior GitHub-only checkpoint claimed PACK-035/036 completion but did not contain the implementation files named by those manifests. For example, `apps/api/src/core/flagship-experiment.ts` was absent from `main` when inspected.

Per the permanent CompanyOps rule, implementation claims require source/filesystem verification. Therefore that metadata-only checkpoint remains in Git history for auditability but is **not an authoritative completed implementation milestone**. Its PACK-035/036 manifests have been removed from current HEAD so fresh agents do not resume from an unimplemented state.

The highest source-backed, test-verified implementation is **PACK-034**.

The complete verified PACK-034 source is stored remotely as a hash-pinned archive split across:

- `.companyops-bootstrap/pack034-f0e90737/pack034.tar.xz.b64.part00`
- `.companyops-bootstrap/pack034-f0e90737/pack034.tar.xz.b64.part01`

Reconstruct it with:

```bash
cat .companyops-bootstrap/pack034-f0e90737/pack034.tar.xz.b64.part00 \
    .companyops-bootstrap/pack034-f0e90737/pack034.tar.xz.b64.part01 \
  | base64 --decode > /tmp/CompanyOps_PACK034.tar.xz

echo 'f54e61ed8788093e91ec40801b2180ce19f01c8debb802537643fe90898aa401  /tmp/CompanyOps_PACK034.tar.xz' | sha256sum -c -
mkdir -p /tmp/CompanyOps_PACK034
tar -xJf /tmp/CompanyOps_PACK034.tar.xz -C /tmp/CompanyOps_PACK034
```

The attempted GitHub Actions materialization workflow did not execute in this repository, so the normal GitHub source tree must not be described as a complete checkout yet. `CURRENT_STATE.md` plus this verified archive are the remote recovery authority until a normal full Git push can be performed from a network-capable environment.
