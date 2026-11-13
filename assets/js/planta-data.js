// Fonte: Planta MIX, folha 2/2 – 2º Pavimento / Praça de Alimentação (Nov/2026).
// Áreas em m² conforme a planta. Posições (x,y,w,h) são um ESQUEMA fora de escala, viewBox 1000×580.
// status: ocupada | vaga | operacional | confirmar
window.PLANTA={
 titulo:"2º Pavimento – Praça de Alimentação",
 espacos:[
 {id:"ADM",rotulo:"ADM",nome:"Dep. ADM",area:88.90,cat:"tecnico",status:"operacional",x:230,y:20,w:130,h:70},
 {id:"SC",rotulo:"SC",nome:"Sala SC",area:28.00,cat:"tecnico",status:"operacional",x:360,y:20,w:100,h:70},
 {id:"MAQ06",rotulo:"C. Máq. A.C 06",nome:"Casa de máquinas A.C",area:130.77,cat:"tecnico",status:"operacional",x:460,y:20,w:210,h:70},
 {id:"CS99",rotulo:"Circ. Serv.",nome:"Circulação de serviço",area:99.50,cat:"apoio",status:"operacional",x:230,y:98,w:440,h:30},
 {id:"L214",rotulo:"214",nome:"McDonald’s",area:161.69,cat:"loja",status:"ocupada",x:230,y:140,w:150,h:110},
 {id:"L213",rotulo:"213",nome:"Spoleto",area:53.38,cat:"loja",status:"ocupada",x:380,y:140,w:80,h:110},
 {id:"L212",rotulo:"212",nome:"Pizza Hut",area:37.25,cat:"loja",status:"ocupada",x:460,y:140,w:75,h:110},
 {id:"L211",rotulo:"211",nome:"A identificar",area:35.44,cat:"loja",status:"ocupada",x:535,y:140,w:75,h:110},
 {id:"L210",rotulo:"210",nome:"Dona Maria Express",area:32.55,cat:"loja",status:"ocupada",x:610,y:140,w:70,h:110},
 {id:"L209",rotulo:"209",nome:"Divino Pogão",area:57.43,cat:"loja",status:"ocupada",x:680,y:140,w:90,h:110},
 {id:"CSOC22",rotulo:"CS",nome:"Circulação social",area:22.38,cat:"apoio",status:"operacional",x:775,y:140,w:50,h:60},
 {id:"L215",rotulo:"215",nome:"Mundo Imersivo",area:250.94,cat:"especial",status:"operacional",x:30,y:100,w:150,h:150},
 {id:"R216",rotulo:"216",nome:"Rec. louças",area:15.00,cat:"apoio",status:"operacional",x:185,y:150,w:40,h:60},
 {id:"EVMAR",rotulo:"Evento Imerso Mar",nome:"Espaço de evento",area:92.71,cat:"especial",status:"operacional",x:30,y:290,w:150,h:110},
 {id:"L200",rotulo:"200",nome:"Sem operação indicada",area:286.07,cat:"loja",status:"confirmar",x:30,y:410,w:205,h:130},
 {id:"PRACA",rotulo:"Praça de Alimentação",nome:"Área de mesas",area:null,cat:"apoio",status:"operacional",x:240,y:262,w:520,h:155},
 {id:"L201",rotulo:"201",nome:"Kin Sui",area:80.69,cat:"loja",status:"ocupada",x:240,y:430,w:85,h:100},
 {id:"L202",rotulo:"202",nome:"Giraffas",area:65.41,cat:"loja",status:"ocupada",x:325,y:430,w:70,h:100},
 {id:"L203",rotulo:"203",nome:"Vaga",area:58.81,cat:"loja",status:"vaga",x:395,y:430,w:70,h:100},
 {id:"L204",rotulo:"204",nome:"A identificar",area:38.11,cat:"loja",status:"ocupada",x:465,y:430,w:60,h:100},
 {id:"L205",rotulo:"205",nome:"Vaga",area:35.51,cat:"loja",status:"vaga",x:525,y:430,w:60,h:100},
 {id:"L206",rotulo:"206",nome:"Subway",area:27.88,cat:"loja",status:"ocupada",x:585,y:430,w:50,h:100},
 {id:"L207",rotulo:"207",nome:"Express Grill",area:39.44,cat:"loja",status:"ocupada",x:635,y:430,w:75,h:100},
 {id:"WCF",rotulo:"WC Fem.",nome:"Sanitário feminino",area:39.97,cat:"apoio",status:"operacional",x:715,y:430,w:90,h:50},
 {id:"WCM",rotulo:"WC Masc.",nome:"Sanitário masculino",area:46.72,cat:"apoio",status:"operacional",x:810,y:430,w:100,h:50},
 {id:"PNE",rotulo:"PNE",nome:"Sanitário PNE",area:4.14,cat:"apoio",status:"operacional",x:715,y:485,w:40,h:45},
 {id:"BRI",rotulo:"Brig.",nome:"Brigada",area:8.40,cat:"apoio",status:"operacional",x:760,y:485,w:45,h:45},
 {id:"CSOC28",rotulo:"Circ. Social",nome:"Circulação social",area:28.22,cat:"apoio",status:"operacional",x:810,y:485,w:100,h:45},
 {id:"CS67",rotulo:"Circ. Serv.",nome:"Circulação de serviço",area:67.64,cat:"apoio",status:"operacional",x:240,y:538,w:470,h:28}
 ],
 // DADOS FICTÍCIOS apenas para demonstrar o RF05; serão substituídos pela API (FastAPI/PostgreSQL).
 ocorrencias:[
 {id:1,esp:"MAQ06",cat:"Climatização",prio:"alta",desc:"Ruído anormal no equipamento.",status:"aberta",data:"13/11/2026"},
 {id:2,esp:"WCF",cat:"Hidráulica",prio:"média",desc:"Torneira com vazamento.",status:"aberta",data:"12/11/2026"},
 {id:3,esp:"CS99",cat:"Elétrica",prio:"baixa",desc:"Luminária queimada.",status:"aberta",data:"10/11/2026"}
 ]
};
