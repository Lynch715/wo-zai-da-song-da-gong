// 难度蒙特卡洛：用固定种子让机器人按不同打法跑完首章，统计还清率与还清日。
// 用法：node qa/balance-sim.cjs game.html <honest|careless|cmain|main|blind|yolo> [局数] [出身bu|shu|jun]
// honest＝全知、每案过堂；careless＝约两成指认看错；cmain＝careless并推主线；blind＝两条线索后排除再猜；yolo＝一条线索就乱猜。
// 机器人不行商、不入股、不走灰路，结果只反映办案与打工这条底线。
const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(process.argv[2]||'game.html','utf8').replace(/data:[a-z/+]+;base64,[A-Za-z0-9+/=]{200,}/g,'data:B64');const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const STRAT=process.argv[3]||'honest', N=+process.argv[4]||200, ORIGIN=process.argv[5]||'bu', DAYS=+process.argv[6]||30;
function mk(seed){
 let s=seed>>>0; const rnd=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296};
 const math=Object.create(Math);math.random=rnd;
 function el(){return {children:[],style:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},innerHTML:'',textContent:'',value:'',appendChild(x){this.children.push(x)},prepend(x){this.children.unshift(x)},removeAttribute(){},setAttribute(){},addEventListener(){},querySelectorAll(){return[]},querySelector(){return null},getContext(){return new Proxy({},{get:()=>()=>({})})},get firstElementChild(){return this.children[0]}}}
 const els=new Map(),st=new Map();
 const ctx=vm.createContext({console:{log(){},warn(){},error(){}},Math:math,Set,Map,JSON,Date,Number,Array,Object,String,Boolean,localStorage:{getItem:k=>st.get(k)||null,setItem:(k,v)=>st.set(k,v),removeItem:k=>st.delete(k)},document:{getElementById(id){if(!els.has(id))els.set(id,el());return els.get(id)},createElement:el,body:el(),querySelectorAll(){return[]},addEventListener(){}},location:{search:''},window:{addEventListener(){}},URLSearchParams,setTimeout(){},requestAnimationFrame(){}});
 vm.runInContext(code,ctx);return {ctx,els,run:x=>vm.runInContext(x,ctx)};
}
function play(seed){
 const {ctx,els,run}=mk(seed);const D=ctx.window.__dbg;
 D.newGame(ORIGIN);D.hideCine();D.closeModal();const S=()=>D.S;
 const btn=(pred)=>{const b=els.get('m-btns').children.filter(x=>pred(x.textContent));if(b.length){b[b.length-1].onclick();return true}return false};
 let guard=0,clearDay=null;
 while(!S().over && guard++<5000){
  const s=S();
  if(s.phase==='leisure'){ if(clearDay===null) clearDay=s.day; break; }
  if(s.day>DAYS) break;
  D.closeModal(); D.hideCine();
  // repay
  const keep=1500; const pay=Math.min(s.money-keep,s.debt); if(pay>0&&STRAT!=='hoard'){D.repay(pay);D.closeModal();D.hideCine(); if(S().phase==='leisure')continue;}
  if(STRAT==='hoard'&&s.day>=29&&s.money>=s.debt){D.repay(s.debt);continue;}
  const y=D.yamenActions(); const find=n=>y.find(a=>String(typeof a.name==='function'?a.name():a.name).startsWith(n));
  // shiye gift
  let a=find('给吴师爷'); if(a&&s.npc.shiye<30&&a.can()&&s.money>=2000){D.doAction(a);D.closeModal();}
  if(!s.ateToday&&s.stamina<70&&s.money>=1500){const h=D.ACTIONS.home[2]; if(h.can()){h.run();}}
  // main
  if((STRAT==='main'||STRAT==='cmain') && (s.mainState==='ready'||s.mainState==='active') && s.stamina>25){
    a=find('主线·'); if(a&&a.can()){ D.doAction(a); 
      const act=D.MAIN_ACTS[s.mainAct]; if(act&&act.suspects&&s.mainClue>=act.clues.length){btn(t=>t===act.suspects[act.culprit]);btn(t=>t==='退堂');}
      D.closeModal();D.hideCine();continue;}
  }
  // small case
  if(!s.caseTpl){a=find('接一桩小案'); if(a&&a.can()){a.run();D.closeModal();}}
  if(s.caseTpl&&!s.caseResult){
    const c=s.caseTpl;
    const need = STRAT==='blind'?Math.min(2,c.clues.length):STRAT==='yolo'?1:c.clues.length;
    if(s.caseClue<need && s.stamina>30 && s.slot<2+(s.stamina>60?1:0)){ run('caseClueGain(10,100,"visit")'); D.closeModal(); D.advanceSlot(); D.closeModal(); continue; }
    if(s.caseClue>=need){
      let target=c.culprit;
      if(STRAT==='yolo'){ target=Math.floor(Math.random()*3); } else if(STRAT==='blind'){ if(s.caseCleared<0&&s.stamina>8&&c.clues.length>=2) run('caseConfront()'); D.closeModal();
        a=D.yamenActions().find(x=>String(x.name).startsWith('请吴师爷')); if(a){a.run();D.closeModal();}
        const rem=[0,1,2].filter(i=>i!==s.caseCleared); 
        // after shiye, caseCleared changed; track both eliminated: approximate by knowing culprit when 2 eliminated
        target = s.caseHinted? c.culprit : rem[Math.floor(Math.random()*rem.length)];
      } else if(STRAT!=='careless'&&STRAT!=='cmain' && s.slot<2 && !s.trialDone && s.caseLock<0 && s.stamina>20){ run('caseTrial("case")'); D.trialJudge(c.contra.s,c.contra.c); D.closeModal(); D.advanceSlot(); D.closeModal(); }
      if((STRAT==='careless'||STRAT==='cmain')&&Math.random()<0.2) target=[0,1,2].filter(i=>i!==c.culprit)[Math.floor(Math.random()*2)]; D.caseAccuse(); btn(t=>t.startsWith(c.suspects[target])); D.finishCaseResult(); D.closeModal(); continue;
    }
  }
  // work
  let act=null;
  if(s.slot===2){ act = s.stamina<55? D.ACTIONS.home[0] : D.ACTIONS.market.find(x=>String(x.name).startsWith('富户护院')); }
  else if(s.stamina<35){ act=D.ACTIONS.home[1]; s.loc='home'; }
  else { act=D.ACTIONS.dock.find(x=>x.can()&&!String(x.name).includes('教拳')) || D.ACTIONS.rural.find(x=>x.name==='田头帮工'); }
  if(act&&act.can()){ D.doAction(act); } else D.advanceSlot();
  D.closeModal();D.hideCine();
 }
 const s=S();
 return {win:s.phase==='leisure', end:s.ending||s.firstEnding, day:clearDay, debt:s.debt, viol:s.stats.violations, money:s.money, solved:s.stats.casesSolved, wrong:s.stats.casesWrong, earn:s.stats.earn};
}
const res=[];for(let i=1;i<=N;i++){try{res.push(play(i*7919))}catch(e){res.push({err:e.message})}}
const errs=res.filter(r=>r.err);const ok=res.filter(r=>!r.err);
const wins=ok.filter(r=>r.win);const days=wins.map(r=>r.day).sort((a,b)=>a-b);
const avg=(a)=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length*10)/10:0;
const ends={};ok.forEach(r=>ends[r.end]=(ends[r.end]||0)+1);
console.log(STRAT,ORIGIN,'n',N,'err',errs.length,errs[0]&&errs[0].err,'| win',wins.length,'clearDay median',days[Math.floor(days.length/2)],'min',days[0],'max',days.at(-1),'| viol avg',avg(ok.map(r=>r.viol)),'| solved',avg(ok.map(r=>r.solved)),'wrong',avg(ok.map(r=>r.wrong)),'| loseDebt avg',avg(ok.filter(r=>!r.win).map(r=>r.debt)),'| ends',JSON.stringify(ends),'| earn',JSON.stringify(Object.fromEntries(Object.keys(ok[0].earn).map(k=>[k,avg(ok.map(r=>r.earn[k]))]))));
