// Satu sumber data untuk navigasi, status ketersediaan, dan statistik konten.
const articleRows = [
 ['gerd-fakta-dan-mitos','GERD: Memahami Gejala, Pemicu, dan Mitos','Kesehatan Umum','Bukti kuat','7 menit','HeartPulse','Apa yang benar-benar terjadi saat asam lambung naik?'],
 ['dbd-trombosit','DBD dan Trombosit: Kapan Harus Waspada?','Kesehatan Umum','Bukti cukup','6 menit','Droplets','Angka trombosit bukan satu-satunya penentu kondisi klinis.'],
 ['cybersecurity-healthcare','Cybersecurity di Layanan Kesehatan','Cybersecurity Healthcare','Bukti cukup','9 menit','ShieldCheck','Menjaga keselamatan pasien di tengah transformasi digital.'],
 ['aeromedical-evacuation','Prinsip Aeromedical Evacuation','Military Medicine','Bukti cukup','8 menit','Plane','Risiko fisiologis dan kesiapan pemindahan pasien melalui udara.'],
 ['akupunktur-sains','Akupunktur Menurut Sains','Evidence-Based Medicine','Bukti terbatas','7 menit','Activity','Membaca bukti manfaat dan keterbatasannya secara proporsional.'],
 ['patient-safety','Patient Safety: Dari Sistem ke Budaya','Patient Safety','Bukti kuat','10 menit','Cross','Keselamatan tumbuh dari sistem yang mau belajar.'],
 ['chiropractic','Chiropractic: Aman atau Berbahaya?','Kesehatan Umum','Bukti terbatas','8 menit','Bone','Menimbang manfaat, risiko, dan red flags.'],
 ['digital-health','Digital Health yang Berpusat pada Pasien','Digital Health','Bukti awal','6 menit','Laptop','Teknologi harus memperkuat, bukan menggantikan relasi klinis.'],
 ['keracunan-makanan','Pertolongan Awal Keracunan Makanan','Emergency Medicine','Bukti cukup','5 menit','AlertTriangle','Kenali dehidrasi dan tanda bahaya.']
];

export const articles=articleRows.map((x,i)=>({id:`article-${i+1}`,slug:x[0],title:x[1],category:x[2],route:`/artikel/${x[0]}`,status:'available',evidence:x[3],read:x[4],icon:x[5],excerpt:x[6],date:`${12-i} Sep 2026`,popular:i<3,tags:['edukasi','evidence-based']}));
export const tools=[
 {id:'tool-pico',slug:'pico-evidence-finder',title:'PICO Evidence Finder',category:'Research tool',route:'/research-lab',status:'available',desc:'Bangun strategi pencarian literatur lintas basis data.',icon:'Search'},
 {id:'tool-calculator',slug:'kalkulator-medis',title:'Kalkulator Medis',category:'Clinical utility',route:'/tools/kalkulator',status:'available',desc:'Kalkulator edukatif dengan interpretasi dan riwayat lokal.',icon:'Calculator'},
 {id:'tool-aeromedical',slug:'aeromedical-readiness',title:'Aeromedical Readiness',category:'Checklist',route:'/tools/aeromedical-readiness',status:'coming-soon',desc:'Checklist kesiapan evakuasi edukatif.',icon:'Plane'}
];
export const learningLabs=[
 {id:'learning-ekg',slug:'ekg',title:'EKG Learning Lab',category:'Kardiologi',route:'/belajar/ekg',status:'available',desc:'Pelajari ritme, interval, dan interpretasi sistematis.',icon:'Activity'},
 {id:'learning-cxr',slug:'cxr',title:'Chest X-ray Lab',category:'Radiologi',route:'/belajar/cxr',status:'available',desc:'Latihan interpretasi ABCDE dan kuis kasus.',icon:'ScanLine'},
 {id:'learning-osteology',slug:'osteology',title:'Osteology Lab',category:'Anatomi',route:'/belajar/osteology',status:'available',desc:'Atlas tulang, landmark, kuis, dan progres belajar.',icon:'Bone'},
 {id:'learning-study',slug:'study',title:'Teknik Belajar Kedokteran',category:'Metode belajar',route:'/belajar/study',status:'demo',desc:'Planner, active recall, dan focus timer.',icon:'BookOpen'},
 {id:'learning-komunikasi',slug:'komunikasi',title:'Komunikasi Pelayanan Prima',category:'Komunikasi',route:'/belajar/komunikasi',status:'demo',desc:'Skenario bercabang, empati, SBAR, dan evaluasi.',icon:'MessagesSquare'}
];
export const simulators=[
 {id:'sim-acls',slug:'acls',title:'ACLS Interaktif',category:'Emergency medicine',route:'/simulator/acls',status:'available',desc:'Algoritme, timer RJP, checklist H & T, dan debrief.'},
 {id:'sim-megacode',slug:'megacode',title:'Expert ACLS MegaCode',category:'Emergency medicine',route:'/simulator/megacode',status:'demo',desc:'Monitor dinamis dan latihan keputusan klinis.'}
];
export const products=[
 ['research-starter-kit','Research Starter Kit','Research kit','PDF · DOCX · XLSX','Rp129.000','Template terstruktur untuk memulai protokol, ekstraksi data, dan manuskrip.','cyan'],
 ['clinical-teaching-slides','Clinical Teaching Slides','PPT edukasi','PPTX · 60 slides','Rp89.000','Sistem slide klinis yang bersih, konsisten, dan mudah diadaptasi.','navy'],
 ['prisma-review-workspace','PRISMA Review Workspace','Template PRISMA','XLSX · Notion','Rp99.000','Workspace praktis untuk membantu dokumentasi systematic review.','gold'],
 ['patient-safety-toolkit','Patient Safety Toolkit','Digital health tools','PDF · XLSX','Rp149.000','Checklist audit dan materi fasilitasi pembelajaran keselamatan pasien.','teal']
].map((x,i)=>({id:`product-${i+1}`,slug:x[0],title:x[1],category:x[2],route:'/produk',status:'demo',format:x[3],price:x[4],desc:x[5],tone:x[6]}));

export const registry={articles,tools,learningLabs,simulators,products};
export const allContent=Object.values(registry).flat();
export const availableCounts=Object.fromEntries(Object.entries(registry).map(([type,items])=>[type,new Set(items.filter(x=>x.status==='available').map(x=>x.id)).size]));
export const toolCards=[...tools.filter(x=>x.status!=='coming-soon'),...learningLabs.filter(x=>['ekg','osteology'].includes(x.slug))];
export const statusLabel={available:'Tersedia',demo:'Demo', 'coming-soon':'Segera hadir'};
