import test from 'node:test';
import assert from 'node:assert/strict';
import {calculatorRegistry,calendarAge,parseDate} from './calculators.js';

const byId=id=>calculatorRegistry.find(item=>item.id===id);

test('BMI 65 kg dan 170 cm sekitar 22,5',()=>{
 const bmi=byId('bmi');
 assert.deepEqual(bmi.validation({weight:65,height:170}),{});
 assert.equal(bmi.calculate({weight:65,height:170}).toFixed(1),'22.5');
});

test('validasi menolak kosong, negatif, non-finite, dan di luar batas',()=>{
 const bmi=byId('bmi');
 assert.ok(bmi.validation({weight:'',height:170}).weight);
 assert.ok(bmi.validation({weight:-1,height:170}).weight);
 assert.ok(bmi.validation({weight:'Infinity',height:170}).weight);
 assert.ok(bmi.validation({weight:65,height:251}).height);
});

test('Mifflin–St Jeor menghitung RMR dan TDEE secara independen',()=>{
 const result=byId('bmr').calculate({sex:'male',age:30,weight:65,height:170,activity:'1.2'});
 assert.equal(result.rmr,1567.5);
 assert.equal(result.tdee,1881);
});

test('usia memakai aritmetika kalender termasuk peminjaman hari',()=>{
 assert.deepEqual(calendarAge(parseDate('2000-10-15'),parseDate('2026-10-03')),{years:25,months:11,days:18});
 assert.equal(parseDate('2025-02-30'),null);
 assert.ok(byId('age').validation({birthDate:'2027-01-01',asOfDate:'2026-10-03'}).birthDate);
});

test('alat tanpa metode jelas tidak memiliki fungsi kalkulasi',()=>{
 const inactive=calculatorRegistry.filter(item=>item.status!=='active');
 assert.ok(inactive.length>0);
 assert.ok(inactive.every(item=>item.calculate===null&&item.inputSchema.length===0));
 assert.equal(new Set(calculatorRegistry.filter(item=>item.status==='active').map(item=>item.calculate)).size,3);
});
