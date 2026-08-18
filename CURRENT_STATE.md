# CompanyOps / CompanyLab — CURRENT STATE

> **Permanent identity:** **CompanyOps = CompanyLab.** Existing `companylab` package names, contract URLs, UI labels, schemas and architecture are intentional.
>
> **Authority model:** this **conversation is the product/roadmap authority** for what CompanyOps should build next, sequencing, scope and steering. The verified filesystem/repository is authoritative for implementation claims. GitHub is the durable implementation/checkpoint store, but an incomplete remote must never override a complete verified snapshot.

## Current project state

- Current cumulative implementation: **PACK-042**.
- Working version: **`0.0.42-company-model-intake-fidelity`**.
- Status: **`COMPANY_MODEL_INTAKE_AND_FIDELITY_REPORT_READY`**.
- Product: **Business CI — pre-production operational regression testing for business changes.**
- Current vertical: industrial distributor / machinery & auto-parts operations.
- Canonical flagship: cost-first eligible procurement is locally cheaper but causes downstream service/inventory harm under a matched supplier-degradation world; STANDARD result remains **FAIL / BLOCK**.
- Active frozen JSON-Schema contracts: **36**; active lock remains `3cc3f0bc776f43f835d12af0f06ddc74a303329f61154311e15f687cd84567ee`.
- PostgreSQL migrations: **9**. Active OpenAPI: **1.3.0**.
- Canonical GitHub repo: `CyborPunk-2077/CompanyOps`.
- **Remote warning:** GitHub `main` is still not a verified complete ordinary source checkout. It is a checkpoint/history store until representative source paths are materialized and verified. The complete verified `CompanyOps_CURRENT.zip` is the recovery authority.
- Next chat-directed batch: **PACK-043 → PACK-044 — Observed Evidence Calibration + F2 Upgrade Path**.

## Architecture

```text
CompanyPackage / Company IR
→ immutable CompanyModel + semantic validation
→ deterministic Fidelity/Provenance Report
→ deterministic runtime bootstrap
→ discrete-event scheduler + semantic HMAC RNG
→ typed BusinessEvents / pure reducer / exact RuntimeState
→ matched Baseline / Treatment worlds
→ demand / quote / order / inventory / fulfillment
→ replenishment
→ procurement decision boundary
      Baseline: internal balanced policy
      Treatment:
        minimized SutDecisionRequest
        → pure-intent SANDBOX_ADAPTER
        → frozen request/response/intent validation
        → capability/reference/resource/business-policy checks
        → accepted ProcurementIntent only
→ supplier execution
→ deterministic KPI observations
→ paired statistics / assertions
→ independent BusinessVerdict + TechnicalGate + SecurityGate + FidelityGate
→ sealed backend projection
→ immutable persistence
→ workspace API
→ server-first Twinframe / Launch / Model Assurance surfaces
```

Semantic truth boundary: `DOMAIN → RUNTIME → EVALUATION → SECURITY → BACKEND_PROJECTION → UI`.

The browser may render/navigation-select authoritative data and transport requests/progress. It must not compute KPI truth, paired harm, confidence intervals, fidelity, assertion status, verdict, recommendation or gate semantics.

## Completed

### Foundation through PACK-038

- Business CI wedge, Company IR, immutable CompanyModel and universal BusinessEvent model.
- deterministic discrete-event simulation, semantic HMAC RNG, exact state hashing, snapshots and replay without re-calling SUT.
- matched Baseline/Treatment worlds.
- demand → quote → order → inventory → fulfillment; stockout/backorder/cancellation.
- replenishment → procurement → supplier execution/lead-time/reliability/delivery-miss/receipt.
- deterministic STANDARD evaluation: 200 matched pairs, 95% confidence, 2,000 paired bootstrap resamples.
- BusinessVerdict / ReleaseRecommendation plus independent Technical/Security/Fidelity gates.
- real typed Simulation Safety Membrane; Baseline performs zero Treatment-SUT calls; malformed SUT output is contained before business-state mutation.
- backend-owned cockpit/assertion/chronology/consequence/replay projection and premium Twinframe UI under **Quiet Instrumentation, Dramatic Divergence**.

### PACK-039 / PACK-040 — Bootstrap + Launch

- deterministic development workspace bootstrap for `WS-ACME-DEMO` and `DEV-COMPANYOPS-OPERATOR`.
- immutable Acme CompanyPackage registration, idempotent but identity-conflict-intolerant.
- premium `/launch` release-candidate instrument with immutable Baseline/Treatment/SUT/preflight setup.
- STANDARD 200-pair plan, Safety Membrane posture, server-side launch proxy, idempotent create/start, progress and sealed-result navigation.
- offline launch is view-only and never fabricates execution.

### PACK-041 — Company Model Intake + Fidelity/Provenance Runtime

- complete CompanyPackage 1.1 JSON intake via server/API.
- JSON-Schema + semantic CompanyModel validation remains authoritative.
- behavior parameters require resolvable `provenance_ref`; unverifiable assumptions fail semantic validation.
- deterministic `companylab.company-model-fidelity-report/0.1` covers F0–F4, decision scope, readiness, confidence, provenance composition, critical weak inputs and findings.
- report is content-hashed and persisted separately in append-only/RLS-protected `company_model_fidelity_reports`; immutable CompanyPackage rows are never rewritten.
- OpenAPI 1.3 adds intake + fidelity-report reads; historical 1.2 is archived; frozen JSON-Schema lock is unchanged.

Reference Acme report intentionally says:

```text
F1
DEMO_ONLY
LOW confidence
READY_WITH_WARNINGS
Observed evidence: 0%
Template/synthetic evidence: 50%
Behavior parameters: 9/10 weak
```

This is model truth, not a test failure: the demo is runnable but must not masquerade as calibrated real-company evidence.

### PACK-042 — Model Assurance Surface

- deterministic shared fidelity fixture generated from the actual CompanyModel report.
- server-first `/company-model` Model Assurance screen.
- hierarchy: identity → assurance verdict → provenance composition → critical inputs → findings → narrow intake control.
- narrow complete-CompanyPackage JSON intake control; client parses/transports only and does not score fidelity.
- live API when configured; explicit reference fixture only when live API is absent; live errors never silently fall back.
- premium laboratory-style assurance UI, not a generic dashboard or mapping studio.

## Verification

Final clean ZIP extraction verification:

```text
CompanyModel tests                16 / 16 PASS
API tests                         36 / 36 PASS
Web tests                         22 / 22 PASS
Model Assurance browser QA        32 / 32 PASS
Database migrations               9 PASS
OpenAPI route manifest            PASS
Contracts build                   PASS
CompanyModel build                PASS
API core/syntax                    PASS
Web syntax                         PASS
Fidelity fixture stale check       PASS
PACK-041/042 validator             PASS
Quality gate                       PASS
ZIP CRC/integrity                  PASS
Clean ZIP extraction recovery      PASS
```

Existing visual regressions remain green: Twinframe **42/42**, Launch **34/34**, Shell **25/25**.

Historical simulation/evaluation/projection goldens passed before the combined command hit the environment wall while entering the expensive active 200-pair Execution v3 regeneration. PACK-041/042 does not alter simulation/execution semantics, so that expensive active check was not restarted; Safety Membrane, preflight and cumulative semantic validators remain PASS.

Recovery build order from a clean ZIP:

```bash
tsc -p packages/contracts/tsconfig.json
tsc -p packages/company-model/tsconfig.json
node --test packages/company-model/tests/*.test.mjs
```

## Genuine blockers / environment-dependent work

1. npm registry networking unavailable; no fake `pnpm-lock.yaml` is created.
2. PostgreSQL service/binaries unavailable here; SQL/RLS/repository semantics are statically validated.
3. Production auth provider not selected; development principal headers are development/test only.
4. Production durable execution queue not implemented; process worker remains development/test-only until crash recovery/requeue exists.
5. GitHub ordinary source-tree materialization remains incomplete because normal Git transport cannot resolve `github.com` from this sandbox and connector bulk-transfer is constrained. Keep GitHub state/manifests updated, but do not claim full source completeness until representative source files are verified remotely.

## Next — PACK-043 → PACK-044

### Observed Evidence Calibration + F2 Upgrade Path

**Roadmap rationale from this chat:** CompanyOps can now tell a user *why* their model is weak. The next highest-value capability is helping a real business replace template assumptions with observed evidence and prove that the model became more trustworthy—without turning CompanyOps into a giant ERP connector/mapping platform.

Recommended order:

1. define a narrow immutable calibration input for observed demand history, supplier delivery/performance history and inventory snapshots;
2. validate source provenance, timestamps/date ranges, units and entity references;
3. derive calibrated behavior parameters deterministically without mutating the original package;
4. create a **new CompanyPackage/company-model version** with explicit transformation lineage;
5. preserve source evidence and derivation hashes so calibration is replayable/auditable;
6. demonstrate a controlled **F1 → F2** upgrade on the industrial-distributor model;
7. regenerate fidelity report and prove observed share / critical provenance improves;
8. add a focused calibration surface showing **what evidence will improve what assumptions** before applying it;
9. accept narrow typed CSV/JSON only; do not build a generic connector/mapping platform;
10. do not auto-claim F3/F4 without stronger calibration evidence.

Desired flow:

```text
bring company model
→ see why it is weak
→ add observed evidence
→ produce new immutable calibrated model version
→ verify fidelity/provenance improvement
→ preflight + run Business CI
→ inspect verdict in Twinframe
```

## Fresh-agent startup

1. obtain latest complete `CompanyOps_CURRENT.zip` or a verified complete Git checkout;
2. read this file and `state/CURRENT_STATE.json`;
3. inspect `packets/PACK-041-MANIFEST.json`, `PACK-042-MANIFEST.json`, ADR-0120→0123 and `docs/PACK041_042_ENGINEERING_NOTES.md`;
4. inspect actual source before trusting old Git metadata;
5. run the focused verification/build order above;
6. continue PACK-043/044 according to this chat-defined roadmap;
7. checkpoint before another major phase.

Permanent loop:

```text
chat context chooses product direction
→ inspect actual source
→ implement coherent batch
→ test/fix/verify
→ update CURRENT_STATE.md
→ create complete CompanyOps_CURRENT.zip
→ independently extract/verify ZIP
→ update/push GitHub checkpoint where transport permits
→ continue according to chat roadmap
```
