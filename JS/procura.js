async function buscarServicos() {
  try {
    const response = await fetch("http://localhost:3000/api/servicos/todos", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) throw new Error(`Erro ao buscar serviços: ${response.status}`);

    const data = await response.json();
    renderizarServicos(Array.isArray(data) ? data : []);

  } catch (error) {
    console.error("Erro na requisição GET:", error.message);
  }
}

function renderizarServicos(servicos) {
  const container = document.getElementById("servicesContainer");
  if (!container) return;

  container.innerHTML = "";

  servicos.forEach(servico => {
    const card = document.createElement("div");
    card.classList.add("service-card");

    card.innerHTML = `
      <div class="service-info">
      <img src="https://www.tecfil.com.br/wp-content/uploads/2020/09/galerias_tecfil-seo_0005_shutterstock_1457616980-1024x683.jpg" alt="Detalhe 4">
        <h2>${servico.estabelecimento.nome_estabelecimento ?? "Sem nome"}</h2>
        <h3>Serviço: ${servico.nome_servico ?? "Sem nome"}</h3>
        <h5>Valor: R$ ${servico.custo_servico ?? "0,00"}</h5>
        <p>Tempo estimado: ${servico.tempo_estipulado ?? "N/A"} minutos</p>
        <p>${servico.descricao ?? "Sem descrição"}</p>
        <a href="servico.html?id=${servico.id}">Ver mais</a>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buscarServicos();
});
