import type{ReactNode}from'react';import{AlertTriangle,Database,Printer}from'lucide-react';
export function Card({children,className=''}:{children:ReactNode;className?:string}){return <section className={`card ${className}`}>{children}</section>}
export function Badge({children,tone='teal'}:{children:ReactNode;tone?:string}){return <span className={`badge ${tone}`}>{children}</span>}
export function PageHeader({eyebrow,title,lead,actions}:{eyebrow:string;title:string;lead:string;actions?:ReactNode}){return <header className="page-head"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{lead}</p></div>{actions&&<div className="head-actions">{actions}</div>}</header>}
export function Disclaimer(){return <div className="disclaimer" role="note"><AlertTriangle/><b>Research Prototype — Retrospective Geospatial Risk Intelligence — Not for Autonomous Clinical Decision-Making or Operational Deployment</b></div>}
export function State({loading,error}:{loading:boolean;error:string}){if(loading)return <div className="state" role="status"><span className="spinner"/>Loading verified research data…</div>;if(error)return <div className="state error" role="alert"><Database/> {error}</div>;return null}
export function PrintButton(){return <button className="button secondary no-print" onClick={()=>window.print()}><Printer/> Export / Print</button>}
export const fmt=(n:number)=>new Intl.NumberFormat('en-US').format(n);
