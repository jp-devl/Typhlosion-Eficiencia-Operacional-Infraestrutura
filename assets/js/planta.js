(function(){
if(!sessionStorage.getItem("capim_user")){location.replace("../index.html");return}
const D=window.PLANTA,NS="http://www.w3.org/2000/svg",$=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ST={ocupada:"Ocupada",vaga:"Vaga",operacional:"Área operacional",confirmar:"A confirmar"};
const FIL={todos:"Todas",loja:"Lojas",vaga:"Vagas",tecnico:"Técnico",apoio:"Apoio e áreas comuns",especial:"Espaços especiais"};
const KEY="capim_ocorrencias_demo";let ocs;
try{ocs=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!Array.isArray(ocs))ocs=D.ocorrencias.map(o=>({...o}));
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(ocs))}catch(e){}};
const tipo=e=>e.status==="vaga"?"vaga":e.cat,abertas=()=>ocs.filter(o=>o.status==="aberta");
let filtro="todos",sel=null;
const svg=$("#mapa"),P=$("#painel");
$("#usr").textContent=sessionStorage.getItem("capim_user");
$("#sub").textContent=D.titulo+" · esquema fora de escala";
$("#sair").onclick=()=>{sessionStorage.clear();location.href="../index.html"};

function kpis(){
 const l=D.espacos.filter(e=>e.cat==="loja"),v=l.filter(e=>e.status==="vaga");
 const m2=v.reduce((s,e)=>s+e.area,0).toFixed(2).replace(".",",");
 const k=[[l.length,"Lojas no pavimento"],[l.filter(e=>e.status==="ocupada").length,"Lojas ocupadas"],[v.length,`Vagas (${m2} m²)`],[abertas().length,"Ocorrências abertas"]];
 $("#kpis").innerHTML=k.map(([n,t])=>`<div class="kpi"><b>${n}</b><span>${t}</span></div>`).join("");
}
function chips(){
 $("#chips").innerHTML=Object.entries(FIL).map(([k,t])=>`<button class="chip" data-f="${k}" aria-pressed="${k===filtro}">${t}</button>`).join("");
 $("#chips").querySelectorAll("button").forEach(b=>b.onclick=()=>{filtro=b.dataset.f;chips();draw()});
}
function draw(){
 svg.innerHTML=`<path class="vazio" d="M830 150h150v240H830z"/><text class="vz" x="905" y="268">Vazio /</text><text class="vz" x="905" y="285">escadas rolantes</text>`;
 D.espacos.forEach(e=>{
  const t=tipo(e),on=filtro==="todos"||filtro===t,g=document.createElementNS(NS,"g"),cx=e.x+e.w/2,cy=e.y+e.h/2;
  g.setAttribute("class",`esp t-${t}${on?"":" dim"}${sel===e.id?" sel":""}`);
  g.setAttribute("tabindex","0");g.setAttribute("role","button");g.setAttribute("aria-label",`${e.rotulo}, ${e.nome}`);
  const max=Math.floor(e.w/6.2),n=e.nome.length>max?e.nome.slice(0,max-1)+"…":e.nome,peq=e.w<60||e.h<50;
  g.innerHTML=`<rect x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" rx="${e.id==="PRACA"?70:6}"/>`+
   (peq?`<text class="r" x="${cx}" y="${cy+4}">${esc(e.rotulo.slice(0,Math.floor(e.w/6.5)))}</text>`:
   `<text class="r" x="${cx}" y="${cy-4}">${esc(e.rotulo)}</text><text x="${cx}" y="${cy+11}">${esc(n)}</text>`);
  g.onclick=()=>pick(e.id);g.onkeydown=ev=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();pick(e.id)}};
  svg.appendChild(g);
 });
 const vistos={};
 abertas().forEach(o=>{const e=D.espacos.find(x=>x.id===o.esp);if(!e)return;
  const i=vistos[e.id]=(vistos[e.id]||0)+1,g=document.createElementNS(NS,"g");
  g.setAttribute("class",`pin p-${o.prio}`);g.setAttribute("aria-label",`Ocorrência ${o.prio} em ${e.rotulo}`);
  g.innerHTML=`<circle cx="${e.x+e.w-12-(i-1)*20}" cy="${e.y+12}" r="9"/><text x="${e.x+e.w-12-(i-1)*20}" y="${e.y+16}">!</text>`;
  g.onclick=()=>pick(e.id);svg.appendChild(g);
 });
}
function pick(id){sel=id;draw();painel()}
function painel(){
 const e=D.espacos.find(x=>x.id===sel);
 if(!e){P.innerHTML=`<h2>Detalhes da área</h2><p class="mut">Selecione uma área na planta para ver seus dados e registrar ocorrências.</p>`;return}
 const l=ocs.filter(o=>o.esp===e.id);
 P.innerHTML=`<h2>${esc(e.rotulo)} · ${esc(e.nome)}</h2>
 <dl><dt>Status</dt><dd>${ST[e.status]}</dd><dt>Área</dt><dd>${e.area?e.area.toFixed(2).replace(".",",")+" m²":"não informada"}</dd></dl>
 <h3>Ocorrências (${l.length})</h3>
 <ul class="oc">${l.map(o=>`<li><span class="tag ${o.prio}">${o.prio}</span> <b>${esc(o.cat)}</b> · ${o.data}<br>${esc(o.desc)}
  <br><span class="mut">${o.status==="aberta"?"Aberta":"Concluída"}</span> ${o.status==="aberta"?`<button data-c="${o.id}">Concluir</button>`:""}</li>`).join("")||`<li class="mut">Nenhuma ocorrência registrada.</li>`}</ul>
 <button id="nova" style="margin-top:.8rem">Registrar ocorrência</button>
 <form class="f" id="frm" hidden>
  <label>Categoria<select name="cat"><option>Elétrica</option><option>Hidráulica</option><option>Climatização</option><option>Limpeza</option><option>Estrutura</option><option>Segurança</option></select></label>
  <label>Prioridade<select name="prio"><option>alta</option><option selected>média</option><option>baixa</option></select></label>
  <label>Descrição<textarea name="desc" rows="3" maxlength="300" required></textarea></label>
  <button>Salvar</button></form>`;
 $("#nova").onclick=()=>{$("#frm").hidden=!$("#frm").hidden};
 $("#frm").onsubmit=ev=>{ev.preventDefault();const f=new FormData(ev.target);
  ocs.push({id:Date.now(),esp:e.id,cat:f.get("cat"),prio:f.get("prio"),desc:f.get("desc").trim(),status:"aberta",data:new Date().toLocaleDateString("pt-BR")});
  save();kpis();draw();painel()};
 P.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{ocs.find(o=>o.id==b.dataset.c).status="concluída";save();kpis();draw();painel()});
}
kpis();chips();draw();painel();
})();
