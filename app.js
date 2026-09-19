const analyses = [];

const list = document.getElementById("analysisList");
const filter = document.getElementById("oddFilter");

function render() {
  const value = filter.value;
  const rows = analyses.filter(
    a => value === "all" || a.type === value
  );

  if (!rows.length) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📊</div>
        <h3>Nenhuma análise disponível</h3>
        <p>As análises reais aparecerão aqui quando forem cadastradas.</p>
        <small>O painel está pronto para receber os próximos sinais.</small>
      </div>
    `;
    return;
  }

  list.innerHTML = rows.map(a => `
    <article class="analysis">
      <div class="league">${a.league}</div>
      <div class="teams">
        ${a.teams}
        <small>${a.time}</small>
      </div>
      <div class="market">${a.market}</div>
      <div class="odd">${a.odd.toFixed(2).replace(".", ",")}</div>
      <div class="reason">${a.reason}</div>
      <div class="confidence ${a.confidence === "Média" ? "medium" : ""}">
        ${a.confidence}
      </div>
      <div>›</div>
    </article>
  `).join("");
}

filter.addEventListener("change", render);
render();

document.querySelectorAll("[data-section]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-item")
      .forEach(x => x.classList.remove("active"));

    if (btn.classList.contains("nav-item")) {
      btn.classList.add("active");
    }

    const target = document.getElementById(btn.dataset.section);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else {
      document.getElementById("analises")?.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
