export const PHASES=['persiapan','penilaian_awal','identifikasi_ritme','tindakan','evaluasi_ulang','debrief'];

export const guideline={
  title:'2025 American Heart Association Guidelines for CPR and ECC',
  version:'2025',verifiedOn:'3 Oktober 2026',
  url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms/'
};

export const cases={
  vf:{
    id:'vf',title:'Henti jantung dewasa — VF',reviewStatus:'reviewed',reviewLabel:'Ditinjau terhadap algoritme AHA 2025',
    opening:'Seorang dewasa ditemukan kolaps di ruang observasi. Anda memimpin tim resusitasi.',
    initial:{phase:'persiapan',rhythm:'Belum dinilai',vitals:{hr:null,spo2:null,etco2:null,bp:null,rr:null},pulse:null,cpr:false,team:false,shockCount:0},
    information:{
      persiapan:'Keamanan lokasi belum dikonfirmasi; tim dan alat belum dipanggil.',
      penilaian_awal:'Pasien tidak merespons. Napas dan nadi belum dinilai.',
      identifikasi_ritme:'Pasien tidak responsif, tidak bernapas normal, dan nadi tidak teraba. Monitor siap dianalisis.',
      tindakan:'Monitor menunjukkan fibrilasi ventrikel (VF); nadi tidak teraba.',
      evaluasi_ulang:'Dua menit simulasi CPR telah berlangsung. Nilai ritme dan nadi secara singkat.',
      debrief:'Skenario selesai dengan ROSC simulasi.'
    },
    actions:{
      prepare:{label:'Pastikan aman & panggil tim',phase:'persiapan',next:'penilaian_awal',rubric:'communication',points:15,feedback:'Tim resusitasi dan defibrilator dipanggil; peran dikonfirmasi.',patch:{team:true}},
      assess:{label:'Nilai respons, napas & nadi',phase:'penilaian_awal',next:'identifikasi_ritme',rubric:'recognition',points:20,feedback:'Tidak responsif, tidak bernapas normal, dan nadi tidak teraba.',patch:{pulse:false}},
      analyze:{label:'Analisis ritme',phase:'identifikasi_ritme',next:'tindakan',rubric:'recognition',points:15,feedback:'VF dikenali: ritme shockable.',patch:{rhythm:'Fibrilasi ventrikel',vitals:{hr:null,spo2:null,etco2:null,bp:null,rr:null}}},
      cpr:{label:'Mulai / lanjutkan CPR berkualitas',phase:'tindakan',next:'tindakan',rubric:'sequence',points:15,feedback:'Kompresi dimulai; interupsi diminimalkan.',patch:{cpr:true,vitals:{hr:null,spo2:null,etco2:18,bp:null,rr:null}}},
      shock:{label:'Defibrilasi (energi sesuai alat)',phase:'tindakan',requires:['cpr'],next:'evaluasi_ulang',rubric:'sequence',points:20,feedback:'Shock diberikan setelah clear; CPR segera dilanjutkan.',patch:{cpr:true,shockCount:1,rhythm:'Ritme terorganisasi'}},
      reassess:{label:'Evaluasi ulang ritme & nadi',phase:'evaluasi_ulang',next:'debrief',rubric:'reassessment',points:15,feedback:'Ritme terorganisasi dan nadi teraba: ROSC simulasi.',patch:{pulse:true,cpr:false,rhythm:'Sinus',vitals:{hr:88,spo2:94,etco2:38,bp:'104/68',rr:14}}},
      ivio:{label:'Siapkan akses IV/IO',phase:'tindakan',next:'tindakan',rubric:'sequence',points:0,feedback:'Akses disiapkan tanpa menghentikan CPR.'},
      causes:{label:'Telusuri penyebab reversibel',phase:'tindakan',next:'tindakan',rubric:'communication',points:0,feedback:'Tim diminta menilai penyebab reversibel.'}
    },
    expected:['prepare','assess','analyze','cpr','shock','reassess'],
    inappropriate:{shock:'Defibrilasi belum tepat sebelum VF/pVT dikenali dan CPR dimulai.',reassess:'Pemeriksaan nadi/ritme tidak dilakukan di luar titik evaluasi ulang.',assess:'Penilaian awal sudah selesai; hindari pengulangan yang menghambat tindakan.',analyze:'Analisis ritme tidak sesuai pada fase ini.',prepare:'Persiapan ini sudah dilakukan.'},
    endCondition:'ROSC simulasi setelah evaluasi ulang.'
  },
  megacode_draft:{
    id:'megacode_draft',title:'MegaCode multi-ritme',reviewStatus:'unreviewed',reviewLabel:'BELUM DITINJAU — terkunci untuk keselamatan',
    opening:'Kasus ini masih menunggu peninjauan klinis terhadap pedoman resmi.',initial:{phase:'persiapan',rhythm:'Belum tersedia',vitals:{hr:null,spo2:null,etco2:null,bp:null,rr:null}},information:{persiapan:'Konten belum ditinjau.'},actions:{},expected:[],inappropriate:{},endCondition:'Tidak dapat dijalankan sebelum review.'
  }
};

export const rubric={recognition:{label:'Pengenalan masalah',max:35},sequence:{label:'Urutan tindakan',max:35},reassessment:{label:'Evaluasi ulang',max:15},communication:{label:'Komunikasi',max:15}};
export function initialSession(caseId='vf',mode='learning'){
  const scenario=cases[caseId];return {caseId,mode,status:'idle',elapsed:0,...scenario.initial,completed:[],events:[],scores:{recognition:0,sequence:0,reassessment:0,communication:0},feedback:'Tekan “Mulai sesi” untuk memulai. Tindakan pra-sesi tidak dicatat.'};
}
const stamp=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
export function performAction(session,actionId,reason=''){
  const scenario=cases[session.caseId],action=scenario.actions[actionId];
  if(session.status!=='running')return session;
  const duplicate=session.completed.includes(actionId);
  const missing=action?.requires?.filter(x=>!session.completed.includes(x))||[];
  const appropriate=Boolean(action)&&action.phase===session.phase&&!duplicate&&!missing.length;
  const feedback=duplicate?'Tindakan sudah tercatat; pengulangan tidak menambah skor.':missing.length?scenario.inappropriate[actionId]||'Prasyarat tindakan belum terpenuhi.':appropriate?action.feedback:scenario.inappropriate[actionId]||'Tindakan tidak sesuai dengan fase skenario saat ini.';
  const event={time:session.elapsed,timestamp:stamp(session.elapsed),phase:session.phase,action:action?.label||actionId,actionId,reason:reason.trim()||'Tidak diberikan',outcome:appropriate?'tepat':'tidak sesuai',stateChange:appropriate&&action.next!==session.phase?`${session.phase} → ${action.next}`:'Tidak ada perubahan fase',feedback};
  if(!appropriate)return {...session,feedback,events:[...session.events,event]};
  const scores={...session.scores};scores[action.rubric]=Math.min(rubric[action.rubric].max,scores[action.rubric]+action.points);
  const next={...session,...action.patch,phase:action.next,completed:[...session.completed,actionId],scores,feedback,events:[...session.events,event]};
  if(action.patch?.vitals)next.vitals={...session.vitals,...action.patch.vitals};
  if(action.next==='debrief')next.status='complete';
  return next;
}
export function tick(session){
  if(session.status!=='running')return session;
  const elapsed=session.elapsed+1;
  if(elapsed===45&&!session.completed.includes('cpr'))return {...session,elapsed,feedback:'CPR belum dimulai; keterlambatan dicatat.',events:[...session.events,{time:elapsed,timestamp:stamp(elapsed),phase:session.phase,action:'Perubahan kondisi',reason:'Waktu berjalan',outcome:'terlambat',stateChange:'Kondisi tetap henti jantung',feedback:'CPR belum dimulai dalam 45 detik simulasi.'}]};
  return {...session,elapsed};
}
export function sessionResult(session){
  const scenario=cases[session.caseId],score=Object.values(session.scores).reduce((a,b)=>a+b,0);
  return {title:scenario.title,guideline,mode:session.mode,duration:stamp(session.elapsed),score,rubric:Object.entries(rubric).map(([id,r])=>({category:r.label,score:session.scores[id],max:r.max})),correct:session.events.filter(x=>x.outcome==='tepat'),late:session.events.filter(x=>x.outcome==='terlambat'),inappropriate:session.events.filter(x=>x.outcome==='tidak sesuai'),missed:scenario.expected.filter(id=>!session.completed.includes(id)).map(id=>scenario.actions[id].label),events:session.events};
}
