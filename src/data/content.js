export const articles=[
 ['gerd-fakta-dan-mitos','GERD: Memahami Gejala, Pemicu, dan Mitos','Kesehatan Umum','Bukti kuat','7 menit','HeartPulse','Apa yang benar-benar terjadi saat asam lambung naik?'],
 ['dbd-trombosit','DBD dan Trombosit: Kapan Harus Waspada?','Kesehatan Umum','Bukti cukup','6 menit','Droplets','Angka trombosit bukan satu-satunya penentu kondisi klinis.'],
 ['cybersecurity-healthcare','Cybersecurity di Layanan Kesehatan','Cybersecurity Healthcare','Bukti cukup','9 menit','ShieldCheck','Menjaga keselamatan pasien di tengah transformasi digital.'],
 ['aeromedical-evacuation','Prinsip Aeromedical Evacuation','Military Medicine','Bukti cukup','8 menit','Plane','Risiko fisiologis dan kesiapan pemindahan pasien melalui udara.'],
 ['akupunktur-sains','Akupunktur Menurut Sains','Evidence-Based Medicine','Bukti terbatas','7 menit','Activity','Membaca bukti manfaat dan keterbatasannya secara proporsional.'],
 ['patient-safety','Patient Safety: Dari Sistem ke Budaya','Patient Safety','Bukti kuat','10 menit','Cross','Keselamatan tumbuh dari sistem yang mau belajar.'],
 ['chiropractic','Chiropractic: Aman atau Berbahaya?','Kesehatan Umum','Bukti terbatas','8 menit','Bone','Menimbang manfaat, risiko, dan red flags.'],
 ['digital-health','Digital Health yang Berpusat pada Pasien','Digital Health','Bukti awal','6 menit','Laptop','Teknologi harus memperkuat, bukan menggantikan relasi klinis.'],
 ['keracunan-makanan','Pertolongan Awal Keracunan Makanan','Emergency Medicine','Bukti cukup','5 menit','AlertTriangle','Kenali dehidrasi dan tanda bahaya.']
].map((x,i)=>({slug:x[0],title:x[1],category:x[2],evidence:x[3],read:x[4],icon:x[5],excerpt:x[6],date:`${12-i} Sep 2026`,popular:i<3,tags:['edukasi','evidence-based']}));

export const products=[
 {title:'Research Starter Kit',category:'Research kit',format:'PDF · DOCX · XLSX',price:'Rp129.000',desc:'Template terstruktur untuk memulai protokol, ekstraksi data, dan manuskrip.',tone:'cyan'},
 {title:'Clinical Teaching Slides',category:'PPT edukasi',format:'PPTX · 60 slides',price:'Rp89.000',desc:'Sistem slide klinis yang bersih, konsisten, dan mudah diadaptasi.',tone:'navy'},
 {title:'PRISMA Review Workspace',category:'Template PRISMA',format:'XLSX · Notion',price:'Rp99.000',desc:'Workspace praktis untuk membantu dokumentasi systematic review.',tone:'gold'},
 {title:'Patient Safety Toolkit',category:'Digital health tools',format:'PDF · XLSX',price:'Rp149.000',desc:'Checklist audit dan materi fasilitasi pembelajaran keselamatan pasien.',tone:'teal'}
];
export const toolCards=[
 ['PICO Evidence Finder','Bangun strategi pencarian literatur lintas basis data.','/research-lab','Search'],['Kalkulator Medis','Kalkulator edukatif dengan interpretasi dan riwayat lokal.','/tools/kalkulator','Calculator'],['EKG Learning Lab','Pelajari ritme, interval, dan interpretasi sistematis.','/belajar/ekg','Activity'],['Osteology Lab','Atlas tulang, landmark, kuis, dan progres belajar.','/belajar/osteology','Bone']
];
export const simulators=[['ACLS Interaktif','Algoritme, timer RJP, checklist H & T, dan debrief.','/simulator/acls'],['Expert ACLS MegaCode','Monitor dinamis dan latihan keputusan klinis.','/simulator/megacode'],['Chest X-ray Lab','Latihan interpretasi ABCDE dan kuis kasus.','/belajar/cxr'],['Komunikasi Pelayanan Prima','Skenario bercabang, empati, SBAR, dan evaluasi.','/belajar/komunikasi']];
