import type{GeoCollection,ResearchData}from'../types/research';
const cache=new Map<string,unknown>();
export async function loadJson<T>(path:string,validate:(v:unknown)=>v is T):Promise<T>{if(cache.has(path))return cache.get(path)as T;const response=await fetch(path);if(!response.ok)throw new Error(`Dataset not connected (${response.status})`);const value:unknown=await response.json();if(!validate(value))throw new Error('Dataset schema is invalid');cache.set(path,value);return value}
export const isResearchData=(v:unknown):v is ResearchData=>{const x=v as ResearchData;return Boolean(x?.study?.title&&x?.panels?.forecasting&&Array.isArray(x?.models?.metrics)&&x?.spatial?.highestIncidence)};
export const isGeoCollection=(v:unknown):v is GeoCollection=>{const x=v as GeoCollection;return x?.type==='FeatureCollection'&&Array.isArray(x.features)};
export async function loadText(path:string){const response=await fetch(path);if(!response.ok)throw new Error('Data not available');return response.text()}
export function parseCsv(text:string){const [header,...rows]=text.trim().split(/\r?\n/);const keys=header.split(',');return rows.map(row=>Object.fromEntries(row.split(',').map((v,i)=>[keys[i],v]))) }
