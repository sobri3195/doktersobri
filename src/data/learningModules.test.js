import test from 'node:test';
import assert from 'node:assert/strict';
import {learningModules} from './learningModules.js';

test('setiap learning lab memiliki model dan kasus lengkap',()=>{
 for(const [kind,module] of Object.entries(learningModules)){
  assert.ok(module.objectives.length);
  assert.ok(module.completion);
  assert.ok(module.references.length);
  for(const item of module.cases){
   assert.ok(item.material.length,`${kind}/${item.id}: materi`);
   assert.ok(item.explanation,`${kind}/${item.id}: pembahasan`);
   assert.ok(item.answer||item.answers,`${kind}/${item.id}: jawaban`);
   if(kind==='ekg') assert.ok(item.pattern);
   if(kind==='cxr') assert.ok(item.marker);
   if(kind==='osteology') assert.ok(item.landmarks.length);
  }
 }
});
