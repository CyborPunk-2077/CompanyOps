# CompanyOps / CompanyLab — CURRENT STATE

> **Permanent identity:** **CompanyOps = CompanyLab.** Existing `companylab` package names, contract URLs, UI labels and architecture are intentional.
>
> **Authority model:** this conversation is the product/roadmap authority for what to build next and how to steer CompanyOps. The verified filesystem/repository is authoritative for implementation claims. GitHub is a durable checkpoint store, but an incomplete/stale remote must never override a verified complete source snapshot.

## Current project state

- Current cumulative implementation: **PACK-040**.
- Working version: **`0.0.40-workspace-bootstrap-launch`**.
- Status: **`BOOTSTRAP_AND_FLAGSHIP_LAUNCH_READY`**.
- Product: **Business CI — pre-production operational regression testing for business changes.**
- Current flagship: cost-first eligible procurement saves unit cost locally but, under a matched supplier-degradation world, causes service/inventory harm. Canonical STANDARD result remains **BusinessVerdict `FAIL` / ReleaseRecommendation `BLOCK`**.
- Active JSON-Schema contracts: **36**.
- Database migrations: **8**.
- Canonical GitHub repo: `CyborPunk-2077/CompanyOps`.
- **Remote warning:** `main` is still not a verified complete ordinary source checkout. Sandbox GitHub DNS is unavailable and large connector-transfer literals have failed integrity checks. Do not infer missing code from metadata. The latest complete verified `CompanyOps_CURRENT.zip` is the source recovery authority until full-tree materialization is verified.
- Latest complete ZIP checkpoint: **520 files**, SHA-256 **`89868b3abd588cb4e03fac86c5778554198f3e28fcd29c149abc72675a12c98e`**.
- Next coherent batch from the chat roadmap: **PACK-041 → PACK-042 — Company Model Intake + Fidelity/Provenance Report**.

## Architecture

```text
CompanyPackage / Company IR
→ immutable CompanyModel
→ deterministic runtime bootstrap
→ discrete-event scheduler + semantic HMAC RNG
→ typed BusinessEvents / pure reducer
→ exact RuntimeState + snapshot/replay
→ matched Baseline / Treatment worlds
→ demand / quote / order / inventory / fulfillment
→ replenishment
→ procurement decision boundary
      Baseline: internal balanced policy
      Treatment:
        minimized SutDecisionRequest
        → pure-intent SANDBOX_ADAPTER
        → frozen request/response/intent schemas
        → capability/reference/resource/business-policy checks
        → accepted ProcurementIntent only
→ supplier execution
→ deterministic KPI observations
→ paired statistics / assertions
→ independent BusinessVerdict + TechnicalGate + SecurityGate + FidelityGate
→ sealed backend projection
→ immutable persistence
→ workspace API
→ server-first Twinframe / experiment launch surface
```

Semantic truth boundary:

```text
DOMAIN → RUNTIME → EVALUATION → SECURITY → BACKEND PROJECTION → UI
```

The browser may perform navigation, transport and progress display. It must not calculate KPI truth, paired harm, confidence intervals, assertion status, BusinessVerdict, ReleaseRecommendation or gate semantics.

## Completed

### Foundation through PACK-038

- Business CI product wedge, full PRD and Company IR.
- immutable CompanyPackage + semantic CompanyModel validation/content SHA-256.
- immutable universal BusinessEvent model.
- deterministic integer-microsecond discrete-event runtime.
- HMAC counter-based semantic RNG; private Treatment draws cannot shift matched exogenous worlds.
- pure reducer, exact authoritative state hashing, resumable snapshots and replay equality.
- matched Baseline/Treatment worlds.
- demand → quote → order → inventory → fulfillment + stockout/backorder/cancellation.
- replenishment → procurement → supplier execution/lead-time/reliability/delivery-miss/receipt.
- original customer commitment preserved for service evaluation.
- Baseline `BALANCED_SCORE_V1`; Treatment `COST_FIRST_ELIGIBLE_V1`.
- real typed Simulation Safety Membrane: minimized request → frozen SUT request/response/intent validation → capability/reference/resource/business checks → typed intent → domain events.
- Baseline makes zero Treatment-SUT calls.
- malformed SUT output is contained as SecurityFinding before business-state mutation.
- invalid platform-generated SUT request is treated as platform-integrity breach.
- runtime SecurityFindings independently propagate to SecurityGate BLOCK/fail-closed behavior.
- STANDARD evaluation uses **200 matched pairs / 400 run observations**, 95% confidence, deterministic 2,000-resample paired bootstrap.
- positive harm means Treatment worse; only `COMPLETED_VALID` runs enter authoritative comparison.
- flagship service regressions FAIL/BLOCK while purchase unit cost is a material Treatment benefit.
- backend-owned ExperimentCockpit/Assertion/Chronology/Consequence/Replay projection.
- representative pair is investigative only; it never replaces aggregate evidence.
- premium Twinframe UI: **Quiet Instrumentation, Dramatic Divergence**.
- persistent experiment execution claims/progress and immutable evaluation/projection seal.
- immutable experiment setup + SecurityPreflight before matched worlds execute.
- deterministic/runtime/evaluation/projection/execution goldens are versioned historical evidence, never silently overwritten.

### Contract lineage

- Historical PACK-010 lock: `292da499b452a6c77677b80f68629929180fe9f577579a0bbb6e886ec8851c83`.
- Active contract lock: `3cc3f0bc776f43f835d12af0f06ddc74a303329f61154311e15f687cd84567ee`.
- CompanyPackage 1.0 preserved; 1.1 additive correction.
- BusinessEvent 1.0/1.1 preserved; 1.2 additive supplier delivery-miss fact.
- OpenAPI history remains versioned; JSON Schema remains runtime authority.

### PACK-039 — Development Workspace Bootstrap

- deterministic development bootstrap plan/hash;
- workspace `WS-ACME-DEMO` / `Acme Business CI Lab`;
- development principal `DEV-COMPANYOPS-OPERATOR`;
- immutable package `PKG-acme-industrial-f1-v1.1`;
- workspace/member/package bootstrap is idempotent but identity-conflict-intolerant;
- no silent workspace rename, role mutation or model overwrite;
- development/test-only bootstrap CLI;
- no credentials embedded/checkpointed.

This is deliberately not production tenant provisioning and not ERP ingestion.

### PACK-040 — Flagship Experiment Launch Surface

- premium `/launch` release-candidate instrument, not a generic wizard/dashboard;
- visual Baseline / change-under-test / Treatment comparison;
- immutable Safety Membrane setup and **8 preflight checks** visible before launch;
- STANDARD 200-pair plan displayed with scenario/assertion/capability/egress posture;
- server-side Next proxy keeps the development principal private;
- create/start requests use idempotency and pin expected setup hash;
- small client island handles transport/progress only;
- live progress polling redirects to sealed result;
- if live API is absent, launch is view-only and never fabricates an offline execution;
- result screen exposes compact **New run** navigation.

## Verification

Latest PACK-040 checkpoint:

- simulation tests: **84/84 PASS**;
- API tests: **33/33 PASS**;
- web tests: **17/17 PASS**;
- contract history: PASS;
- generated contract bindings current: PASS;
- database static validation: **8 migrations PASS**;
- execution/preflight/Safety-Membrane/Twinframe/bootstrap-launch validators: PASS;
- Twinframe browser QA: **42/42 PASS**;
- shell browser QA: **25/25 PASS**;
- launch browser QA: **34/34 PASS**;
- explicit tests + browser checks in the current checkpoint: **235 PASS**;
- quality gate: PASS;
- complete ZIP secret scan: PASS;
- ZIP CRC/integrity: PASS;
- clean ZIP extraction recovery verification: PASS.

Core verification commands:

```bash
python packages/contracts/tools/validate_history.py
python packages/contracts/tools/generate_bindings.py --check
python database/tools/validate_migrations.py
PYTHONPATH=services/simulation-engine/src python -m unittest discover -s services/simulation-engine/tests -v
tsc -p apps/api/tsconfig.core.json
node --test apps/api/tests/*.test.mjs
tsc -p apps/api/tsconfig.syntax.json
tsc -p apps/web/tsconfig.syntax.json
node --test apps/web/tests/*.test.mjs
python scripts/validate_safety_membrane_batch.py
python scripts/validate_bootstrap_launch_batch.py
python packages/testing/tools/visual_result_qa.py
python packages/testing/tools/visual_shell_qa.py
python packages/testing/tools/visual_launch_qa.py
python scripts/quality_gate.py
```

## Genuine blockers

1. npm registry networking unavailable in the current sandbox; no genuine `pnpm-lock.yaml`, and no fake lockfile is created.
2. PostgreSQL binaries/service unavailable here; SQL/repository semantics are statically validated but live bootstrap/DB integration needs a PostgreSQL-capable environment.
3. Production auth provider is not selected; development principal headers are development/test only.
4. Production durable execution queue is not implemented; process launch remains development/test-only until crash recovery/requeue semantics exist.
5. GitHub ordinary full-tree materialization remains incomplete because normal Git transport cannot resolve `github.com` from this sandbox and large connector transfer literals have integrity problems. Update text checkpoints normally, but do not claim remote source completeness until key source files are verified.

## Next — PACK-041 → PACK-042

### Company Model Intake + Fidelity/Provenance Report

Goal: move CompanyOps beyond the hardcoded Acme fixture while keeping the product narrow and honest.

Implementation order:

1. add server-side/API **CompanyPackage JSON file intake**;
2. validate against the correct CompanyPackage JSON Schema;
3. run existing CompanyModel semantic validation;
4. register accepted packages immutably/content-addressed;
5. produce deterministic **Fidelity & Provenance Report** with F0–F4, observed/configured/inferred/template/synthetic coverage, missing/weak inputs, confidence warnings, and explicit claims/limitations;
6. build a premium laboratory-style intake/review screen, not a generic upload form;
7. allow an accepted model to become the model selected by the existing flagship launch surface;
8. keep AI explanation secondary/non-authoritative.

Explicit non-goals: no automatic ERP/CRM connectors, no generic CSV mapper, no production ingestion pipeline, no LLM-generated CompanyPackage from arbitrary prose, and no broad experiment/scenario workflow builder.

Desired product flow:

```text
bring/validate a company model
→ understand fidelity/provenance honestly
→ inspect immutable experiment setup/preflight
→ launch matched Business CI run
→ inspect PASS/FAIL/TRADEOFF in Twinframe
```

## Fresh-agent startup

1. obtain the latest complete `CompanyOps_CURRENT.zip` or a verified complete Git checkout;
2. read this file and `state/CURRENT_STATE.json`;
3. inspect `packets/PACK-039-MANIFEST.json` and `PACK-040-MANIFEST.json` plus recent ADRs;
4. verify actual source before trusting historical metadata;
5. run the checkpoint commands above;
6. continue PACK-041/042 using the chat-defined roadmap;
7. checkpoint again before another major phase.

Permanent loop:

```text
chat-directed product goal
→ inspect actual source
→ implement
→ test/fix/verify
→ update CURRENT_STATE.md
→ complete CompanyOps_CURRENT.zip
→ independently verify ZIP
→ push GitHub checkpoint where transport permits
→ continue
```
