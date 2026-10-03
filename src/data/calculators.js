const numberField=(id,label,unit,min,max,step=1,defaultValue='')=>({id,label,type:'number',unit,min,max,step,defaultValue});

const validateSchema=(schema,values)=>{
 const errors={};
 for(const field of schema){
  const value=values[field.id];
  if(value===undefined||value===null||value===''){errors[field.id]=`${field.label} wajib diisi.`;continue}
  if(field.type==='number'){
   const number=Number(value);
   if(!Number.isFinite(number))errors[field.id]=`${field.label} harus berupa angka finite.`;
   else if(number<0)errors[field.id]=`${field.label} tidak boleh negatif.`;
   else if(number<field.min||number>field.max)errors[field.id]=`${field.label} harus ${field.min}–${field.max} ${field.unit}.`;
  }
 }
 return errors;
};

const disabled=(id,name,category='Belum memiliki metode jelas',note='Metode, populasi penggunaan, dan validasi belum ditetapkan.',references=[])=>({
 id,name,status:'development',category,inputSchema:[],units:{},validation:()=>({form:note}),calculate:null,
 interpretation:()=>'',formula:'Belum ditetapkan.',method:'Tidak diaktifkan sampai metode dan populasi penggunaan diverifikasi.',
 assumptions:['Tidak ada perhitungan yang dijalankan.'],references,limitations:[note]
});

export const calculatorRegistry=[
 {
  id:'bmi',name:'BMI / IMT dewasa',status:'active',category:'Kalkulator berbasis bukti',
  inputSchema:[numberField('weight','Berat badan','kg',20,350,0.1,65),numberField('height','Tinggi badan','cm',100,250,0.1,170)],units:{weight:'kg',height:'cm',result:'kg/m²'},
  validation:values=>validateSchema(calculatorRegistry[0].inputSchema,values),
  calculate:({weight,height})=>Number(weight)/(Number(height)/100)**2,
  interpretation:value=>value<18.5?'Berat badan kurang':value<25?'Rentang sehat':value<30?'Berat badan berlebih (pra-obesitas)':'Obesitas',
  format:value=>`IMT ${value.toFixed(1)} kg/m²`,formula:'IMT = berat (kg) ÷ [tinggi (m)]²',
  method:'Klasifikasi IMT dewasa WHO; digunakan sebagai indikator skrining, bukan pengukuran lemak tubuh.',
  assumptions:['Untuk orang dewasa ≥20 tahun.','Berat dan tinggi diukur dengan alat yang sesuai.'],
  references:[{label:'WHO — Nutrition for a healthy life (klasifikasi IMT dewasa)',url:'https://www.who.int/europe/news-room/fact-sheets/item/nutrition---maintaining-a-healthy-lifestyle'}],
  limitations:['Tidak berlaku untuk klasifikasi anak/remaja.','Tidak membedakan massa lemak dan massa otot; kehamilan, edema, amputasi, dan komposisi tubuh dapat membatasi interpretasi.']
 },
 {
  id:'bmr',name:'BMR / TDEE dewasa',status:'active',category:'Kalkulator berbasis bukti',
  inputSchema:[{id:'sex',label:'Jenis kelamin pada persamaan',type:'select',options:[['male','Laki-laki'],['female','Perempuan']],defaultValue:'male'},numberField('age','Usia','tahun',19,78,1,30),numberField('weight','Berat badan','kg',20,350,0.1,65),numberField('height','Tinggi badan','cm',100,250,0.1,170),{id:'activity',label:'Faktor aktivitas asumsi',type:'select',options:[['1.2','1,20 · sangat ringan'],['1.375','1,375 · ringan'],['1.55','1,55 · sedang'],['1.725','1,725 · tinggi'],['1.9','1,90 · sangat tinggi']],defaultValue:'1.2'}],
  units:{age:'tahun',weight:'kg',height:'cm',result:'kkal/hari'},
  validation(values){const errors=validateSchema(this.inputSchema,values);if(!['male','female'].includes(values.sex))errors.sex='Pilih jenis kelamin yang tersedia.';if(!['1.2','1.375','1.55','1.725','1.9'].includes(values.activity))errors.activity='Pilih faktor aktivitas yang tersedia.';return errors},
  calculate:({sex,age,weight,height,activity})=>{const rmr=10*Number(weight)+6.25*Number(height)-5*Number(age)+(sex==='male'?5:-161);return{rmr,tdee:rmr*Number(activity)}},
  interpretation:()=> 'Estimasi kebutuhan energi, bukan target terapi individual.',format:value=>`RMR ${Math.round(value.rmr)} kkal/hari · TDEE ${Math.round(value.tdee)} kkal/hari`,
  formula:'RMR Mifflin–St Jeor = 10×berat + 6,25×tinggi − 5×usia + 5 (laki-laki) atau −161 (perempuan); TDEE = RMR × faktor aktivitas.',
  method:'Persamaan Mifflin–St Jeor (sebenarnya mengestimasi resting energy expenditure/RMR). TDEE memakai pengali aktivitas konvensional yang dipilih pengguna dan merupakan asumsi tambahan.',
  assumptions:['Untuk dewasa sehat usia 19–78 tahun, sesuai rentang sampel studi asli.','Kategori jenis kelamin diperlukan karena koefisien studi asli bersifat biner.','Aktivitas dan efek termik makanan disederhanakan dalam satu faktor.'],
  references:[{label:'Mifflin dkk. 1990 — studi primer persamaan REE',url:'https://pubmed.ncbi.nlm.nih.gov/2305711/'},{label:'NIDDK — Body Weight Planner (batas penggunaan dewasa)',url:'https://www.niddk.nih.gov/health-information/weight-management/body-weight-planner'}],
  limitations:['RMR prediksi tidak sama dengan pengukuran kalorimetri indirek.','Pengali aktivitas bukan bagian dari persamaan Mifflin–St Jeor dan TDEE aktual dapat berbeda.','Tidak untuk usia <19 atau >78 tahun, kehamilan/menyusui, penyakit akut, atau peresepan nutrisi klinis.']
 },
 {
  id:'age',name:'Kalkulator usia',status:'active',category:'Utilitas kalender',
  inputSchema:[{id:'birthDate',label:'Tanggal lahir',type:'date',defaultValue:''},{id:'asOfDate',label:'Hitung usia pada tanggal',type:'date',defaultValue:()=>new Date().toISOString().slice(0,10)}],units:{result:'tahun, bulan, hari'},
  validation(values){const errors=validateSchema(this.inputSchema,values),birth=parseDate(values.birthDate),asOf=parseDate(values.asOfDate);if(values.birthDate&&!birth)errors.birthDate='Tanggal lahir tidak valid.';if(values.asOfDate&&!asOf)errors.asOfDate='Tanggal acuan tidak valid.';if(birth&&asOf&&birth>asOf)errors.birthDate='Tanggal lahir tidak boleh setelah tanggal acuan.';if(birth&&birth<new Date(Date.UTC(1900,0,1)))errors.birthDate='Tanggal lahir minimum 1 Januari 1900.';return errors},
  calculate:({birthDate,asOfDate})=>calendarAge(parseDate(birthDate),parseDate(asOfDate)),
  interpretation:value=>`Usia kalender penuh: ${value.years} tahun, ${value.months} bulan, ${value.days} hari.`,format:value=>`${value.years} tahun · ${value.months} bulan · ${value.days} hari`,
  formula:'Selisih kalender: kurangi tahun, bulan, dan hari; pinjam jumlah hari dari bulan kalender sebelumnya bila perlu.',method:'Perhitungan usia kalender berbasis tanggal (UTC), bukan selisih milidetik ÷ 365.',
  assumptions:['Tanggal memakai kalender Gregorian.','Waktu dan zona waktu tidak diperhitungkan; hanya tanggal yang digunakan.'],references:[{label:'ISO 8601 — representasi tanggal kalender',url:'https://www.iso.org/iso-8601-date-and-time-format.html'}],limitations:['Tidak menghitung jam/menit kelahiran.','Aturan administratif usia dapat berbeda menurut yurisdiksi.']
 },
 disabled('ideal-weight','Berat badan ideal'),disabled('body-fat','Persentase lemak tubuh'),disabled('fluid','Kebutuhan cairan harian'),
 disabled('mbti','MBTI sederhana','Checklist buatan sendiri','Bukan instrumen MBTI tervalidasi dan belum ada izin/metode yang layak.'),
 disabled('pss10','PSS-10 tingkat stres','Instrumen tervalidasi — verifikasi izin','Dinonaktifkan: item, pembalikan skor, versi Bahasa Indonesia tervalidasi, populasi, dan hak penggunaan belum seluruhnya didokumentasikan. Pemilik skala mengarahkan permintaan izin melalui MAPI Research Trust.',[{label:'Carnegie Mellon University — PSS dan proses izin',url:'https://www.cmu.edu/dietrich/psychology/stress-immunity-disease-lab/scales/index.html'}]),
 disabled('burnout','Burnout screening','Instrumen tervalidasi — belum dipilih'),disabled('diabetes','Risiko diabetes','Instrumen tervalidasi — belum dipilih'),
 disabled('digital-readiness','Digital health readiness score','Checklist internal — belum tervalidasi','Skor internal belum tervalidasi dan tidak boleh diperlakukan sebagai instrumen terstandar.'),
 disabled('cyber-readiness','Hospital cybersecurity readiness','Checklist internal — belum tervalidasi','Skor internal belum tervalidasi dan tidak boleh diperlakukan sebagai audit keamanan.'),
 disabled('patient-safety','Patient safety risk checklist','Checklist internal — belum tervalidasi','Skor internal belum tervalidasi dan tidak boleh diperlakukan sebagai instrumen risiko klinis.'),
 disabled('aeromedical','Aeromedical evacuation readiness','Checklist internal — belum tervalidasi','Skor internal belum tervalidasi dan tidak boleh digunakan untuk keputusan evakuasi.'),
 disabled('manuscript','Research manuscript readiness','Checklist internal — belum tervalidasi','Skor internal belum tervalidasi; gunakan pedoman pelaporan yang sesuai desain studi.')
];

export function parseDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))return null;const [y,m,d]=value.split('-').map(Number),date=new Date(Date.UTC(y,m-1,d));return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d?date:null}
export function calendarAge(birth,asOf){let years=asOf.getUTCFullYear()-birth.getUTCFullYear(),months=asOf.getUTCMonth()-birth.getUTCMonth(),days=asOf.getUTCDate()-birth.getUTCDate();if(days<0){months--;days+=new Date(Date.UTC(asOf.getUTCFullYear(),asOf.getUTCMonth(),0)).getUTCDate()}if(months<0){years--;months+=12}return{years,months,days}}
export const initialValues=calculator=>Object.fromEntries(calculator.inputSchema.map(field=>[field.id,typeof field.defaultValue==='function'?field.defaultValue():field.defaultValue??'']));
