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
"3-4-3":[["Por"],["Dc","Dc","Dc/B"],["E","M/C","C","E"],["W/A","W/A","A/Pc"]],
"3-4-1-2":[["Por"],["Dc","Dc","Dc/B"],["E","M/C","C","E"],["T"],["A/Pc","A/Pc"]],
"3-4-2-1":[["Por"],["Dc","Dc","Dc/B"],["M","M/C","E/W","E"],["T","T/A"],["A/Pc"]],
"3-5-2":[["Por"],["Dc","Dc","Dc/B"],["E/W","M/C","M","C","E"],["A/Pc","A/Pc"]],
"3-5-1-1":[["Por"],["Dc","Dc","Dc/B"],["E/W","M","C","M","E/W"],["T/A"],["A/Pc"]],
"4-3-3":[["Por"],["Dd","Dc","Dc","Ds"],["M/C","M","C"],["W/A","W/A","A/Pc"]],
"4-3-1-2":[["Por"],["Dd","Dc","Dc","Ds"],["M/C","M","C"],["T"],["T/A/Pc","A/Pc"]],
"4-4-2":[["Por"],["Dd","Dc","Dc","Ds"],["M/C","C","E","E/W"],["A/Pc","A/Pc"]],
"4-4-1-1":[["Por"],["Dd","Dc","Dc","Ds"],["M","C"],["E/W","E/W"],["T/A"],["A/Pc"]],
"4-2-3-1":[["Por"],["Dd","Dc","Dc","Ds"],["M","M/C"],["W/T","T","W/A"],["A/Pc"]],
"4-1-4-1":[["Por"],["Dd","Dc","Dc","Ds"],["M"],["C/T","T","E/W","W"],["A/Pc"]]
};
const classicModules={"4-3-3":[["P"],["D","D","D","D"],["C","C","C"],["A","A","A"]],"4-4-2":[["P"],["D","D","D","D"],["C","C","C","C"],["A","A"]],"3-4-3":[["P"],["D","D","D"],["C","C","C","C"],["A","A","A"]],"3-5-2":[["P"],["D","D","D"],["C","C","C","C","C"],["A","A"]]};

let players=JSON.parse(localStorage.getItem("ml_players")||"null")||demoPlayers;
let selected=new Set(JSON.parse(localStorage.getItem("ml_selected")||"[]"));
let mode="mantra",moduleName="3-4-3",assignments={},showSelectedOnly=false;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
selected=new Set([...selected].filter(id=>players.some(p=>p.id===id)).slice(0,30));

function save(){localStorage.setItem("ml_players",JSON.stringify(players));localStorage.setItem("ml_selected",JSON.stringify([...selected]));}
function currentModules(){return mode==="mantra"?modules:classicModules;}
function currentModule(){return currentModules()[moduleName]||Object.keys(currentModules())[0];}
function getPlayer(id){return players.find(p=>p.id===id);}
function initials(name){return name.split(" ").slice(0,2).map(x=>x[0]).join("").toUpperCase();}
function rolesOf(p){return mode==="mantra"?(p.roles||[]):[p.classic];}
function alternatives(req){return String(req).split("/").map(x=>x.trim()).filter(Boolean);}
function roleMatch(p,req){return alternatives(req).some(r=>rolesOf(p).includes(r));}
function score(p,req){const roles=rolesOf(p),matched=alternatives(req).some(r=>roles.includes(r));return matched?(4-roles.length)+(Number(p.price)||0)/1000:999;}
function toast(msg){const el=$("#appToast");if(!el)return;el.textContent=msg;el.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove("show"),2200);}
function saveAndRender(){save();window.__manualAssignments=null;renderAll();}

function solveModule(name){
  const required=(currentModules()[name]||[]).flat(),pool=players.filter(p=>selected.has(p.id));
  const slots=required.map((req,index)=>({req,index,players:pool.filter(p=>roleMatch(p,req)).sort((a,b)=>score(a,req)-score(b,req))})).sort((a,b)=>a.players.length-b.players.length);
  const used=new Set(),result={};
  function dfs(i){
    if(i===slots.length)return true;
    const slot=slots[i];
    for(const p of slot.players){
      if(used.has(p.id))continue;
      used.add(p.id);result[slot.index]={req:slot.req,p};
      if(dfs(i+1))return true;
      used.delete(p.id);delete result[slot.index];
    }
    return false;
  }
  const complete=dfs(0);
  if(!complete){
    used.clear();
    for(const slot of slots){const p=slot.players.find(x=>!used.has(x.id));result[slot.index]={req:slot.req,p:p||null};if(p)used.add(p.id);}
  }
  const solved=required.map((req,i)=>result[i]||{req,p:null});
  return {complete,assignments:solved,missing:solved.filter(x=>!x.p).map(x=>x.req),coverage:Math.round(solved.filter(x=>x.p).length/required.length*100)};
}
function analyzeAllModules(){return Object.keys(currentModules()).map(name=>{const s=solveModule(name);return{module:name,...s,total:s.assignments.length,covered:s.assignments.filter(x=>x.p).length};}).sort((a,b)=>b.coverage-a.coverage||a.missing.length-b.missing.length||a.module.localeCompare(b.module));}
function rowY(n){return n<=4?[86,62,38,16].slice(0,n):[88,69,51,33,16].slice(0,n);}
function miniClass(label){const r=alternatives(label)[0].toLowerCase();if(["por","p"].includes(r))return"gk";if(["dd","ds","dc","b","d"].includes(r))return"def";if(["e","m","c"].includes(r))return"mid";if(["t","w"].includes(r))return"treq";return"att";}

function renderModuleOptions(){
  const el=$("#moduleSelect");el.innerHTML="";
  Object.keys(currentModules()).forEach(name=>{const o=document.createElement("option");o.value=name;o.textContent=name;o.selected=name===moduleName;el.appendChild(o);});
}
function renderModuleGallery(results){
  const grid=$("#moduleGrid");if(!grid)return;
  const map=new Map(results.map(r=>[r.module,r])),names=Object.keys(currentModules());
  grid.innerHTML=names.map(name=>{
    const rows=currentModules()[name],res=map.get(name),ys=rowY(rows.length);let slots="";
    rows.forEach((row,ri)=>row.forEach((req,j)=>{const x=row.length===1?50:12+76*j/(row.length-1);slots+=`<span class="mini-slot ${miniClass(req)}" style="left:${x}%;top:${ys[ri]||16}%">${req}</span>`;}));
    return `<button type="button" class="module-card ${name===moduleName?"active":""} ${res.complete?"complete":""}" data-module="${name}">
      <div class="module-card-title"><strong>${name}</strong><span>${res.coverage}%</span></div>
      <div class="mini-pitch">${slots}<i class="mini-center-line"></i></div>
      <div class="module-card-foot"><span>${res.complete?"✓ Modulo coperto":`Manca ${res.missing.length} slot`}</span><em>${res.covered}/11</em></div>
    </button>`;
  }).join("");
  $$(".module-card").forEach(el=>el.addEventListener("click",()=>{moduleName=el.dataset.module;window.__manualAssignments=null;$("#moduleSelect").value=moduleName;renderAll();}));
  $("#compatibleCount").textContent=results.filter(r=>r.complete).length;
  $("#heroModules").textContent=names.length;
}

function renderPlayers(){
  const q=$("#playerSearch").value.toLowerCase();
  let list=players.filter(p=>(p.name+" "+p.team+" "+(p.roles||[]).join(" ")+" "+p.classic).toLowerCase().includes(q));
  if(showSelectedOnly)list=list.filter(p=>selected.has(p.id));
  $("#visibleCount").textContent=`${list.length} visibili`;
  $("#playerList").innerHTML=list.map(p=>`<button type="button" class="player ${selected.has(p.id)?"selected":""}" data-id="${p.id}" aria-pressed="${selected.has(p.id)}">
    <span class="selection-mark">${selected.has(p.id)?"✓":"+"}</span><span class="avatar">${initials(p.name)}</span>
    <span class="pinfo"><span class="pname">${p.name}</span><span class="pmeta">${p.team} · ${mode==="mantra"?(p.roles||[]).join(" / "):p.classic}</span></span><span class="roles">${p.price||"—"}</span>
  </button>`).join("")||`<div class="empty-list">${showSelectedOnly?"Nessun giocatore selezionato.":"Nessun giocatore trovato."}</div>`;
  $$(".player").forEach(el=>{el.draggable=true;el.addEventListener("dragstart",e=>{e.dataTransfer.setData("text/player",el.dataset.id);e.dataTransfer.effectAllowed="copy";});el.addEventListener("click",()=>toggleSelection(el.dataset.id));});
  $("#squadCount").textContent=`${selected.size}/30`;$("#heroPlayers").textContent=`${selected.size}/30`;$("#heroListone").textContent=players.length;$("#rosterCount").textContent=selected.size;
  $("#selectedSummary").textContent=`${selected.size} / 30 giocatori`;$("#selectionHint").textContent=selected.size>=30?"Rosa completa":selected.size?`${30-selected.size} slot disponibili`:"Seleziona dal listone";
  $("#listMeta").textContent=`${players.length} giocatori · max 30 in rosa`;
  $("#allPlayersBtn").classList.toggle("active",!showSelectedOnly);$("#selectedPlayersBtn").classList.toggle("active",showSelectedOnly);
}
function toggleSelection(id){
  if(selected.has(id)){selected.delete(id);window.__dragPlayerId=null;}
  else{if(selected.size>=30){toast("Rosa completa: massimo 30 giocatori.");return;}selected.add(id);window.__dragPlayerId=id;document.body.classList.add("placing-player");}
  saveAndRender();
}
function renderPitch(){const solved=solveModule(moduleName);assignments=window.__manualAssignments||solved.assignments;renderPitchFromAssignments();}
function bindSlots(){
  $$(".slot").forEach(slot=>{
    slot.addEventListener("dragover",e=>{e.preventDefault();slot.classList.add("drag-over");});
    slot.addEventListener("dragleave",()=>slot.classList.remove("drag-over"));
    slot.addEventListener("drop",e=>{e.preventDefault();slot.classList.remove("drag-over");const id=e.dataTransfer.getData("text/player");if(id)placePlayerOnSlot(id,+slot.dataset.slot);});
    slot.addEventListener("click",()=>{const id=window.__dragPlayerId;if(id){placePlayerOnSlot(id,+slot.dataset.slot);window.__dragPlayerId=null;document.body.classList.remove("placing-player");}});
  });
  $$(".slot-card[draggable='true']").forEach(card=>card.addEventListener("dragstart",e=>{e.dataTransfer.setData("text/player",card.dataset.player);e.dataTransfer.effectAllowed="move";}));
}
function renderPitchFromAssignments(){
  const rows=currentModule(),ys=rowY(rows.length);let html="",idx=0;
  rows.forEach((row,ri)=>row.forEach((req,j)=>{const x=row.length===1?50:15+70*j/(row.length-1),a=assignments[idx]||{req,p:null},p=a.p;
    html+=`<div class="slot ${p?"filled":"empty"}" data-slot="${idx}" data-req="${req}" style="left:${x}%;top:${ys[ri]||16}%"><div class="slot-card" draggable="${!!p}" data-player="${p?p.id:""}"><div class="slot-avatar">${p?initials(p.name):"＋"}</div><div class="slot-name">${p?p.name:"Inserisci"}</div><div class="slot-role">${p?(mode==="mantra"?(p.roles||[]).join(" / "):p.classic):req}</div></div></div>`;idx++;
  }));
  $("#pitch").innerHTML=html;bindSlots();
  const missing=assignments.filter(x=>!x.p),pill=$("#statusPill");pill.className="status "+(missing.length?"warn":"good");pill.textContent=missing.length?`${missing.length} posizioni scoperte`:"Modulo coperto";
  const chips=[...selected].map(getPlayer).filter(Boolean).map(p=>`<button type="button" class="chip player-chip" draggable="true" data-player="${p.id}">${p.name}<span>${mode==="mantra"?(p.roles||[]).join("/"):p.classic}</span></button>`).join("");$("#benchChips").innerHTML=chips||'<span class="chip">Nessun giocatore selezionato</span>';
  $$(".player-chip").forEach(chip=>{chip.addEventListener("dragstart",e=>{e.dataTransfer.setData("text/player",chip.dataset.player);e.dataTransfer.effectAllowed="move";});chip.addEventListener("click",()=>{window.__dragPlayerId=chip.dataset.player;document.body.classList.add("placing-player");});});
}
function placePlayerOnSlot(id,slotIndex){
  const p=getPlayer(id),required=currentModule().flat(),req=required[slotIndex];if(!p||!selected.has(id))return;
  if(!roleMatch(p,req)){toast(`${p.name}: non compatibile con ${req}`);return;}
  const pool=players.filter(x=>selected.has(x.id)&&x.id!==id),slots=required.map((r,index)=>({r,index,players:pool.filter(x=>roleMatch(x,r)).sort((a,b)=>score(a,r)-score(b,r))})).filter(x=>x.index!==slotIndex).sort((a,b)=>a.players.length-b.players.length),used=new Set([id]),result={[slotIndex]:{req,p}};
  function dfs(i){if(i===slots.length)return true;const s=slots[i];for(const candidate of s.players){if(used.has(candidate.id))continue;used.add(candidate.id);result[s.index]={req:s.r,p:candidate};if(dfs(i+1))return true;used.delete(candidate.id);delete result[s.index];}return false;}
  dfs(0);window.__manualAssignments=required.map((r,i)=>result[i]||{req:r,p:null});assignments=window.__manualAssignments;renderPitchFromAssignments();renderCoverage();
}
function renderCoverage(){
  const required=currentModule().flat(),unique=[...new Set(required)];
  $("#coverage").innerHTML=unique.map(r=>{const need=required.filter(x=>x===r).length,have=[...selected].map(getPlayer).filter(p=>p&&roleMatch(p,r)).length,pct=Math.min(100,have/need*100),cls=pct>=100?"":pct>=50?"warn":"bad";return `<div class="coverage-row"><div class="cov-top"><span>${r}</span><b>${have}/${need}</b></div><div class="cov-bar"><div class="cov-fill ${cls}" style="width:${pct}%"></div></div></div>`;}).join("");
  const missing=assignments.filter(x=>!x.p).map(x=>x.req);$("#tipBox").innerHTML=`<b>💡 Suggerimento</b><p>${missing.length?`Ti mancano ${missing.length} slot: <b>${[...new Set(missing)].join(", ")}</b>.`:"La rosa copre tutte le posizioni di questo schema. Confronta gli altri moduli sopra."}</p>`;
  $("#moduleTitle").textContent=moduleName;$("#moduleSubtitle").textContent=`${currentModule().flat().length} slot · ${selected.size} giocatori disponibili`;
}
function renderFormationAnalysis(results){
  const box=$("#formationResults");box.innerHTML=results.map((r,i)=>`<button type="button" class="formation-card ${r.module===moduleName?"active":""}" data-formation="${r.module}">
    <div class="formation-rank">${String(i+1).padStart(2,"0")}</div><div class="formation-main"><strong>${r.module}</strong><span>${r.complete?"COMPATIBILE":"PARZIALE"}</span>${r.complete?`<div class="formation-ok">✓ 11/11 posizioni coperte</div>`:`<div class="formation-missing">Manca: ${[...new Set(r.missing)].join(" · ")}</div>`}</div><div class="formation-pct">${r.coverage}%</div>
  </button>`).join("")||`<div class="empty-analysis">Aggiungi giocatori per analizzare la rosa.</div>`;
  $$(".formation-card").forEach(el=>el.addEventListener("click",()=>{moduleName=el.dataset.formation;window.__manualAssignments=null;$("#moduleSelect").value=moduleName;renderAll();}));
}
function renderSquad(){$("#squadGrid").innerHTML=[...selected].map(getPlayer).filter(Boolean).map(p=>`<div class="squad-card card"><h3>${p.name}</h3><p>${p.team} · Quotazione demo ${p.price}</p><div class="role-tags"><span class="role-tag">${p.classic}</span>${(p.roles||[]).map(r=>`<span class="role-tag">${r}</span>`).join("")}</div></div>`).join("")||`<div class="card squad-card"><h3>Rosa vuota</h3><p>Vai nel Builder e aggiungi i giocatori.</p></div>`;}
function renderAll(){renderPlayers();renderPitch();renderCoverage();renderSquad();const results=analyzeAllModules();renderFormationAnalysis(results);renderModuleGallery(results);}
function findFormation(){const results=analyzeAllModules();if(!results.length)return;moduleName=results[0].module;window.__manualAssignments=null;$("#moduleSelect").value=moduleName;renderAll();toast(results[0].complete?`${results[0].module}: formazione completa`:`Miglior copertura trovata: ${results[0].module}`);}

$$('.nav-btn').forEach(b=>b.addEventListener('click',()=>{$$('.nav-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');$$('.view').forEach(v=>v.classList.add('hidden'));$("#"+b.dataset.view+"View").classList.remove('hidden');}));
$$('.mode').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;$$('.mode').forEach(x=>x.classList.toggle('active',x===b));moduleName=Object.keys(currentModules())[0];window.__manualAssignments=null;renderModuleOptions();renderAll();}));
$("#moduleSelect").addEventListener("change",e=>{moduleName=e.target.value;window.__manualAssignments=null;renderAll();});
$("#playerSearch").addEventListener("input",renderPlayers);
$("#clearSearch").addEventListener("click",()=>{$("#playerSearch").value="";renderPlayers();});
$("#allPlayersBtn").addEventListener("click",()=>{showSelectedOnly=false;renderPlayers();});
$("#selectedPlayersBtn").addEventListener("click",()=>{showSelectedOnly=true;renderPlayers();});
$("#selectVisibleBtn").addEventListener("click",()=>{const q=$("#playerSearch").value.toLowerCase(),visible=players.filter(p=>(p.name+" "+p.team+" "+(p.roles||[]).join(" ")+" "+p.classic).toLowerCase().includes(q));let added=0;for(const p of visible){if(selected.has(p.id))continue;if(selected.size>=30)break;selected.add(p.id);added++;}if(selected.size>=30&&added===0)toast("Rosa completa: massimo 30 giocatori.");saveAndRender();});
$("#clearSelectionBtn").addEventListener("click",()=>{selected.clear();saveAndRender();});
$("#autoBtn").addEventListener("click",findFormation);
$("#shuffleBtn").addEventListener("click",()=>{const names=Object.keys(currentModules()),i=names.indexOf(moduleName);moduleName=names[(i+1)%names.length];window.__manualAssignments=null;renderAll();});
$("#resetSquad").addEventListener("click",()=>{if(confirm("Svuotare la rosa virtuale?")){selected.clear();saveAndRender();}});
$("#exportBtn").addEventListener("click",()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify({players,selected:[...selected]},null,2)],{type:"application/json"}));a.download="mantra-lab-rosa.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);});
$("#importInput").addEventListener("change",e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const txt=r.result;if(f.name.toLowerCase().endsWith(".csv")){const lines=txt.split(/\r?\n/).filter(Boolean),head=lines.shift().split(",").map(x=>x.trim().toLowerCase());players=lines.map((line,i)=>{const c=line.match(/(?:[^,"]+|"[^"]*")+/g)?.map(x=>x.trim().replace(/^"|"$/g,""))||[],o={};head.forEach((h,j)=>o[h]=c[j]||"");return{id:o.id||"imp"+i,name:o.name,team:o.team||"",classic:o.classic||"",roles:(o.roles||"").split("|").filter(Boolean),price:Number(o.price)||0};}).filter(x=>x.name);}else{const d=JSON.parse(txt);if(Array.isArray(d.players))players=d.players;if(Array.isArray(d.selected))selected=new Set(d.selected.slice(0,30));}selected=new Set([...selected].filter(id=>players.some(p=>p.id===id)).slice(0,30));saveAndRender();}catch(err){alert("File non valido. Usa il JSON esportato o CSV con: id,name,team,classic,roles,price");}};r.readAsText(f);});
renderModuleOptions();renderAll();
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
