"use client";

import { useEffect, useRef, useState } from "react";

type LaunchState="IDLE"|"STARTING"|"RUNNING"|"SEALED"|"FAILED";

type StatusPayload={
  experiment_id:string; status:string; result_href:string|null;
  progress?:{phase?:string;message?:string;valid_pairs?:number;planned_pairs?:number}|null;
  execution?:{status?:string;plannedPairs?:number;errorCode?:string}|null;
};

export function ExperimentLaunchControl({liveEnabled}:{liveEnabled:boolean}){
  const [state,setState]=useState<LaunchState>('IDLE');
  const [phase,setPhase]=useState('READY');
  const [message,setMessage]=useState(liveEnabled?'Preflight passed · ready to execute':'Live API is not configured');
  const [pairs,setPairs]=useState(0);
  const experimentId=useRef('');

  async function poll(){
    const response=await fetch(`/api/companyops/launch?experiment_id=${encodeURIComponent(experimentId.current)}`,{cache:'no-store'});
    if(!response.ok)throw new Error(await response.text());
    const payload=await response.json() as StatusPayload;
    const currentPhase=payload.progress?.phase??payload.execution?.status??payload.status;
    setPhase(currentPhase);
    setMessage(payload.progress?.message??`Execution ${currentPhase.toLowerCase()}`);
    setPairs(Number(payload.progress?.valid_pairs??0));
    if(payload.status==='SEALED'&&payload.result_href){
      setState('SEALED');
      window.location.assign(payload.result_href);
      return false;
    }
    if(payload.status==='FAILED'||payload.execution?.status==='FAILED'){
      setState('FAILED');
      setMessage(payload.execution?.errorCode??'Execution failed');
      return false;
    }
    return true;
  }

  useEffect(()=>{
    if(state!=='RUNNING')return;
    let cancelled=false;
    const tick=async()=>{
      try{
        const keep=await poll();
        if(!cancelled&&keep)setTimeout(tick,1000);
      }catch(error){
        if(!cancelled){setState('FAILED');setMessage(error instanceof Error?error.message:'Status transport failed');}
      }
    };
    void tick();
    return()=>{cancelled=true;};
  },[state]);

  async function launch(){
    if(!liveEnabled||state==='STARTING'||state==='RUNNING')return;
    if(!experimentId.current) experimentId.current=`EXP-FLAGSHIP-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
    setState('STARTING');setPhase('CLAIMING');setMessage('Creating immutable experiment setup and claiming STANDARD execution');
    try{
      const response=await fetch('/api/companyops/launch',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({experiment_id:experimentId.current})});
      if(!response.ok)throw new Error(await response.text());
      const payload=await response.json() as {experiment_id:string};
      experimentId.current=payload.experiment_id;
      setState('RUNNING');setPhase('INITIALIZING');setMessage('Matched worlds admitted; waiting for progress');
    }catch(error){setState('FAILED');setPhase('FAILED');setMessage(error instanceof Error?error.message:'Launch failed');}
  }

  const pct=Math.max(0,Math.min(100,(pairs/200)*100));
  return <section className="cl-launch-control" data-ui="experiment-launch-control" data-state={state.toLowerCase()}>
    <div className="cl-launch-status">
      <span className="cl-eyebrow">Execution control</span>
      <strong>{phase}</strong>
      <p>{message}</p>
    </div>
    <div className="cl-launch-progress" aria-label={`${pairs} of 200 matched pairs`}>
      <div><span style={{width:`${pct}%`}}/></div>
      <small>{pairs}/200 matched pairs</small>
    </div>
    <button className="cl-launch-button" type="button" disabled={!liveEnabled||state==='STARTING'||state==='RUNNING'||state==='SEALED'} onClick={launch}>
      {!liveEnabled?'API REQUIRED':state==='RUNNING'?'RUNNING STANDARD':state==='STARTING'?'CLAIMING RUN':'LAUNCH STANDARD'}
    </button>
  </section>;
}
