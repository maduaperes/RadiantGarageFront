async function buscarServicos() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/servicos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Não autorizado. Faça login.");
        return;
      }
      throw new Error(`Erro ao buscar serviços: ${response.status}`);
    }

    const data = await response.json();

    // 🔥 Garante que sempre será um array
    const servicos = Array.isArray(data) ? data : data.servicos;

    if (!Array.isArray(servicos)) {
      throw new Error("Formato de dados inválido");
    }

    console.log("Serviços vindos do backend:", servicos);

    renderizarServicos(servicos);

  } catch (error) {
    console.error("Erro na requisição GET:", error.message);
  }
}


function renderizarServicos(servicos) {
  const container = document.getElementById("servicesContainer");

  // 🔒 segurança pra evitar erro se o elemento não existir
  if (!container) {
    console.error("Elemento #servicesContainer não encontrado no HTML");
    return;
  }

  container.innerHTML = "";

  // 🔒 garante que é um array
  if (!Array.isArray(servicos)) {
    console.error("Resposta da API não é um array:", servicos);
    return;
  }

  servicos.forEach(servico => {
    const card = document.createElement("div");
    card.classList.add("service-card");

    card.innerHTML = `
      <h3>${servico.nome ?? "Sem nome"}</h3>
      <p>${servico.descricao ?? "Sem descrição"}</p>
      <strong>R$ ${servico.preco ?? "0,00"}</strong>
    `;

    container.appendChild(card);
  });
}

// 🚀 chama a função quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  buscarServicos();
});


