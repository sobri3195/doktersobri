export const DATABASES={
 PubMed:{platforms:['PubMed'],study:{rct:'randomized controlled trial[pt]',review:'systematic review[pt]'}},
 Scopus:{platforms:['Scopus'],study:{rct:'DOCTYPE(ar)',review:'DOCTYPE(re)'}},
 Embase:{platforms:['Embase.com','Ovid Embase'],study:{rct:"'randomized controlled trial'/de",review:"'systematic review'/de"}},
 Cochrane:{platforms:['Cochrane Library'],study:{rct:'in Trials',review:'in Cochrane Reviews'}},
 ProQuest:{platforms:['ProQuest'],study:{rct:'DTYPE("Article")',review:'DTYPE("Literature Review")'}}
};

const quote=t=>`"${t.replaceAll('"','')}"`;
const terms=c=>c.terms.map(t=>t.trim()).filter(Boolean);
function group(c,db,platform){
 const raw=terms(c);if(!raw.length)return '';
 const mapped=raw.map(t=>{
  if(db==='PubMed')return `${quote(t)}[Title/Abstract]`;
  if(db==='Scopus')return `TITLE-ABS-KEY(${quote(t)})`;
  if(db==='Embase')return platform==='Ovid Embase'?`${quote(t)}.ti,ab,kw.`:`${quote(t)}:ti,ab,kw`;
  if(db==='Cochrane')return `${quote(t)}:ti,ab,kw`;
  return `NOFT(${quote(t)})`;
 });return `(${mapped.join(' OR ')})`;
}
export function buildQuery({concepts,database,platform,yearFrom,yearTo,studyType}){
 let query=concepts.filter(c=>c.included).map(c=>group(c,database,platform)).filter(Boolean).join(' AND ');
 const notes=[];if(!query)return {query:'',notes};
 const from=Number(yearFrom),to=Number(yearTo);
 if(database==='PubMed'&&(from||to))query+=` AND (${from||'1000'}:${to||'3000'}[dp])`;
 else if(database==='Scopus'&&from)query+=` AND PUBYEAR > ${from-1}`;
 else if(database==='Scopus'&&to)query+=` AND PUBYEAR < ${to+1}`;
 else if(database==='Embase'&&(from||to))query+=platform==='Ovid Embase'?` and limit to yr="${from||1800} - ${to||3000}"`:` AND [${from||1800}-${to||3000}]/py`;
 else if((from||to))notes.push(`Tahun ${from||'awal'}–${to||'sekarang'} diterapkan sebagai filter antarmuka.`);
 if(studyType!=='all'){
  const syntax=DATABASES[database].study[studyType];
  if(database==='PubMed'||database==='Scopus')query+=` AND ${syntax}`;else notes.push(`Jenis studi “${studyType==='rct'?'randomized trial':'systematic review'}” diterapkan sebagai filter antarmuka: ${syntax}.`);
 }
 return {query,notes};
}

export function parseImport(text,name=''){
 if(/\.ris$/i.test(name)||/TY  - /.test(text))return text.split(/\nER  -\s*/).map((block,i)=>{const get=tag=>block.match(new RegExp(`^${tag}  - (.+)$`,'m'))?.[1]?.trim()||'';return {id:`ris-${Date.now()}-${i}`,title:get('TI')||get('T1'),abstract:get('AB'),doi:get('DO'),year:get('PY'),source:get('JO')||get('T2'),status:'pending',fullText:'pending',reason:'',studyId:''}}).filter(x=>x.title);
 const lines=text.trim().split(/\r?\n/);if(lines.length<2)return[];const headers=lines[0].split(',').map(x=>x.trim().replace(/^"|"$/g,'').toLowerCase());
 return lines.slice(1).map((line,i)=>{const cells=line.match(/("(?:[^"]|"")*"|[^,]*)(?:,|$)/g)?.map(x=>x.replace(/,$/,'').replace(/^"|"$/g,'').replaceAll('""','"'))||[];const get=(...keys)=>cells[headers.findIndex(h=>keys.includes(h))]||'';return{id:`csv-${Date.now()}-${i}`,title:get('title','ti'),abstract:get('abstract','ab'),doi:get('doi','do'),year:get('year','py'),source:get('journal','source'),status:'pending',fullText:'pending',reason:'',studyId:''}}).filter(x=>x.title);
}
export function deduplicate(records){const seen=new Set();return records.filter(r=>{const key=r.doi?`doi:${r.doi.toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//,'')}`:`title:${r.title.toLowerCase().replace(/\W/g,'')}`;if(seen.has(key))return false;seen.add(key);return true})}
export function prisma(records){const screened=records.filter(r=>r.status!=='pending'),taExcluded=records.filter(r=>r.status==='excluded'),reports=records.filter(r=>r.status==='included'),fullAssessed=reports.filter(r=>r.fullText!=='pending'),fullExcluded=reports.filter(r=>r.fullText==='excluded'),included=reports.filter(r=>r.fullText==='included');return{records:records.length,screened:screened.length,taExcluded:taExcluded.length,reportsSought:reports.length,fullAssessed:fullAssessed.length,fullExcluded:fullExcluded.length,studies:new Set(included.map(r=>r.studyId.trim()||r.id)).size,reportsIncluded:included.length}}
