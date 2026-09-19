const analyses=[
 {type:"free",league:"Brasileirão",match:"Flamengo x Exemplo FC",market:"Mais de 1,5 gols",odd:1.42,book:"Betano",time:"Hoje • 19:00"},
 {type:"free",league:"Premier League",match:"Time A x Time B",market:"Dupla chance",odd:1.68,book:"bet365",time:"Hoje • 16:00"},
 {type:"free",league:"La Liga",match:"Time C x Time D",market:"Mais de 0,5 gol",odd:1.30,book:"Betano",time:"Hoje • 17:30"},
 {type:"free",league:"Serie A",match:"Time E x Time F",market:"Ambas marcam",odd:2.05,book:"bet365",time:"Amanhã • 15:00"},
 {type:"vip",league:"Brasileirão",match:"Análise VIP",market:"Mercado configurado no feed",odd:3.20,book:"Betano",time:"Hoje • 21:00"},
 {type:"vip",league:"Champions",match:"Análise VIP",market:"Mercado configurado no feed",odd:7.50,book:"bet365",time:"Amanhã • 16:00"},
 {type:"free",league:"Copa",match:"Time G x Time H",market:"Resultado + gols",odd:6.20,book:"Betano",time:"Sábado • 20:00"},
 {type:"free",league:"Liga",match:"Time I x Time J",market:"Mercado especial",odd:12.00,book:"bet365",time:"Domingo • 18:00"}
];

function card(a){
 const cls=a.odd>=5?"gold":"green";
 return `<article class="card"><div class="card-top"><span class="league">${a.league} • ${a.time}</span><span class="odd ${cls}">${a.odd.toFixed(2)}</span></div><div class="match">${a.match}</div><div class="market">${a.market}</div><span class="book">${a.book}</span></article>`;
}
function render(){
 const free=analyses.filter(a=>a.type==="free");
 const vip=analyses.filter(a=>a.type==="vip");
 document.querySelector("#freeList").innerHTML=free.map(card).join("");
 document.querySelector("#vipList").innerHTML=vip.map(card).join("");
 document.querySelector("#lowList").innerHTML=analyses.filter(a=>a.odd>=1.25&&a.odd<=4).map(card).join("");
 document.querySelector("#highList").innerHTML=analyses.filter(a=>a.odd>=5&&a.odd<=100).map(card).join("");
 document.querySelector("#freeCount").textContent=`${free.length} análises`;
}
document.querySelectorAll(".tabs button").forEach(btn=>btn.onclick=()=>{
 document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));
 document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));
 btn.classList.add("active"); document.getElementById(btn.dataset.tab).classList.add("active");
});
function showVip(){
 const pass=prompt("Digite a senha/código do VIP:");
 if(pass && pass===localStorage.getItem("capixaba_vip_code")){
   document.querySelector(".vip-lock").style.display="none";
   document.querySelector("#vipList").classList.remove("hidden");
 } else if(pass){ alert("Código VIP inválido."); }
}
document.querySelector("#themeBtn").onclick=()=>document.body.classList.toggle("dark");
document.querySelector("#year").textContent=new Date().getFullYear();
render();
