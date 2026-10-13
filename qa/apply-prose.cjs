// 将可维护的白话母稿嵌入两个单文件入口。无浏览器、无网络依赖。
const fs=require('node:fs'), vm=require('node:vm'), assert=require('node:assert/strict');
const draft=require('../content/prose.cjs');
const html=fs.readFileSync('game.html','utf8');
const elements=new Map();
const el=()=>({children:[],style:{},classList:{add(){},remove(){}},innerHTML:'',textContent:'',value:'',appendChild(x){this.children.push(x)},prepend(x){this.children.unshift(x)},removeAttribute(){},setAttribute(){},getContext(){return new Proxy({},{get:()=>()=>{}})}});
const ctx=vm.createContext({console,Math,Set,Map,JSON,Date,Number,Array,Object,String,Boolean,URLSearchParams,
 localStorage:{getItem(){return null},setItem(){},removeItem(){}},location:{search:''},window:{addEventListener(){}},
 document:{getElementById(id){if(!elements.has(id))elements.set(id,el());return elements.get(id)},createElement:el,body:el()}});
vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],ctx);
const read=s=>JSON.parse(JSON.stringify(vm.runInContext(s,ctx)));
const pool=read('CASE_POOL'), main=read('MAIN_ACTS');
assert.equal(new Set(draft.cases.map(x=>x[0])).size,pool.length,'Every case needs one authored record');
for(const [name,intro,verdict,miss,say] of draft.cases){
 const c=pool.find(c=>c.name===name); assert(c,name); assert(intro&&verdict&&miss,name);
 Object.assign(c,{intro,verdict,miss}); if(say){assert.equal(say.length,c.suspects.length);c.say=say;}
}
const gray=pool.find(c=>c.name==='灰阑争子案');
gray.clues[2]=gray.clues[2].replace('去年','三年前');
gray.contra.text=gray.contra.text.replace('去年','三年前');
for(const [name,intro,done,say] of draft.main){const a=main.find(a=>a.name===name);assert(a);Object.assign(a,{intro,done});if(say){assert.equal(say.length,a.suspects.length);a.say=say;}}
const block='/* ================= 案件与主线：白话叙事（母稿 content/prose.cjs） ================= */\n'+
 'const CASE_POOL = '+JSON.stringify(pool.filter(c=>!c.leisureOnly),null,2)+';\n\n'+
 'const MAIN_ACTS = '+JSON.stringify(main,null,2)+';\n\n'+
 'const LEISURE_CASES = '+JSON.stringify(pool.filter(c=>c.leisureOnly),null,2)+';\nCASE_POOL.push(...LEISURE_CASES);\n\n';
const marker=html.indexOf('/* ================= 案件与主线：白话叙事');
const start=marker>=0?marker:html.indexOf('const CASE_POOL = '),end=html.indexOf('const ART = ',start);
assert(start>=0&&end>start);
let updated=html.slice(0,start)+block+html.slice(end);
for(const [id,text] of Object.entries(draft.street)){
 const pattern=new RegExp('(\\{id:'+JSON.stringify(id)+',(?:(?!\\{id:)[\\s\\S])*?text:)"(?:[^"\\\\]|\\\\.)*"');
 assert(pattern.test(updated),'Missing street event '+id);
 updated=updated.replace(pattern,(_,prefix)=>prefix+JSON.stringify(text));
}
for(const [from,to] of require('../content/dialogue.cjs')){
 const old=JSON.stringify(from).slice(1,-1), next=JSON.stringify(to).slice(1,-1);
 if(updated.includes(old)) updated=updated.split(old).join(next);
 else assert(updated.includes(next),'Missing prose replacement: '+from.slice(0,35));
}
updated=updated.replace('v1.4.1 · 临汴日常','v1.4.2 · 临汴日常');
updated=updated.replace('全部文本 ≤80 字，选项 ≤14 字。','正文按情节自然成段，选项与数值提示保持简洁。');
new vm.Script(updated.match(/<script>([\s\S]*?)<\/script>/)[1]);
fs.writeFileSync('game.html',updated);fs.writeFileSync('index.html',updated);
console.log(`Embedded ${draft.cases.length} case narratives, ${draft.main.length} main acts, ${Object.keys(draft.street).length} street events.`);
