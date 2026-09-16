/**
 * Local-first data provider.
 * The supplied Fantacalcio 2026/27 listone is stored in data/listone-2026-27.csv.
 * Replace this provider later with an authorized online source without changing the UI.
 */
const LOCAL_LISTONE_URL = "data/listone-2026-27.csv";

function parseCsv(text){
  const rows=[];let row=[],cell="",quoted=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i],next=text[i+1];
    if(ch==='"' && quoted && next==='"'){cell+='"';i++;continue;}
    if(ch==='"'){quoted=!quoted;continue;}
    if(ch===',' && !quoted){row.push(cell);cell="";continue;}
    if((ch==='\n'||ch==='\r') && !quoted){if(ch==='\r'&&next==='\n')i++;row.push(cell);cell="";if(row.some(x=>x!=="")){rows.push(row)}row=[];continue;}
    cell+=ch;
  }
  if(cell!==""||row.length){row.push(cell);if(row.some(x=>x!==""))rows.push(row)}
  if(!rows.length)return [];
  const head=rows.shift().map(x=>x.trim());
  return rows.map(r=>{const o={};head.forEach((h,i)=>o[h]=r[i]??"");return o;});
}

function normalizePlayer(o){
  return {
    id:String(o.id||o.Id),
    name:String(o.name||o.Nome||"").trim(),
    team:String(o.team||o.Squadra||"").trim(),
    classic:String(o.classic||o.R||"").trim(),
    roles:String(o.roles||o.RM||"").split(/[|;]/).map(x=>x.trim()).filter(Boolean),
    price:Number(o.price||o["Qt.A"])||0,
    initialPrice:Number(o.initialPrice||o["Qt.I"])||0,
    fvm:Number(o.fvm||o.FVM)||0,
    fvmMantra:Number(o.fvmMantra||o["FVM M"])||0,
    season:String(o.season||"2026/27"),
    source:String(o.source||"Fantacalcio.it")
  };
}

window.MantraLabDataProvider={
  parseCsv,
  async loadPlayers(){
    const response=await fetch(LOCAL_LISTONE_URL,{cache:"no-store"});
    if(!response.ok)throw new Error(`Listone locale non disponibile (${response.status})`);
    const rows=parseCsv(await response.text());
    const result=rows.map(normalizePlayer).filter(p=>p.id&&p.name);
    if(!result.length)throw new Error("Listone locale vuoto");
    return result;
  }
};
