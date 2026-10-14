// 案卷的新阅读界面必须遵守已有的信息解锁与扣费规则。
const fs=require('node:fs');
const harness=fs.readFileSync('qa/leisure-regression.cjs','utf8').split('let n=0;')[0];
eval(harness+`
function walk(el){return [el,...(el.children||[]).flatMap(walk)]}
function text(el){return walk(el).map(n=>n.textContent||'').join(' ')}
function page(id){const el=walk(elements.get('m-extra')).find(n=>n.id==='case-page-'+id);assert(el,'Missing page '+id);return el}
function notes(view){elements.get('m-extra').children=[];run('openCaseNotes('+JSON.stringify(view)+')')}
function snapshot(s){return JSON.stringify([s.money,s.stamina,s.day,s.slot,s.caseClue,s.caseAsked,s.caseProof,s.caseLock])}
for(const c of D.CASE_POOL){
 const s=reset();s.debt=0;D.finale();D.hideCine();s.caseTpl=c;s.caseClue=0;s.caseAsked=false;
 const before=snapshot(s);
 notes('evidence');assert.equal(snapshot(s),before,c.name+' free reading');
 assert(!page('evidence').hidden);assert(page('story').hidden);assert(page('testimony').hidden);
 for(const clue of c.clues)assert(!text(page('evidence')).includes(clue),c.name+' hidden clue');
 for(const say of c.say)assert(!text(page('testimony')).includes(say),c.name+' hidden testimony');
 s.caseClue=1;notes('evidence');assert(text(page('evidence')).includes(c.clues[0]));
 for(const clue of c.clues.slice(1))assert(!text(page('evidence')).includes(clue));
 s.caseClue=c.clues.length;notes('evidence');for(const clue of c.clues)assert(text(page('evidence')).includes(clue));
 s.caseAsked=true;notes('testimony');for(const say of c.say)assert(text(page('testimony')).includes(say));
 const stable=snapshot(s),tabs=walk(elements.get('m-extra')).filter(el=>el.id&&el.id.startsWith('case-tab-'));
 for(const tab of tabs)tab.onclick();assert.equal(snapshot(s),stable,c.name+' tabs do not spend resources');
}
console.log('PASS all 70 cases: free tabs, hidden clues, testimony gates and complete evidence');
const s=reset();s.debt=0;D.finale();D.hideCine();s.caseTpl=D.LEISURE_CASES[0];s.stamina=100;s.caseAsked=false;
notes('testimony');const ask=walk(page('testimony')).find(el=>el.textContent==='提审问话');assert(ask);ask.onclick();
assert.equal(s.stamina,95);assert(s.caseAsked);assert.equal(s.slot,0);
run('caseAsk()');assert.equal(s.stamina,95);assert.equal(s.slot,0);
console.log('PASS first questioning spends five stamina; reopening does not charge or advance time');
s.caseClue=1;assert.equal(run('actionGroup(yamenActions().find(a=>String(a.name).startsWith("提前指认")))'),'assist');
console.log('PASS early accusation remains available in the auxiliary fold');
`);
