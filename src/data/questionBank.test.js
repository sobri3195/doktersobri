import test from 'node:test';import assert from 'node:assert/strict';
import {btkvBlueprint,questions} from './questionBank.js';
import {officialScore,recommendation,shuffledIds} from '../utils/questionEngine.js';

test('bank BTKV berisi 30 soal dengan model lengkap dan delapan domain',()=>{
 assert.equal(questions.length,30);assert.equal(btkvBlueprint.length,8);
 for(const q of questions){for(const field of ['id','bidang','subtopik','tujuanBelajar','tingkatKesulitan','vignette','opsi','jawabanTerbaik','pembahasanOpsi','referensi','statusReview'])assert.notEqual(q[field],undefined);assert.equal(q.opsi.length,q.pembahasanOpsi.length)}
});
test('antrean tidak mengulang sebelum pool habis',()=>{const first=questions.slice(0,4),queue=shuffledIds(first,[first[0].id,first[1].id]);assert.equal(queue.length,2);assert(!queue.includes(first[0].id));assert(!queue.includes(first[1].id))});
test('skor resmi mengabaikan draft dan rekomendasi mengikuti kelemahan',()=>{const answers=[{questionId:'BTKV-001',topic:'anatomi',correct:false,official:true},{questionId:'BTKV-006',topic:'fisiologi',correct:true,official:true},{questionId:'BTKV-005',topic:'fisiologi',correct:false,official:false}];assert.deepEqual(officialScore(answers).total,2);assert.equal(recommendation(questions,answers).topic,'anatomi')});
