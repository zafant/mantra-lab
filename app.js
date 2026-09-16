const demoPlayers=[
{id:"p1",name:"Lautaro Martínez",team:"INT",classic:"A",roles:["Pc"],price:38},
{id:"p2",name:"Marcus Thuram",team:"INT",classic:"A",roles:["Pc"],price:30},
{id:"p3",name:"Federico Dimarco",team:"INT",classic:"D",roles:["E","W"],price:30},
{id:"p4",name:"Hakan Çalhanoğlu",team:"INT",classic:"C",roles:["M","C"],price:28},
{id:"p5",name:"Nicolò Barella",team:"INT",classic:"C",roles:["M","C"],price:26},
{id:"p6",name:"Alessandro Bastoni",team:"INT",classic:"D",roles:["Dc"],price:24},
{id:"p7",name:"Benjamin Pavard",team:"INT",classic:"D",roles:["Dc","B"],price:20},
{id:"p8",name:"Carlos Augusto",team:"INT",classic:"D",roles:["Ds","E"],price:18},
{id:"p9",name:"Christian Pulisic",team:"MIL",classic:"C",roles:["W","A"],price:27},
{id:"p10",name:"Rafael Leão",team:"MIL",classic:"A",roles:["W","A"],price:31},
{id:"p11",name:"Matteo Gabbia",team:"MIL",classic:"D",roles:["Dc"],price:10},
{id:"p12",name:"Luka Modrić",team:"MIL",classic:"C",roles:["M","C"],price:15},
{id:"p13",name:"Riccardo Orsolini",team:"BOL",classic:"C",roles:["W","A"],price:19},
{id:"p14",name:"Nico Paz",team:"COM",classic:"C",roles:["T","C"],price:25},
{id:"p15",name:"Mattia Zaccagni",team:"LAZ",classic:"C",roles:["W","A"],price:24},
{id:"p16",name:"Moisés Caicedo",team:"CHE",classic:"C",roles:["M","C"],price:17},
{id:"p17",name:"Bremer",team:"JUV",classic:"D",roles:["Dc"],price:22},
{id:"p18",name:"Andrea Cambiaso",team:"JUV",classic:"D",roles:["E","W"],price:20},
{id:"p19",name:"Kenan Yıldız",team:"JUV",classic:"A",roles:["T","A"],price:25},
{id:"p20",name:"Mike Maignan",team:"MIL",classic:"P",roles:["Por"],price:18},
{id:"p21",name:"Alex Meret",team:"NAP",classic:"P",roles:["Por"],price:10},
{id:"p22",name:"Scott McTominay",team:"NAP",classic:"C",roles:["M","C"],price:19},
{id:"p23",name:"Rasmus Højlund",team:"NAP",classic:"A",roles:["Pc"],price:22},
{id:"p24",name:"Gianluca Mancini",team:"ROM",classic:"D",roles:["Dc"],price:14},
{id:"p25",name:"Paulo Dybala",team:"ROM",classic:"A",roles:["T","A"],price:20}
];

const modules={
"3-4-3":[["Por"],["Dc","Dc","Dc"],["E","M","M","E"],["W","A","Pc"]],
"3-4-1-2":[["Por"],["Dc","Dc","Dc"],["E","M","M","E"],["T"],["A","Pc"]],
"3-4-2-1":[["Por"],["Dc","Dc","Dc"],["E","M","M","E"],["T","T"],["Pc"]],
"3-5-2":[["Por"],["Dc","Dc","Dc"],["E","M","C","M","E"],["A","Pc"]],
"3-5-1-1":[["Por"],["Dc","Dc","Dc"],["E","M","C","M","E"],["T"],["Pc"]],
"4-3-3":[["Por"],["Dd","Dc","Dc","Ds"],["M","C","M"],["W","A","Pc"]],
"4-3-1-2":[["Por"],["Dd","Dc","Dc","Ds"],["M","C","M"],["T"],["A","Pc"]],
"4-4-2":[["Por"],["Dd","Dc","Dc","Ds"],["E","M","M","E"],["A","Pc"]],
"4-4-1-1":[["Por"],["Dd","Dc","Dc","Ds"],["E","M","M","E"],["T"],["Pc"]],
"4-2-3-1":[["Por"],["Dd","Dc","Dc","Ds"],["M","M"],["W","T","W"],["Pc"]],
"4-1-4-1":[["Por"],["Dd","Dc","Dc","Ds"],["M"],["E","C","C","E"],["Pc"]]
};
const classicModules={"4-3-3":[["P"],["D","D","D","D"],["C","C","C"],["A","A","A"]],"4-4-2":[["P"],["D","D","D","D"],["C","C","C","C"],["A","A"]],"3-4-3":[["P"],["D","D","D"],["C","C","C","C"],["A","A","A"]],"3-5-2":[["P"],["D","D","D"],["C","C","C","C","C"],["A","A"]]};

let players=JSON.parse(localStorage.getItem("ml_players")||"null")||demoPlayers;
let selected=new Set(JSON.parse(localStorage.getItem("ml_selected")||"[]"));
let mode="mantra", moduleName="3-4-3", assignments={};

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function save(){localStorage.setItem("ml_selected",JSON.stringify([...selected]));localStorage.setItem("ml_players",JSON.stringify(players))}
function currentModules(){return mode==="mantra"?modules:classicModules}
function currentModule(){return currentModules()[moduleName]||Object.keys(currentModules())[0]}
function getPlayer(id){return players.find(p=>p.id===id)}
function initials(n){return n.split(" ").slice(0,2).map(x=>x[0]).join("").toUpperCase()}
function roleMatch(p,required){
 if(mode==="classic") return p.classic===required;
 return p.roles?.includes(required);
}
function bestPlayerForSlot(req, used){
 const pool=players.filter(p=>selected.has(p.id)&&!used.has(p.id)&&roleMatch(p,req));
 return pool.sort((a,b)=>a.roles.length-b.roles.length)[0]||null;
}
function buildAssignment(){
 assignments={};const used=new Set();const rows=currentModule();
 rows.flat().forEach((req,i)=>{const p=bestPlayerForSlot(req,used);if(p){assignments[i]={req,p};used.add(p.id)}else assignments[i]={req,p:null}});
}
function renderModuleOptions(){
 const sel=$("#moduleSelect");sel.innerHTML="";
 Object.keys(currentModules()).forEach(m=>{const o=document.createElement("option");o.value=m;o.textContent=m;if(m===moduleName)o.selected=true;sel.appendChild(o)});
}
function renderPlayers(){
 const q=$("#playerSearch").value.toLowerCase();
 const list=players.filter(p=>(p.name+" "+p.team+" "+p.roles.join(" ")+" "+p.classic).toLowerCase().includes(q));
 $("#playerList").innerHTML=list.map(p=>`<div class="player ${selected.has(p.id)?"selected":""}" data-id="${p.id}">
 <div class="avatar">${initials(p.name)}</div><div class="pinfo"><div class="pname">${p.name}</div><div class="pmeta">${p.team} · ${mode==="mantra"?p.roles.join(" / "):p.classic}</div></div><div class="roles">${p.price}</div></div>`).join("");
 $$(".player").forEach(el=>{
   el.draggable=true;
   el.addEventListener("dragstart",e=>{e.dataTransfer.setData("text/player",el.dataset.id);e.dataTransfer.effectAllowed="copy"});
   el.addEventListener("click",()=>{
     const id=el.dataset.id;
     if(selected.has(id)){ window.__dragPlayerId=id; document.body.classList.add("placing-player"); }
     else { selected.add(id); window.__dragPlayerId=id; save(); renderAll(); document.body.classList.add("placing-player"); }
   });
 });
 $("#squadCount").textContent=selected.size;$("#heroPlayers").textContent=selected.size;$("#selectedSummary").textContent=`${selected.size} giocatori`;
}
function renderPitch(){
 buildAssignment();
 const rows=currentModule();
 const pos=[[88],[69,69,69,69],[47,47,47,47,47],[25,25,25,25]];
 let html="",idx=0;
 rows.forEach((row,ri)=>{
   const y=pos[ri]||25;
   row.forEach((req,j)=>{
     const x=row.length===1?50:15+(70*j/(row.length-1));
     const a=assignments[idx++];
     const p=a.p;
     html+=`<div class="slot ${p?"filled":"empty"}" data-slot="${idx-1}" data-req="${req}" style="left:${x}%;top:${y}%">
       <div class="slot-card" draggable="${!!p}" data-player="${p?p.id:""}">
         <div class="slot-avatar">${p?initials(p.name):"+"}</div>
         <div class="slot-name">${p?p.name:"Inserisci "+req}</div>
         <div class="slot-role">${p?(mode==="mantra"?p.roles.join(" / "):p.classic):req}</div>
       </div>
     </div>`;
   });
 });
 $("#pitch").innerHTML=html;

 const pitch=$("#pitch");
 $$(".slot").forEach(slot=>{
   slot.addEventListener("dragover",e=>{e.preventDefault();slot.classList.add("drag-over")});
   slot.addEventListener("dragleave",()=>slot.classList.remove("drag-over"));
   slot.addEventListener("drop",e=>{
     e.preventDefault(); slot.classList.remove("drag-over");
     const id=e.dataTransfer.getData("text/player");
     if(id) placePlayerOnSlot(id, Number(slot.dataset.slot));
   });
   slot.addEventListener("click",()=>{
     const selectedId=window.__dragPlayerId;
     if(selectedId) { placePlayerOnSlot(selectedId, Number(slot.dataset.slot)); window.__dragPlayerId=null; }
   });
 });
 $$(".slot-card[draggable='true']").forEach(card=>{
   card.addEventListener("dragstart",e=>{
     e.dataTransfer.setData("text/player",card.dataset.player);
     e.dataTransfer.effectAllowed="move";
   });
 });
 const missing=Object.values(assignments).filter(x=>!x.p);
 const pill=$("#statusPill");
 pill.className="status "+(missing.length?"warn":"good");
 pill.textContent=missing.length?`${missing.length} posizioni scoperte`:"Modulo coperto";

 const chips=[...selected].map(id=>getPlayer(id)).filter(Boolean).map(p=>
   `<button class="chip player-chip" draggable="true" data-player="${p.id}">${p.name}<span>${mode==="mantra"?p.roles.join("/"):p.classic}</span></button>`
 ).join("");
 $("#benchChips").innerHTML=chips||'<span class="chip">Nessun giocatore selezionato</span>';
 $$(".player-chip").forEach(chip=>{
   chip.addEventListener("dragstart",e=>{
     e.dataTransfer.setData("text/player",chip.dataset.player);
     e.dataTransfer.effectAllowed="move";
   });
   chip.addEventListener("click",()=>{window.__dragPlayerId=chip.dataset.player; document.body.classList.add("placing-player");});
 });
}

function placePlayerOnSlot(id, slotIndex){
 const p=getPlayer(id), rows=currentModule();
 if(!p || !selected.has(id)) return;
 let slot=0;
 let targetReq=null;
 for(const row of rows) for(const req of row){ if(slot===slotIndex) targetReq=req; slot++; }
 if(!roleMatch(p,targetReq)){
   $("#statusPill").className="status warn";
   $("#statusPill").textContent=`${p.name}: ruolo ${targetReq} non coperto`;
   return;
 }
 // Rebuild assignment while forcing the requested player into the target slot.
 // Other players are then filled around it using the normal matcher.
 const oldSelected=new Set(selected);
 assignments={}; const used=new Set([id]);
 assignments[slotIndex]={req:targetReq,p};
 rows.flat().forEach((req,i)=>{
   if(i===slotIndex) return;
   const candidate=bestPlayerForSlot(req,used);
   if(candidate){ assignments[i]={req,p:candidate}; used.add(candidate.id); }
   else assignments[i]={req,p:null};
 });
 window.__manualAssignments=assignments;
 renderPitchFromAssignments();
}

function renderPitchFromAssignments(){
 const rows=currentModule(), pos=[[88],[69,69,69,69],[47,47,47,47,47],[25,25,25,25]];
 let html="",idx=0;
 rows.forEach((row,ri)=>{
   const y=pos[ri]||25;
   row.forEach((req,j)=>{
     const x=row.length===1?50:15+(70*j/(row.length-1));
     const a=assignments[idx]||{req,p:null}, p=a.p;
     html+=`<div class="slot ${p?"filled":"empty"}" data-slot="${idx}" data-req="${req}" style="left:${x}%;top:${y}%">
       <div class="slot-card" draggable="${!!p}" data-player="${p?p.id:""}">
         <div class="slot-avatar">${p?initials(p.name):"+"}</div>
         <div class="slot-name">${p?p.name:"Inserisci "+req}</div>
         <div class="slot-role">${p?(mode==="mantra"?p.roles.join(" / "):p.classic):req}</div>
       </div>
     </div>`;
     idx++;
   });
 });
 $("#pitch").innerHTML=html;
 $$(".slot").forEach(slot=>{
   slot.addEventListener("dragover",e=>{e.preventDefault();slot.classList.add("drag-over")});
   slot.addEventListener("dragleave",()=>slot.classList.remove("drag-over"));
   slot.addEventListener("drop",e=>{e.preventDefault();slot.classList.remove("drag-over");const id=e.dataTransfer.getData("text/player");if(id)placePlayerOnSlot(id,Number(slot.dataset.slot))});
   slot.addEventListener("click",()=>{const id=window.__dragPlayerId;if(id){placePlayerOnSlot(id,Number(slot.dataset.slot));window.__dragPlayerId=null;document.body.classList.remove("placing-player")}});
 });
 $$(".slot-card[draggable='true']").forEach(card=>card.addEventListener("dragstart",e=>e.dataTransfer.setData("text/player",card.dataset.player)));
}
function renderCoverage(){
 const required=currentModule().flat();const unique=[...new Set(required)];
 let html=unique.map(r=>{const need=required.filter(x=>x===r).length;const have=[...selected].map(getPlayer).filter(p=>p&&roleMatch(p,r)).length;const pct=Math.min(100,have/need*100);const cls=pct>=100?"":pct>=50?"warn":"bad";return `<div class="coverage-row"><div class="cov-top"><span>${r}</span><b>${have}/${need}</b></div><div class="cov-bar"><div class="cov-fill ${cls}" style="width:${pct}%"></div></div></div>`}).join("");
 $("#coverage").innerHTML=html;
 const missing=Object.values(assignments).filter(x=>!x.p).map(x=>x.req);
 const tips=missing.length?`Ti mancano ${missing.length} slot. Cerca nel listone un profilo compatibile con: <b>${[...new Set(missing)].join(", ")}</b>.`:`La rosa copre tutte le posizioni di questo schema. Prova un altro modulo per confrontare la flessibilità.`;
 $("#tipBox").innerHTML=`<b>💡 Suggerimento</b><p>${tips}</p>`;
 $("#moduleTitle").textContent=moduleName;
}
function renderSquad(){
 $("#squadGrid").innerHTML=[...selected].map(id=>getPlayer(id)).filter(Boolean).sort((a,b)=>a.classic.localeCompare(b.classic)).map(p=>`<div class="squad-card card"><h3>${p.name}</h3><p>${p.team} · Quotazione demo ${p.price}</p><div class="role-tags"><span class="role-tag">${p.classic}</span>${p.roles.map(r=>`<span class="role-tag">${r}</span>`).join("")}</div></div>`).join("")||`<div class="card squad-card"><h3>Rosa vuota</h3><p>Vai nel Builder e aggiungi i giocatori.</p></div>`;
}
function renderAll(){
  renderPlayers();
  if(window.__manualAssignments){ assignments=window.__manualAssignments; renderPitchFromAssignments(); }
  else renderPitch();
  renderCoverage();
  renderSquad();
}
function findFormation(){let best=[];Object.keys(currentModules()).forEach(m=>{const old=moduleName;moduleName=m;buildAssignment();const miss=Object.values(assignments).filter(x=>!x.p).length;best.push({m,miss});moduleName=old});best.sort((a,b)=>a.miss-b.miss);moduleName=best[0].m;$("#moduleSelect").value=moduleName;renderAll()}
$$(".nav-btn").forEach(b=>b.onclick=()=>{ $$(".nav-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");$$(".view").forEach(v=>v.classList.add("hidden"));$("#"+b.dataset.view+"View").classList.remove("hidden")});
$$(".mode").forEach(b=>b.onclick=()=>{mode=b.dataset.mode;$$(".mode").forEach(x=>x.classList.toggle("active",x===b));moduleName=Object.keys(currentModules())[0];window.__manualAssignments=null;renderModuleOptions();renderAll()});
$("#moduleSelect").onchange=e=>{moduleName=e.target.value;window.__manualAssignments=null;renderAll()};
$("#playerSearch").oninput=renderPlayers;$("#clearSearch").onclick=()=>{$("#playerSearch").value="";renderPlayers};$("#autoBtn").onclick=findFormation;
$("#resetSquad").onclick=()=>{if(confirm("Svuotare la rosa virtuale?")){selected.clear();save();renderAll()}};
$("#exportBtn").onclick=()=>{const data=JSON.stringify({players,selected:[...selected]},null,2);const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([data],{type:"application/json"}));a.download="mantra-lab-rosa.json";a.click();URL.revokeObjectURL(a.href)};
$("#importInput").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const txt=r.result;if(f.name.toLowerCase().endsWith(".csv")){const lines=txt.split(/\r?\n/).filter(Boolean);const head=lines.shift().split(",").map(x=>x.trim().toLowerCase());players=lines.map((line,i)=>{const c=line.split(",").map(x=>x.trim());const o={};head.forEach((h,j)=>o[h]=c[j]||"");return{id:o.id||"imp"+i,name:o.name,team:o.team||"",classic:o.classic||"",roles:(o.roles||"").split("|").filter(Boolean),price:Number(o.price)||0}}).filter(x=>x.name)}else{const d=JSON.parse(txt);if(Array.isArray(d.players))players=d.players;if(Array.isArray(d.selected))selected=new Set(d.selected)}save();renderAll()}catch(err){alert("File non valido. Usa JSON esportato da Mantra Lab o CSV con colonne: name,team,classic,roles,price")}};r.readAsText(f)};
renderModuleOptions();renderAll();

document.getElementById("shuffleBtn")?.addEventListener("click",()=>{
 const names=Object.keys(currentModules()), i=names.indexOf(moduleName);
 moduleName=names[(i+1)%names.length]; window.__manualAssignments=null;
 document.getElementById("moduleSelect").value=moduleName;
 renderAll();
});

\n// PWA/offline shell
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
