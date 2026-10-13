// 检查叙述接入后的案件流程与规则一致性，使用现有回归的最小 DOM 环境。
const fs=require('node:fs');
const harness=fs.readFileSync('qa/leisure-regression.cjs','utf8').split('let n=0;')[0];
eval(harness+`
const baseline=JSON.parse(fs.readFileSync('qa/prose-baseline.json','utf8'));
assert.equal(D.CASE_POOL.length,70);
assert.equal(new Set(D.CASE_POOL.map(c=>c.miss)).size,70,'Each wrong outcome must belong to its own case');
for(const c of D.CASE_POOL){
 const old=baseline.cases.find(x=>x.name===c.name);
 for(const k of ['name','diff','reward','leisureOnly','theme','culprit','suspects','source'])
  assert.equal(JSON.stringify(c[k]),JSON.stringify(old[k]),c.name+' '+k);
 assert.equal(c.clues.length,old.clueCount,c.name);
 assert.equal(c.contra.s,old.contra.s,c.name);assert.equal(c.contra.c,old.contra.c,c.name);
 assert(c.intro&&c.verdict&&c.miss&&c.say.length===3,c.name);
 const s=reset();s.debt=0;D.finale();D.hideCine();s.caseTpl=c;s.caseClue=c.clues.length;
 run('caseTrial("case")');D.trialJudge(c.culprit,c.contra.c);assert.equal(s.caseLock,c.culprit,c.name);
 D.closeModal();D.caseAccuse();btn(c.suspects[c.culprit]+'（已锁定）');
 assert.equal(s.caseResult.text,c.verdict,c.name);assert.equal(s.caseBook[0].outcome,'solved',c.name);
 const money=s.money;D.resumeGame(D.loadSave());assert.equal(D.S.money,money);assert.equal(D.S.caseResult.text,c.verdict);
 D.finishCaseResult();assert.equal(D.S.caseTpl,null,c.name);
}
for(const a of D.MAIN_ACTS){const old=baseline.main.find(x=>x.name===a.name);for(const k of ['reward','unlock','suspects','culprit','grayGain','grayInfamy'])assert.equal(JSON.stringify(a[k]),JSON.stringify(old[k]),a.name+' '+k);if(a.contra){assert.equal(a.contra.s,old.contra.s);assert.equal(a.contra.c,old.contra.c)}}
assert(!D.CASE_POOL.find(c=>c.name==='割牛舌案').verdict.includes('牵着不能耕'));
assert(D.CASE_POOL.find(c=>c.name==='灰阑争子案').clues[2].includes('三年前'));
assert(!D.CASE_POOL.find(c=>c.name==='审驴案').intro.includes('没有失主'));
assert.equal(run('ACHIEVEMENTS.find(a=>a.id==="streak").name'),'十案连破');
assert(run('NPC_SECRET.qin').includes('四贯'));
console.log('PASS 70 cases: authored opening, evidence match, verdict, reward, save/resume, archive and retirement');
console.log('PASS case identities, answers, rewards, clue counts, contradiction indices, provenance and main route rules preserved');
console.log('PASS audit copy corrections and 70 distinct wrong outcomes');
`);
