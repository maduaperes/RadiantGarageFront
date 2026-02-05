const API_URL = "http://localhost:3000/api/servicos";

document.getElementById("btnBack").addEventListener("click", () => {
  location.href = "dashboard.html";
});

document.getElementById("serviceForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const feedback = document.getElementById("feedback");
  
  // Coleta de dados dos inputs
  const nome_servico = document.getElementById("nome_servico").value.trim();
  const custo_servico = parseFloat(document.getElementById("custo_servico").value);
  const tempo_estipulado = parseInt(document.getElementById("tempo_estipulado").value);
  const descricao = document.getElementById("descricao").value.trim();

  try {
    const token = localStorage.getItem('token');

    // Estrutura do body conforme seu Controller (req.body)
    const bodyData = {
      nome_servico,
      custo_servico,
      tempo_estipulado,
      descricao: descricao || null,
      id_categoria_fk: null // Você pode implementar um select de categorias depois
    };

    // Requisição POST conforme seu modelo solicitado
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(bodyData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao cadastrar serviço");
    }

    // Sucesso
    feedback.style.color = "#4ade80";
    feedback.textContent = "Serviço cadastrado com sucesso!";
    
    setTimeout(() => {
      location.href = "dashboard.html";
    }, 1500);

  } catch (err) {
    console.error(err);
    feedback.style.color = "#ff4b2b";
    feedback.textContent = err.message;
  }
});