# CompanyOps / CompanyLab — CURRENT STATE

> **Permanent identity mapping:** **CompanyOps = CompanyLab.** Existing internal names (`companylab`, CompanyLab UI, contract IDs, package names) are intentional and must not be renamed merely because the umbrella project is called CompanyOps.
>
> **Authority rule:** inspect the repository/filesystem first. Chat history contains intent and rationale, but implementation claims must be verified against files and tests.

## Current project state

### Current milestone / phase

- Current cumulative implementation: **PACK-032**.
- Working version: **`0.0.32-twinframe-flagship-result`**.
- Status: **`TWINFRAME_FLAGSHIP_RESULT_READY`**.
- Product thesis: **Business CI — pre-production operational regression testing for business changes.**
- Current vertical: industrial distributor / machinery & auto-parts operations.
- Current flagship result: a cost-first procurement treatment is locally cheaper but causes service harm under a matched supplier-degradation scenario. Authoritative evaluation returns **BusinessVerdict `FAIL` / ReleaseRecommendation `BLOCK`**.
- Canonical GitHub repository: **`CyborPunk-2077/CompanyOps`**.
- Next recommended coherent batch: **PACK-033 → PACK-034 — Experiment Execution Orchestration + Live Projection Transport**.

### Canonical project root

The directory containing this file is the canonical project root.

```text
apps/api/                       Fastify-oriented workspace API + sealed result read handlers
apps/web/                       Next.js App Router server-first product/result UI
packages/company-model/         immutable CompanyPackage semantic runtime
packages/config/                typed environment/configuration
packages/contracts/             authoritative JSON Schema/OpenAPI/RBAC + generated TS/Python bindings
packages/testing/               deterministic browser fixtures + visual QA
packages/ui/                    design system, Twinframe/result components, gold-standard UX specs
services/simulation-engine/     deterministic simulation, replay, business loop, evaluation, projection
database/                       PostgreSQL migrations/tools
specs/                          product/architecture specifications
state/                          ADRs, continuity state, coverage matrices
packets/                        PACK manifests
.github/workflows/              CI gates
CURRENT_STATE.md                durable agent handoff
```

### Actual architecture

```text
CompanyPackage / Company IR
→ immutable CompanyModel
→ deterministic runtime bootstrap
→ discrete-event scheduler + semantic HMAC RNG
→ typed BusinessEvents
→ pure reducer / exact RuntimeState
→ snapshot + replay equality
→ matched Baseline / Treatment worlds
→ demand / quote / sales order / inventory / fulfillment
→ replenishment / procurement / supplier execution
→ deterministic KPI observations
→ matched-pair harm + deterministic bootstrap confidence intervals
→ assertions
→ BusinessVerdict + ReleaseRecommendation
→ backend-owned semantic projection
→ immutable sealed projection read models
→ workspace-scoped API
→ server-first Twinframe result experience
```

Semantic truth boundary:

```text
DOMAIN → RUNTIME → EVALUATION → SECURITY → BACKEND PROJECTION → UI
```

The web/UI layer may format and arrange authoritative values. It must **not** calculate KPI truth, paired harm, confidence intervals, assertion outcomes, BusinessVerdict, ReleaseRecommendation, or gate semantics.

### Technologies currently in use

- TypeScript for contracts/config/company-model/API/web/UI.
- Python 3.12+ for deterministic simulation, evaluation and projection.
- JSON Schema 2020-12 authoritative contracts.
- OpenAPI 3.1 API contract.
- Next.js App Router + React product shell/result experience.
- Fastify 5 API direction.
- PostgreSQL with workspace authorization + FORCE RLS.
- Pydantic v2 ergonomic bindings plus JSON-Schema runtime validation.
- pnpm workspace + Turborepo direction.
- Playwright/Chromium deterministic static browser QA.
- SHA-256 content/state/checkpoint/projection identities.

## Completed

### Product and architecture

- Business CI product boundary and Company IR.
- SUT-neutral typed decision surface.
- Simulation Safety Membrane / capability / policy / egress architecture.
- matched Baseline/Treatment world semantics.
- deterministic discrete-event runtime and replay.
- BusinessVerdict: PASS / FAIL / TRADEOFF / INCONCLUSIVE.
- ReleaseRecommendation: ALLOW / BLOCK / HUMAN_REVIEW.
- independent TechnicalGate / SecurityGate / FidelityGate.
- visual thesis: **Quiet Instrumentation, Dramatic Divergence**.
- Twinframe lens architecture.

### Contracts

- Historical PACK-010 lock remains immutable:
  `292da499b452a6c77677b80f68629929180fe9f577579a0bbb6e886ec8851c83`
- Active contract count: **36**.
- Active lock SHA-256:
  `3cc3f0bc776f43f835d12af0f06ddc74a303329f61154311e15f687cd84567ee`
- CompanyPackage 1.0 preserved; 1.1 additive correction.
- BusinessEvent 1.0/1.1 preserved; 1.2 additive supplier delivery-miss evidence.
- PACK-031/032 required **no contract change**.
- Frozen view contracts remain authoritative:
  - ExperimentCockpitView
  - AssertionView
  - TwinframeChronologyView
  - ConsequenceSpineView
  - ReplayView

### Database/API foundation

- 6 PostgreSQL migrations.
- workspace authorization + FORCE RLS.
- append-only BusinessEvent and AuditRecord persistence.
- immutable CompanyPackage registration.
- persistent idempotency records.
- HMAC opaque pagination cursors.
- OpenAPI-derived route manifest and RBAC policy coverage.
- immutable `experiment_view_projections` persistence with SHA-256.
- API reads for cockpit, chronology, consequence spine and replay.
- API read path does not recalculate evaluation truth.

### Company model and deterministic simulation

- `@companylab/company-model` immutable runtime.
- Acme industrial distributor CompanyPackage 1.1 reference fixture.
- integer-microsecond UTC simulation time.
- `HMAC_SHA256_U64_V1` semantic RNG.
- stable semantic-pair IDs and deterministic object IDs.
- centralized scheduler priorities.
- atomic BusinessEvent append batches.
- exact authoritative runtime-state hashing (binary floats prohibited in state hash).
- snapshots, resume checkpoint hash and replay equality.
- deterministic goldens v1/v2/v3 preserved.

Executable business loop:

```text
matched demand
→ quote
→ sales order
→ reservation/allocation
→ shipment or stockout/backorder/cancellation
→ replenishment need
→ procurement decision
→ supplier execution
→ delivery miss/receipt
→ inventory recovery
→ downstream customer outcome
```

Flagship policy semantics:

- Baseline: `BALANCED_SCORE_V1`, selects Supplier A.
- Treatment: `COST_FIRST_ELIGIBLE_V1`, selects cheapest **eligible** Supplier B.
- Supplier C remains hard-ineligible under configured vendor policy.
- supplier-degradation scenario changes realized world behavior, not vendor authorization.

### Evaluation

- evaluation version: `companylab.evaluation/0.1.0`.
- separate evaluation RNG: `EVAL_HMAC_SHA256_U64_V1`.
- STANDARD plan: **200 matched pairs**, 95% confidence, 2,000 deterministic bootstrap resamples.
- only `COMPLETED_VALID` runs enter authoritative comparison.
- positive harm always means Treatment is worse.
- insufficient evidence yields INCONCLUSIVE conservatively.
- flagship result:
  - OTIF: BLOCK FAIL.
  - stockout demand impact: BLOCK FAIL.
  - committed purchase cost: material BENEFIT.
  - BusinessVerdict: FAIL.
  - ReleaseRecommendation: BLOCK.
  - FidelityGate: WARNING at F1.
- Evaluation Golden v1 SHA-256:
  `8163aaadc8532ec3e97e22431e46512c2fd1bec6c82338a544114ee87422e7c9`

### Backend projection — PACK-029/030

- projection version: `companylab.projection/0.1.0`.
- ExperimentCockpitView/AssertionView projection.
- Twinframe chronology projection.
- ConsequenceSpine projection.
- representative ReplayView projection.
- representative pair is explicitly investigative; matched-pair aggregate remains authoritative.
- no fake joint effect share.
- no invented KPI time series.
- immutable sealed PostgreSQL read-model projection.
- Projection Golden v1 file SHA-256:
  `d3b77c3593017dc1c3d91c6403da46772a3032b81b404810cb86498739bb0e8b`
- sealed projection content SHA-256:
  `8d9fd9b4d1167c6bee795cbde35560814ba5dea3374ee22be236bb80498a2271`

### Twinframe flagship result — PACK-031/032

The placeholder PACK-016 instrument surface has been replaced by the first real Business CI result experience.

Implemented:

- deterministic generated web projection fixture from Projection Golden v1:
  `apps/web/src/lib/flagship-projection.generated.ts`.
- result context in URL query state (`lens`, `assertion`, `joint`, `pair`, `cursor`).
- server-first result composition; no new client island was required.
- `AssertionRail` driven only by AssertionView.
- real Baseline/Treatment `TwinframeChronology`.
- DivergenceChannel shows authoritative paired harm / CI / tolerance.
- scenario and deterministic event chronology marks.
- explicit labels stating endpoint evidence is aggregate and no synthetic trajectory exists.
- `ConsequenceSpine` with selected evidence inspector.
- aggregate frequency is separate from representative causal joints.
- `ReplayPanel` for representative matched pair; aggregate verdict remains pinned.
- Distribution lens honestly degrades to authoritative aggregate estimate/CI/tolerance because raw pair samples are not in v1 projection.
- Entity lens displays only entity references present in deterministic consequence evidence; it does not pretend a full Entity projection exists.
- 1440/1280 desktop result cockpit.
- 1024 structural assertion-rail/evidence transition.
- <768 result-reader composition.
- dark/light themes preserved.

Important PACK-031/032 ADRs:

- ADR-0094: web consumes sealed backend projection.
- ADR-0095: URL result state / server-first composition.
- ADR-0096: no invented longitudinal KPI trajectories.
- ADR-0097: responsive structural transitions.

### Decisions that must not be casually reversed

- filesystem/repository is authoritative, not chat memory.
- JSON Schema/OpenAPI are semantic contract sources; generated bindings are projections.
- frozen historical contracts are never silently mutated.
- runtime state changes through accepted BusinessEvents + pure reducer.
- replay never re-calls the SUT.
- semantic RNG must not depend on mutable PRNG consumption.
- Baseline/Treatment visual identity is separate from verdict semantics.
- representative evidence never replaces aggregate evaluation evidence.
- UI must not calculate Business CI semantic truth.
- do not fabricate longitudinal metric curves when only endpoint evidence exists.
- sealed result projections are immutable read models.
- avoid generic SaaS dashboard/card-grid/chat-panel UI.

## In progress

No partial feature implementation is authoritative at this checkpoint.

PACK-031 and PACK-032 are complete pending the durable checkpoint/push procedure for this pass.

## Verification

### Focused PACK-031/032 gate

```bash
python apps/web/tools/generate_flagship_projection.py --check
python packages/testing/tools/generate_flagship_result_fixture.py --check
tsc -p packages/ui/tsconfig.syntax.json
tsc -p apps/web/tsconfig.syntax.json
node --test packages/ui/tests/*.test.mjs apps/web/tests/*.test.mjs packages/testing/tests/*.test.mjs
python packages/testing/tools/visual_result_qa.py
python scripts/validate_twinframe_result_batch.py
python scripts/quality_gate.py
```

Expected focused results:

- UI/web/testing source tests: **22/22 PASS**.
- flagship result browser QA: **31/31 PASS**.
- UI syntax: PASS.
- web syntax: PASS.
- generated web projection: current.
- flagship browser fixture: current.
- PACK-031/032 validator: PASS.
- quality gate: PASS.

### Cumulative high-value gates

```bash
node scripts/verify_toolchain.mjs
python scripts/validate_snapshot.py
python packages/contracts/tools/validate_history.py
python packages/contracts/tools/generate_bindings.py --check
node --test packages/contracts/tests/catalog.test.mjs
python -m unittest discover -s packages/contracts/python_tests -v

python database/tools/validate_migrations.py
python apps/api/tools/generate_route_manifest.py --check
tsc -p apps/api/tsconfig.core.json
node --test apps/api/tests/*.test.mjs
tsc -p apps/api/tsconfig.syntax.json
python scripts/validate_api_db_batch.py

python packages/ui/tools/generate_css_tokens.py --check
python packages/testing/tools/generate_shell_fixture.py --check
python packages/testing/tools/visual_shell_qa.py
python packages/testing/tools/visual_result_qa.py

python services/simulation-engine/tools/generate_golden.py --check
python services/simulation-engine/tools/generate_evaluation_golden.py --check
python services/simulation-engine/tools/generate_projection_golden.py --check
python -m unittest discover -s services/simulation-engine/tests -v
python scripts/validate_simulation_batch.py
python scripts/validate_evaluation_batch.py
python scripts/validate_projection_api_batch.py
python scripts/validate_twinframe_result_batch.py

python scripts/quality_gate.py
```

### Environment-dependent status

- npm registry access is unavailable in this execution environment; no genuine `pnpm-lock.yaml` has been fabricated.
- full dependency-backed Next.js build/E2E remains pending a registry-capable environment.
- PostgreSQL server/binaries are unavailable here; live migration/integration remains pending.
- deterministic/static/source/browser-fixture gates are expected to pass without those external dependencies.

## Blockers

Genuine current blockers:

1. registry access for dependency installation and real Next build.
2. live PostgreSQL runtime for migration/live persistence smoke.
3. production authentication provider intentionally not selected/wired.
4. end-to-end experiment execution orchestration has not yet been connected to persistence/API/web transport.

There is no known deterministic simulation/evaluation/projection/Twinframe correctness blocker at this checkpoint.

## Next

### PACK-033 → PACK-034 — Experiment Execution Orchestration + Live Projection Transport

Recommended order:

1. define the application-service boundary that owns an experiment execution lifecycle;
2. load a registered CompanyPackage + scenario + SUT configuration from persistence;
3. invoke matched deterministic simulation/evaluation without bypassing Safety Membrane boundaries;
4. seal ExperimentEvaluation and the backend projection atomically/idempotently;
5. connect progress states to persisted RunProgressEvent/SSE semantics;
6. add a real server result source in `apps/web` that fetches cockpit/evidence/replay from the API when configured;
7. retain generated Projection Golden only as deterministic demo/offline fallback;
8. add integration tests using in-memory adapters when PostgreSQL is unavailable, plus live-DB tests gated for registry/Postgres-capable CI;
9. do not expand simulation features unless orchestration exposes a genuine missing semantic primitive;
10. checkpoint GitHub + complete ZIP again before starting another large feature phase.

## Fresh-agent startup procedure

A fresh coding agent should:

1. inspect GitHub repository `CyborPunk-2077/CompanyOps` and its latest checkpoint;
2. read this `CURRENT_STATE.md` completely;
3. read `state/CURRENT_STATE.json`;
4. inspect `packets/PACK-031-MANIFEST.json` and `PACK-032-MANIFEST.json`;
5. run the focused PACK-031/032 verification commands;
6. inspect actual filesystem before trusting historical conversation summaries;
7. continue only from verified files;
8. update this file and create a complete checkpoint after the next substantial phase.

## Permanent recovery loop

```text
inspect
→ implement
→ test
→ fix
→ verify
→ update CURRENT_STATE.md
→ create COMPLETE CompanyOps_CURRENT.zip
→ independently verify archive
→ commit/push stable GitHub checkpoint
→ verify remote
→ continue
```

The project must never depend on one chat or `/mnt/data` session for continuity.

## GitHub checkpoint

- Repository: `CyborPunk-2077/CompanyOps`.
- **Verified remote state in this sandbox:** bootstrap commit only (`2a215fd498f66181b12b7f661b478731d91379d9`).
- Do **not** treat GitHub as the complete source tree yet. The complete authoritative checkpoint for PACK-032 is `CompanyOps_CURRENT.zip`; verify its externally supplied SHA-256 before use.
- A reconstructed full Git history through PACK-032 also exists as `CompanyOps_PACK032_FULL_HISTORY.bundle`; verify its externally supplied SHA-256 before use.
- Current environment limitation: the GitHub connector can write Git objects/text but cannot directly stream mounted binary ZIP/bundle files, while the shell cannot resolve `github.com`; a normal authenticated `git push --all && git push --tags` is therefore blocked here.
- On the first normal Git-capable environment, import the bundle or complete source ZIP, push `main` and all tags, then change this section/state to `REMOTE_VERIFIED`.
