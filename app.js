const analyses = [
  {league:"Brasileirão Série A", teams:"Flamengo  ×  Palmeiras", time:"Hoje • 21:30", market:"Ambos marcam (Sim)", odd:1.72, type:"low", reason:"Mercado selecionado com base nos dados cadastrados.", confidence:"Alta"},
  {league:"Champions League", teams:"Real Madrid  ×  B. Dortmund", time:"Hoje • 16:00", market:"Mais de 2.5 gols", odd:1.65, type:"low", reason:"Confronto com histórico recente de gols.", confidence:"Alta"},
  {league:"Copa do Brasil", teams:"São Paulo  ×  Corinthians", time:"Hoje • 19:00", market:"São Paulo — Empate Anula", odd:1.55, type:"low", reason:"Entrada baseada nos critérios do painel.", confidence:"Média"},
  {league:"La Liga", teams:"Barcelona  ×  Valencia", time:"Hoje • 17:00", market:"Barcelona vence 1º tempo", odd:1.60, type:"low", reason:"Filtro estatístico configurado pelo administrador.", confidence:"Alta"},
  {league:"Premier League", teams:"Man. City  ×  Arsenal", time:"Hoje • 16:30", market:"Mais de 1.5 gols 1º tempo", odd:5.40, type:"high", reason:"Exemplo demonstrativo de odd alta.", confidence:"Média"}
];

const list = document.getElementById("analysisList");
const filter = document.getElementById("oddFilter");

function render() {
  const value = filter.value;
  const rows = analyses.filter(a => value === "all" || a.type === value);
  list.innerHTML = rows.map(a => `
    <article class="analysis">
      <div class="league">${a.league}</div>
      <div class="teams">${a.teams}<small>${a.time}</small></div>
      <div class="market">${a.market}</div>
      <div class="odd">${a.odd.toFixed(2).replace(".",",")}</div>
      <div class="reason">${a.reason}</div>
      <div class="confidence ${a.confidence === "Média" ? "medium" : ""}">${a.confidence}</div>
      <div>›</div>
    </article>
  `).join("");
}
filter.addEventListener("change", render);
render();

document.querySelectorAll("[data-section]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(x => x.classList.remove("active"));
    if (btn.classList.contains("nav-item")) btn.classList.add("active");
    const target = document.getElementById(btn.dataset.section);
    if (target) target.scrollIntoView({behavior:"smooth", block:"start"});
    else document.getElementById("analises").scrollIntoView({behavior:"smooth"});
  });
});
