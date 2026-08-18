import { LabBar } from "@companylab/ui";
import { ThemeControl } from "../../components/theme-control";
import { ExperimentLaunchControl } from "../../components/experiment-launch-control";
import { flagshipSetupFixture } from "../../lib/flagship-setup.generated";
import { liveApiConfigured } from "../../lib/live-api-server";

export default function LaunchPage(){
  const fixture=flagshipSetupFixture;
  const setup=fixture.setup;
  const checks=fixture.security_preflight.checks;
  const liveEnabled=liveApiConfigured();
  return <div className="cl-launch-shell" data-ui="experiment-launch-page">
    <LabBar workspaceName="Flagship Lab" companyName="Acme Industrial Distribution" experimentId="New Business CI run" stateLabel="PREFLIGHT" actions={<><a className="cl-compact-chip" href="/">Latest result</a><ThemeControl/></>} />
    <main className="cl-launch-main" id="experiment-surface">
      <header className="cl-launch-hero">
        <div>
          <span className="cl-eyebrow">Release candidate / operational change</span>
          <h1>Cost-first procurement under supplier degradation</h1>
          <p>War-game one typed procurement change against the same company and the same exogenous world before it is allowed near production.</p>
        </div>
        <div className="cl-launch-preset"><span>Preset</span><strong>{setup.preset_id}</strong><small>{setup.fidelity} · STANDARD · 200 matched pairs</small></div>
      </header>

      <section className="cl-launch-twin" aria-label="Baseline and treatment setup">
        <article data-variant="baseline"><div className="cl-launch-lane-label"><span>B</span><strong>Baseline</strong></div><h2>Balanced procurement</h2><p>{setup.baseline.strategy}</p><dl><div><dt>SUT mode</dt><dd>{setup.baseline.mode}</dd></div><div><dt>Decision boundary</dt><dd>Internal control</dd></div></dl></article>
        <div className="cl-launch-divergence"><span>change under test</span><strong>supplier choice objective</strong><small>all other matched-world semantics stay fixed</small></div>
        <article data-variant="treatment"><div className="cl-launch-lane-label"><span>T</span><strong>Treatment</strong></div><h2>Cost-first eligible</h2><p>{setup.treatment.strategy}</p><dl><div><dt>SUT mode</dt><dd>{setup.treatment.mode}</dd></div><div><dt>Authority</dt><dd>{setup.capability_manifest.capabilities[0]?.action}</dd></div></dl></article>
      </section>

      <section className="cl-launch-instrument-grid">
        <div className="cl-launch-preflight">
          <div className="cl-launch-section-head"><div><span className="cl-eyebrow">Safety membrane</span><strong>Execution admission</strong></div><span className="cl-preflight-pass">{fixture.security_preflight.status}</span></div>
          <div className="cl-preflight-list">{checks.map(item=><div key={item.check_id}><span>✓</span><div><strong>{item.check_id.replaceAll('_',' ')}</strong><small>{item.message}</small></div></div>)}</div>
        </div>
        <div className="cl-launch-runplan">
          <div className="cl-launch-section-head"><div><span className="cl-eyebrow">Run plan</span><strong>STANDARD evidence</strong></div><span>200 × 2</span></div>
          <dl>
            <div><dt>Scenario</dt><dd>{setup.scenario_suite.required[0]}</dd></div>
            <div><dt>BLOCK assertions</dt><dd>{setup.assertion_suite.block.length}</dd></div>
            <div><dt>REVIEW assertions</dt><dd>{setup.assertion_suite.review.length}</dd></div>
            <div><dt>Capability grants</dt><dd>{setup.capability_manifest.capabilities.length}</dd></div>
            <div><dt>Network egress</dt><dd>{setup.treatment.network_egress}</dd></div>
            <div><dt>Production connector</dt><dd>{setup.treatment.production_connector?'ENABLED':'PROHIBITED'}</dd></div>
          </dl>
          <div className="cl-launch-hash"><span>Immutable setup</span><code>{fixture.setup_sha256.slice(0,16)}…</code></div>
        </div>
      </section>
      <ExperimentLaunchControl liveEnabled={liveEnabled}/>
      {!liveEnabled&&<p className="cl-launch-offline-note">Offline fixture mode is view-only. Configure the live API/workspace/development principal and run the development bootstrap before launching.</p>}
    </main>
  </div>;
}
