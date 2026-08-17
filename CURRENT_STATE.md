# CompanyOps / CompanyLab — CURRENT STATE

> **Permanent identity:** **CompanyOps = CompanyLab.**
> Existing internal names (`companylab`, CompanyLab UI, package IDs, schemas and contract URLs) are intentional.
>
> **Authority rule:** inspect the filesystem/repository first. Conversation history is intent/rationale only.

## Current project state

### Milestone

- Current cumulative implementation: **PACK-034**.
- Working version: **`0.0.34-execution-live-transport`**.
- Status: **`EXECUTION_AND_LIVE_RESULT_TRANSPORT_READY`**.
- Product: **Business CI — pre-production operational regression testing for business changes.**
- Current flagship: cost-first eligible procurement saves unit cost but causes supplier/service harm under a matched supplier-degradation world; authoritative result is **FAIL / BLOCK**.
- Canonical GitHub repository: `CyborPunk-2077/CompanyOps`.
- Next recommended coherent batch: **PACK-035 → PACK-036 — Experiment Setup + Preflight and Safety Membrane Execution Boundary**.

### Canonical project root

The directory containing this file is the canonical project root.

```text
apps/api/                       workspace API, orchestration, persistence/read handlers
apps/web/                       server-first Twinframe result UI + live result source
packages/company-model/         immutable CompanyPackage runtime
packages/config/                typed environment/config
packages/contracts/             JSON Schema/OpenAPI/RBAC + generated TS/Python bindings
packages/testing/               deterministic browser fixtures and visual QA
packages/ui/                    design system + Twinframe/result primitives
services/simulation-engine/     simulation, replay, evaluation, projection, execution worker
database/                       PostgreSQL migrations/tools
specs/                          architecture/product specifications
state/                          ADRs, continuity and coverage
packets/                        PACK manifests
.github/workflows/              CI
CURRENT_STATE.md                durable handoff
```

### Architecture

```text
CompanyPackage / Company IR
→ immutable CompanyModel
→ deterministic runtime bootstrap
→ discrete-event scheduler + semantic HMAC RNG
→ typed BusinessEvents / pure reducer
→ exact RuntimeState + snapshots/replay
→ matched Baseline/Treatment worlds
→ demand/order/inventory/fulfillment
→ replenishment/procurement/supplier execution
→ deterministic KPI observations
→ matched-pair statistics / assertions
→ BusinessVerdict + ReleaseRecommendation
→ sealed backend projection
→ immutable persistence
→ workspace API
→ server-first Twinframe
```

Execution application path now exists:

```text
POST experiment
→ persistent READY experiment
→ POST runs
→ persistent execution claim + real progress-carrier Baseline run
→ Python execution worker
→ 200 matched pairs / 400 run observations
→ evaluation
→ sealed projection
→ atomic database seal
→ terminal SEALED progress
→ API result reads
→ server-rendered Twinframe
```

Semantic truth boundary remains:

```text
DOMAIN → RUNTIME → EVALUATION → SECURITY → BACKEND PROJECTION → UI
```

The web layer may format/navigation-select authoritative data. It must not calculate KPI truth, paired harm, CI, assertion status, verdict, recommendation or gate semantics.

## Completed

### Contracts and API lineage

- Historical PACK-010 contract lock:
  `292da499b452a6c77677b80f68629929180fe9f577579a0bbb6e886ec8851c83`
- Active JSON-Schema contract count: **36**.
- Active contract lock:
  `3cc3f0bc776f43f835d12af0f06ddc74a303329f61154311e15f687cd84567ee`
- CompanyPackage 1.0 preserved; 1.1 additive correction.
- BusinessEvent 1.0/1.1 preserved; 1.2 additive supplier delivery-miss evidence.
- OpenAPI **1.1.0** is active.
- OpenAPI 1.0.0 is preserved at:
  `packages/contracts/api/history/openapi-v1.0.0.json`.
- OpenAPI 1.1 only adds optional `assertion_id` selection to chronology; existing callers remain compatible.
- No JSON-Schema contract changed in PACK-033/034.

### Database / API

There are now **7 PostgreSQL migrations**.

Implemented persistence includes:

- workspaces / memberships;
- immutable CompanyPackages;
- experiments;
- simulation runs;
- BusinessEvents / audit;
- run progress;
- snapshots;
- evaluations;
- idempotency;
- immutable view projections;
- **experiment execution claims/state**.

Tenant resources use workspace authorization + PostgreSQL RLS where defined.

API now implements:

- `createExperiment`;
- `getExperiment`;
- `startExperimentRuns`;
- `getRunProgressStream`;
- cockpit;
- assertion-scoped chronology;
- consequence spine;
- replay.

`startExperimentRuns` is idempotency-protected by the existing API layer and separately suppresses duplicate active execution claims.

### Experiment execution — PACK-033

Execution protocol:

- version: `companylab.execution-artifact/0.1.0`
- execution engine: `companylab.execution/0.1.0`
- STANDARD plan: **200 matched pairs**
- resulting run observations: **400**
- Baseline: 200
- Treatment: 200

The API does not implement simulation semantics. It launches:

`services/simulation-engine/tools/execute_flagship.py`

through the development/test-only process adapter.

Worker transport:

```text
JSONL progress events
+
base64 result chunks
+
terminal byte-count/SHA-256
```

The result is reconstructed only after its byte count and SHA-256 verify.

Execution Golden v1:

`services/simulation-engine/fixtures/execution-golden-v1.json`

SHA-256:

`5f93becadca10220aee957fc8e959ee7d9a521b6b19c189b4d2eb33551b8b5e5`

Pinned STANDARD execution:

- 400 runs
- verdict `FAIL`
- recommendation `BLOCK`
- projection SHA-256 `8d9fd9b4d1167c6bee795cbde35560814ba5dea3374ee22be236bb80498a2271`
- sealed-result SHA-256 `28b0f76c32b4fa46a856ff091d0a3c03c29c1d235404b6d1c0600d14ab6588af`

Persistence policy for current MVP:

- every run: identity, variant/pair/scenario, metrics, event-stream hash, state hash, deterministic replay metadata;
- raw BusinessEvents: representative matched pair only;
- evaluation: immutable;
- projection: immutable;
- execution state: persistent.

Other runs remain deterministically reproducible from pinned model/scenario/seed semantics.

### Progress / live result transport — PACK-034

The first Baseline run is both a genuine simulation run and the execution progress carrier.

Progress uses frozen RunProgressEvent v1 semantics and contains wall-clock operational progress only. It never introduces simulation-time meaning.

`getRunProgressStream` provides reconnecting SSE snapshots with `Last-Event-ID` filtering.

Critical ordering rule:

> `SEALED` is not persisted/exposed until simulation summaries, evaluation, projection, experiment state and execution state have committed.

This avoids a client observing SEALED before cockpit/evidence is readable.

### Live Twinframe source

The server-first web page now uses live API result data when:

```text
COMPANYLAB_API_BASE_URL
COMPANYLAB_WORKSPACE_ID
COMPANYLAB_DEV_PRINCIPAL_ID
```

are configured.

The API supplies:

- cockpit;
- assertion-selected chronology;
- consequence spine;
- replay.

When no API base is configured, the known sealed projection fixture is used explicitly as `OFFLINE_FIXTURE`.

**If a live API is configured and fails, the web application throws. It does not silently substitute fixture truth.**

Experiment identity is preserved through lens/assertion/pair/joint/cursor navigation.

### Existing product/runtime features preserved

- Simulation Safety Membrane architecture.
- no ambient SUT authority.
- deterministic HMAC semantic RNG.
- integer-microsecond simulation time.
- replay never re-calls SUT.
- atomic multi-event transitions.
- demand/order/fulfillment business loop.
- replenishment/procurement/supplier execution.
- hard supplier eligibility distinct from realized degradation.
- original customer commitment preserved.
- deterministic goldens v1/v2/v3.
- 200-pair deterministic evaluation + bootstrap CI.
- backend-only semantic projection.
- premium Twinframe UI: Quiet Instrumentation, Dramatic Divergence.
- aggregate evidence remains authoritative; representative replay is investigative.

## In progress

No partial feature work is authoritative at this checkpoint.

PACK-033 and PACK-034 are complete.

The next implementation should begin from PACK-035.

## Verification

### Current focused checkpoint

```bash
python services/simulation-engine/tools/generate_execution_golden.py --check
python -m unittest discover -s services/simulation-engine/tests -p 'test_execution.py' -v
python scripts/validate_execution_protocol.py
python database/tools/validate_migrations.py
python apps/api/tools/generate_route_manifest.py --check
tsc -p apps/api/tsconfig.core.json
node --test apps/api/tests/*.test.mjs
tsc -p apps/api/tsconfig.syntax.json
tsc -p apps/web/tsconfig.syntax.json
node --test apps/web/tests/*.test.mjs
python scripts/validate_execution_live_batch.py
python scripts/quality_gate.py
```

Latest verified focused results:

- Execution Golden v1: PASS.
- Execution tests: **5/5 PASS**.
- worker process-protocol smoke: PASS.
- database migration validation: **7 migrations PASS**.
- API route manifest: PASS.
- API core TypeScript: PASS.
- API tests: **24/24 PASS**.
- API source syntax: PASS.
- web source syntax: PASS.
- web tests: **12/12 PASS**.
- PACK-033/034 validator: PASS.
- quality gate: PASS.

Historical regression checks also re-run:

- deterministic simulation golden v3: PASS;
- Evaluation Golden v1: PASS;
- Projection Golden v1: PASS;
- Twinframe browser QA: **31/31 PASS**;
- shell browser QA: **25/25 PASS**.

The repeated `artifact_tool` spreadsheet warmup warnings printed by the Python host are external harness noise; each listed command itself returned exit code 0.

## GitHub reconciliation status

A prior GitHub commit labeled PACK-035/036 was inspected and found to be **metadata-only**: its manifest claimed implementation files that were not present in the repository. That commit remains preserved in Git history for auditability, but it is not an authoritative completed implementation milestone.

This PACK-034 checkpoint is the highest source-backed, test-verified implementation state and supersedes that metadata-only claim. See `state/REMOTE_RECONCILIATION.md`.

The complete verified PACK-034 source archive is stored on `main` in:

```text
.companyops-bootstrap/pack034-f0e90737/pack034.tar.xz.b64.part00
.companyops-bootstrap/pack034-f0e90737/pack034.tar.xz.b64.part01
```

Recovery:

```bash
cat .companyops-bootstrap/pack034-f0e90737/pack034.tar.xz.b64.part00 \
    .companyops-bootstrap/pack034-f0e90737/pack034.tar.xz.b64.part01 \
  | base64 --decode > /tmp/CompanyOps_PACK034.tar.xz

echo 'f54e61ed8788093e91ec40801b2180ce19f01c8debb802537643fe90898aa401  /tmp/CompanyOps_PACK034.tar.xz' | sha256sum -c -
mkdir -p /tmp/CompanyOps_PACK034
tar -xJf /tmp/CompanyOps_PACK034.tar.xz -C /tmp/CompanyOps_PACK034
```

GitHub Actions did not execute the attempted automatic materialization workflow in this repository, so do not claim the ordinary GitHub tree is a complete source checkout yet. The archive above plus the root state file are the durable remote recovery source.

## Blockers / environment-dependent work

### Genuine blockers

1. **Production durable execution queue not implemented.**
   - execution claim is persistent;
   - current worker launch is an in-process child process;
   - API server composition is already development/test-only;
   - do not enable production composition until crash recovery/requeue semantics exist.

2. **Live PostgreSQL integration unavailable in this sandbox.**
   - migration 007 and SQL adapters are statically tested;
   - no PostgreSQL binary/service is available here.

3. **npm registry unavailable in this sandbox.**
   - no fake `pnpm-lock.yaml` is created;
   - live installed-dependency Next/Fastify E2E remains pending a registry-capable environment.

4. **Production auth provider not selected.**
   - development principal headers are development/test only.

### Deliberate current limitations

- raw events for all 400 STANDARD runs are not persisted; representative pair raw events are retained and all runs remain reproducible.
- SSE implementation uses reconnecting snapshots rather than a long-held pub/sub stream.
- the flagship experiment definition is still intentionally narrow/fixed; general experiment authoring comes next.

## Next

### PACK-035 → PACK-036

**Experiment Setup + Preflight and Safety Membrane Execution Boundary**

Recommended implementation order:

1. formalize an experiment request/application model instead of only flagship defaults;
2. implement deterministic preflight state;
3. bind CompanyPackage/fidelity/scenario/assertion/SUT-adapter pins into execution request;
4. wire SecurityPreflight / capability manifest / SUT mode into execution admission;
5. reject unsafe or unsupported SUT modes before any simulation work;
6. make experiment setup inspectable in the UI/API without turning it into a broad generic workflow builder;
7. keep production connectors prohibited;
8. preserve the existing flagship as the canonical gold-standard preset.

### Fresh-agent startup

A fresh coding agent should:

1. inspect repository/filesystem;
2. read this file;
3. if normal source paths are sparse, reconstruct the verified PACK-034 source using the archive commands above;
4. read `state/CURRENT_STATE.json` from the reconstructed source;
5. inspect `packets/PACK-033-MANIFEST.json` and `PACK-034-MANIFEST.json`;
6. inspect ADR-0098 through ADR-0103;
7. run focused verification above;
8. continue PACK-035/036 only after verification.

## Permanent recovery rule

CompanyOps must remain recoverable from:

```text
GitHub repository / verified remote archive
+
CURRENT_STATE.md
+
latest complete CompanyOps_CURRENT.zip
```

After every major phase or roughly 1–2 substantial autonomous passes:

```text
inspect
→ test
→ fix
→ verify
→ update CURRENT_STATE.md
→ create complete ZIP
→ independently extract/verify ZIP
→ commit/push Git milestone when possible
→ continue
```

Never use chat history as the sole implementation source.
