export type RiskLevel='LOW'|'MODERATE'|'HIGH'|'VERY HIGH';
export interface Metric{model:string;year:number;mae?:number;rmse?:number;r2?:number;status?:string}
export interface ResearchData{study:{title:string;design:string;period:string;author:string;institution:string;updated:string};panels:{forecasting:{districts:number;districtYears:number;note:string};spatial2025:{districts:number;note:string}};burden:{totalReportedCases:number;annual:{year:number;cases:number}[]};models:{training:string;selection:number;refit:string;test:string;metrics:Metric[];leadingPredictor:string};spatial:{highestIncidence:{district:string;year:number;per1000:number};moransI:number;permutationP:number;interpretation:string};disclaimer:string}
export interface DatasetMeta{file:string;status:string;provenance:string;scope?:string}
export interface GeoCollection{type:'FeatureCollection';features:unknown[];metadata?:{status:string;reason:string;required?:string;sensitivity:string}}
