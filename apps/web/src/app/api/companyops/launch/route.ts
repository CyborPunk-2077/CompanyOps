import { companylabApi, requireLiveApiConfig } from "../../../../lib/live-api-server";
import { flagshipSetupFixture } from "../../../../lib/flagship-setup.generated";

const DEFAULT_EXPERIMENT_ID="EXP-FLAGSHIP-STANDARD";

type ExperimentRecord={
  experimentId?:string; experiment_id?:string; status:string; setupSha256?:string;
  latestExecution?:{status:string;progressRunId:string;executionId:string;plannedPairs:number;errorCode?:string};
};

function parseLastProgress(sse:string):Record<string,unknown>|null{
  const data=[...sse.matchAll(/^data:\s*(.+)$/gm)].map(match=>match[1]);
  if(!data.length)return null;
  try{return JSON.parse(data[data.length-1]!) as Record<string,unknown>;}catch{return null;}
}

export async function POST(request:Request){
  const config=requireLiveApiConfig();
  const body=await request.json().catch(()=>({})) as Record<string,unknown>;
  const experimentId=typeof body.experiment_id==='string'&&body.experiment_id?body.experiment_id:DEFAULT_EXPERIMENT_ID;
  const title=typeof body.title==='string'&&body.title?body.title:'Cost-first Procurement under Supplier Degradation';
  const created=await companylabApi<Record<string,unknown>>(config,{
    method:'POST',path:'/experiments',
    idempotencyKey:`launch-create-${experimentId}`,
    body:{
      experiment_id:experimentId,
      company_package_id:flagshipSetupFixture.setup.company_package_id,
      title,
      treatment_sut_mode:'SANDBOX_ADAPTER',production_connector:false,network_egress:'DENY',
    },
  });
  const setupSha=String(created['setup_sha256']??flagshipSetupFixture.setup_sha256);
  const started=await companylabApi<Record<string,unknown>>(config,{
    method:'POST',path:`/experiments/${encodeURIComponent(experimentId)}/runs`,
    idempotencyKey:`launch-standard-${experimentId}`,
    body:{planned_pairs:200,expected_setup_sha256:setupSha},
  });
  return Response.json({experiment_id:experimentId,created,started});
}

export async function GET(request:Request){
  const config=requireLiveApiConfig();
  const url=new URL(request.url);
  const experimentId=url.searchParams.get('experiment_id')??DEFAULT_EXPERIMENT_ID;
  const record=await companylabApi<ExperimentRecord>(config,{path:`/experiments/${encodeURIComponent(experimentId)}`});
  let progress:Record<string,unknown>|null=null;
  const runId=record.latestExecution?.progressRunId;
  if(runId){
    const sse=await companylabApi<string>(config,{path:`/runs/${encodeURIComponent(runId)}/progress`,accept:'text/event-stream'});
    progress=parseLastProgress(sse);
  }
  return Response.json({experiment_id:experimentId,status:record.status,execution:record.latestExecution??null,progress,result_href:record.status==='SEALED'?`/?experiment=${encodeURIComponent(experimentId)}`:null});
}
