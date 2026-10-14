// v1.4.3 难度规则回归：错断无赏、证据未齐七成、排除只一次、每时段一案、第20日失约封住第五幕。
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('game.html','utf8');const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const els=new Map(),st=new Map();
const el=()=>({children:[],style:{},classList:{add(){},remove(){}},innerHTML:'',textContent:'',value:'',appendChild(x){this.children.push(x)},prepend(x){this.children.unshift(x)},removeAttribute(){},setAttribute(){},getContext(){return new Proxy({},{get:()=>()=>({})})}});
const math=Object.create(Math);math.random=()=>0.99;
const ctx=vm.createContext({console,Math:math,Set,Map,JSON,Date,Number,Array,Object,String,Boolean,URLSearchParams,localStorage:{getItem:k=>st.get(k)||null,setItem:(k,v)=>st.set(k,v),removeItem:k=>st.delete(k)},document:{getElementById(id){if(!els.has(id))els.set(id,el());return els.get(id)},createElement:el,body:el()},location:{search:''},window:{addEventListener(){}}});
vm.runInContext(code,ctx);const D=ctx.window.__dbg,run=s=>vm.runInContext(s,ctx);
const reset=()=>{D.newGame('bu');D.hideCine();D.closeModal();return D.S};
const btn=n=>{const b=els.get('m-btns').children.filter(x=>x.textContent.startsWith(n)).at(-1);assert(b,n);b.onclick()};
const act=(p)=>D.yamenActions().find(a=>String(a.name).startsWith(p));
let n=0;const test=(t,f)=>{f();n++;console.log('PASS',t)};
test('Wrong accusation pays nothing and delays next case',()=>{const s=reset();s.fame=0;const c=D.CASE_POOL[0];s.caseTpl=c;s.caseClue=c.clues.length;const m=s.money;D.caseAccuse();btn(c.suspects[(c.culprit+1)%3]);assert.equal(s.money,m);assert.equal(s.caseResult.reward,0);D.finishCaseResult();assert.equal(s.caseCooldown,2)});
test('Correct accusation with incomplete clues pays 70%',()=>{const s=reset();s.fame=0;const c=D.CASE_POOL.find(c=>c.clues.length===3);s.caseTpl=c;s.caseClue=1;const m=s.money;D.caseAccuse();btn(c.suspects[c.culprit]);assert.equal(s.money-m,Math.round(Math.round(c.reward*1.25)*0.7))});
test('Confront and Clerk Wu share one elimination',()=>{const s=reset();s.npc.shiye=40;const c=D.CASE_POOL[0];s.caseTpl=c;s.caseClue=2;assert(act('请吴师爷'));run('caseConfront()');D.closeModal();assert(!act('请吴师爷'));assert(!act('叫嫌犯当堂对质'))});
test('Only one new case per time slot even at cooldown 0',()=>{const s=reset();s.debt=0;D.finale();D.hideCine();s.fame=80;s.skill.eye=5;let a=act('接一桩小案');assert(a.can());D.doAction(a);D.closeModal();const c=s.caseTpl;D.caseAccuse();btn(c.suspects[c.culprit]);D.finishCaseResult();assert.equal(s.caseCooldown,0);assert(!act('接一桩小案').can());D.advanceSlot();assert(act('接一桩小案').can())});
test('Missing the day-20 node bars the final main act',()=>{let s=reset();s.mainAct=4;s.mainState='wait';s.mainUnlockDay=25;s.day=20;s.repaid=0;D.checkNode(20);D.closeModal();assert(s.flags.node20Miss);s.day=24;D.endDay();D.closeModal();assert.equal(s.mainState,'barred');assert(act('主线·金满堂罪证：状子递不上去'));
 s=reset();s.mainAct=4;s.mainState='wait';s.mainUnlockDay=25;s.day=24;D.endDay();D.closeModal();assert.equal(s.mainState,'ready')});
console.log(`OK ${n} difficulty rules.`);
