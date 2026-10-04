export const initialBankProgress=()=>({version:1,answers:[],notes:{},unsure:[],flashcards:{},schedule:{},queue:[]});

export function shuffledIds(items,previous=[]){
 const ids=items.map(x=>x.id),remaining=ids.filter(id=>!previous.includes(id));
 const pool=remaining.length?remaining:ids;
 return [...pool].sort(()=>Math.random()-.5);
}
export function topicStats(questions,answers){
 return questions.reduce((out,q)=>{const rows=answers.filter(a=>a.questionId===q.id);if(!out[q.topik])out[q.topik]={total:0,correct:0};out[q.topik].total+=rows.length;out[q.topik].correct+=rows.filter(x=>x.correct).length;return out},{});
}
export function recommendation(questions,answers){
 if(!answers.length)return {topic:'anatomi',reason:'Belum ada hasil latihan. Mulai dari fondasi anatomi untuk membangun baseline.'};
 const stats=topicStats(questions,answers),rank=Object.entries(stats).filter(([,x])=>x.total).sort((a,b)=>(a[1].correct/a[1].total)-(b[1].correct/b[1].total));
 const [topic,s]=rank[0];return {topic,reason:`Akurasi ${Math.round(s.correct/s.total*100)}% (${s.correct}/${s.total}) adalah hasil terendah Anda.`};
}
export const officialScore=answers=>{const rows=answers.filter(x=>x.official);return {correct:rows.filter(x=>x.correct).length,total:rows.length,attempts:rows}};
