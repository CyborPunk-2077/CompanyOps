# CompanyOps / CompanyLab — CURRENT STATE

> **Permanent identity:** CompanyOps = CompanyLab. Existing internal `companylab` names are intentional.
>
> **Operating rule:** the active CompanyOps chat is the strategic/product steering brain; the repository/filesystem proves what is actually implemented. GitHub is the durable checkpoint layer, not the product-roadmap authority.

## Current implementation

- Current cumulative milestone: **PACK-036**.
- Working version: `0.0.36-live-flagship-operator`.
- Status: `LIVE_FLAGSHIP_OPERATOR_FOUNDATION_READY`.
- Product: **Business CI — pre-production operational regression testing for business changes.**
- Current vertical: industrial distributor / machinery & auto-parts operations.
- Flagship result: Treatment saves purchase cost but causes supplier/service harm; authoritative BusinessVerdict = **FAIL**, ReleaseRecommendation = **BLOCK**.
- Current active contract count: **37**.
- Current active contract-lock SHA-256: `2639b0aeb894652ad723cec26eb0a95d3fb3a405fe8bd817da79eaf50f3b54d4`.
- Historical PACK-010 lock remains immutable: `292da499b452a6c77677b80f68629929180fe9f577579a0bbb6e886ec8851c83`.
- OpenAPI: **v1.2.0**.
- PostgreSQL migrations: **7**.

## Architecture

```text
CompanyPackage / Company IR
→ immutable CompanyModel
→ canonical Experiment
→ execution coordinator
→ versioned Python worker protocol
→ matched Baseline/Treatment simulation
→ BusinessEvents + pure reducer / replay
→ KPI observations
→ matched-pair evaluation
→ BusinessVerdict + ReleaseRecommendation
→ backend-owned sealed projection
→ PostgreSQL read models
→ workspace API
→ server-first Twinframe result experience
```

Truth layers remain:
`DOMAIN → RUNTIME → EVALUATION → SECURITY → BACKEND_PROJECTION → UI`.
The UI must never recalculate KPI truth, confidence intervals, assertion status, BusinessVerdict or release recommendation.

## Completed through PACK-034

All prior CompanyOps/CompanyLab work remains preserved: Business CI product boundary, Company IR, BusinessEvent model, deterministic scheduler/RNG/reducer/replay, Safety Membrane/SUT boundary, premium Twinframe UX, PostgreSQL/API foundation, company-model runtime, demand/order/fulfillment, replenishment/procurement/supplier execution, deterministic KPI/evaluation, backend projection/read APIs, and Twinframe flagship result.

PACK-033/034 added:
- `companylab.execution/0.1.0` worker protocol;
- 200-pair STANDARD execution / 400 child-run summaries;
- `ExperimentExecutionProgress 1.0` contract;
- durable execution/progress tables;
- bounded Python child-process gateway (`shell=false`);
- atomic run/evaluation/projection sealing;
- experiment-level SSE progress;
- **SEALED is emitted only after durable persistence**;
- replaceable `ExecutionLauncher` port; current in-process launcher is intentionally not crash-durable distributed orchestration.

## PACK-035 — Canonical flagship experiment bootstrap

Implemented:
- `apps/api/src/ports/experiments.ts`;
- canonical flagship profile in `core/flagship-experiment.ts`;
- PostgreSQL experiment repository;
- `createExperiment` / `getExperiment` handlers;
- deterministic flagship experiment identity;
- registered CompanyPackage requirement;
- F1 fidelity requirement for the current vertical slice;
- pinned Safety Membrane security-policy identity;
- OpenAPI create request body;
- assertion-aware chronology reads.

Canonical profile:
- experiment: `PROCUREMENT_SUPPLIER_DEGRADATION_V1`;
- baseline: `BALANCED_SCORE_V1` / `INTERNAL_BASELINE`;
- treatment: `COST_FIRST_ELIGIBLE_V1` / `PURE_INTENT`;
- scenario: `SUPPLIER_B_DEGRADATION_V1`;
- assertion suite: `FLAGSHIP_STANDARD_V1`;
- STANDARD = 200 matched pairs, 95% confidence, 2,000 deterministic bootstrap resamples.

A correctness fix made persisted child `run_id`s experiment-scoped so multiple experiments in one workspace cannot collide. Historical default/reference run IDs remain unchanged. Execution Golden v1 is preserved and current Execution Golden v2 pins the new persisted-ID semantics.

## PACK-036 — Live flagship operator result source

Implemented:
- server-only CompanyOps API result source;
- server actions to create the canonical experiment and start execution;
- same-origin Next.js SSE proxy;
- narrow `ExecutionProgress` client island;
- live cockpit/chronology/evidence/replay reads from persisted backend projections;
- deterministic offline fixture retained only as an explicit fallback;
- experiment/execution context preserved through result navigation;
- READY/RUNNING states use a pending surface and **never display a provisional FAIL/BLOCK verdict**;
- terminal worker failure emits persisted FAILED progress so SSE does not hang;
- structural operator-control shell row instead of ad-hoc height patches.

Result-source states:
- `LIVE_API` — sealed persisted result;
- `LIVE_PENDING` — real READY/RUNNING/FAILED experiment without a final verdict;
- `OFFLINE_FIXTURE` — explicit deterministic QA/demo fallback only.

## Verification

Current explicit checks: **240 / 240 PASS**.

- Contracts Node 7/7
- Contracts Python 5/5
- Config 9/9
- API 33/33
- CompanyModel 13/13
- Simulation/Evaluation/Projection/Execution 77/77
- UI 9/9
- Testing foundation 3/3
- Web 15/15
- Browser shell QA 25/25
- Browser flagship/operator QA 44/44

Also passing: Snapshot Zero continuity, historical PACK-010 lock, generated-bindings stale check, 7 migration static gate, OpenAPI route-manifest gate, API TypeScript core/full syntax, all deterministic/evaluation/projection/execution goldens, historical batch validators, live-operator validator, UI/fixture stale checks and quality gate.

Environment blockers are unchanged: npm registry unavailable in this sandbox (no fabricated pnpm lock); live PostgreSQL service unavailable; production auth intentionally unselected; in-process execution launcher not crash-durable.

## Recovery artifacts for this checkpoint

The complete verified PACK-036 project is `CompanyOps_CURRENT.zip`.
Filesystem-verified SHA-256 in the producing sandbox: `27cc8f980101f81c8ea3a3f5abbe8be59afb2dd2e5fe3746e138fb594f0c371c`.

The reconstructed full Git history through PACK-036 is `CompanyOps_PACK036_FULL_HISTORY.bundle`.
Filesystem-verified SHA-256: `2bbdb2ad7bdef8508dad6dc6ecc7b4997b2ab5a7604c26843a941ba04c4b3103`.

**Important remote limitation:** this GitHub repository currently carries checkpoint metadata but the full historical/source tree has not yet been independently materialized and verified through the connector. Do not claim otherwise. In a fresh session, use the complete ZIP/bundle if the GitHub tree is still sparse.

## Next — chat-steered recommendation

Recommended coherent next build: **PACK-037 → PACK-038 — Reference Workspace Bootstrap + End-to-End Live Integration Harness**.

Goal: make a fresh normal environment able to bootstrap Acme workspace/company/experiment and prove the complete live path against PostgreSQL.

Recommended order:
1. deterministic dev/reference workspace + operator membership bootstrap;
2. register canonical Acme CompanyPackage through the real repository/application boundary;
3. create flagship experiment through the real API;
4. run a QUICK integration profile for dev smoke while preserving STANDARD 200-pair release semantics;
5. persist progress/runs/evaluation/projection;
6. fetch sealed cockpit/chronology/evidence/replay through the real API;
7. verify same-origin SSE + server result source;
8. retain deterministic fixture/browser QA;
9. provide one bounded end-to-end integration command for future agents/Claude Code;
10. still no generic scenario designer, broad workflow platform, production SUT connector or unnecessary queue/Redis.

A fresh agent must inspect actual files/ZIP first, then use the active CompanyOps conversation for current strategic direction.
