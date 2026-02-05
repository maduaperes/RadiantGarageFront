document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("agendamentoForm");
  const feedback = document.getElementById("feedbackMessage");
  const btnBack = document.getElementById("btnBack");
  const selectServico = document.getElementById("servico");

  // 🔑 Pegando o token do localStorage
  const token = localStorage.getItem("token");

  // 🔹 BOTÃO VOLTAR
  btnBack.addEventListener("click", () => {
    window.history.back();
  });

  // 🔹 Se não houver token, bloqueia a página
  if (!token) {
    feedback.textContent = "Usuário não autenticado. Faça login novamente.";
    feedback.style.color = "#f87171";
    return;
  }

  // 🔹 FUNÇÃO PARA CARREGAR SERVIÇOS
  async function carregarServicos() {
    try {
      const response = await fetch("http://localhost:3000/api/servicos", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar serviços");
      }

      const servicos = await response.json();

      // Limpa opções antigas
      selectServico.innerHTML = '<option value="">Selecione um serviço</option>';

      servicos.forEach((servico) => {
        const option = document.createElement("option");
        option.value = servico.id;
        option.textContent = servico.nome;
        selectServico.appendChild(option);
      });
    } catch (error) {
      console.error(error);
      feedback.textContent = "Erro ao carregar serviços.";
      feedback.style.color = "#f87171";
    }
  }

  carregarServicos();

  // 🔹 SUBMIT DO AGENDAMENTO
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const observacoes = document.getElementById("observacoes").value;
    const pagamento = document.getElementById("pagamento").value;
    const servico_id = selectServico.value;
    const termos = document.getElementById("termos").checked;

    if (!data || !hora || !pagamento || !servico_id) {
      feedback.textContent = "Por favor, preencha todos os campos obrigatórios.";
      feedback.style.color = "#f87171";
      return;
    }

    if (!termos) {
      feedback.textContent = "Você precisa aceitar os termos de uso e privacidade.";
      feedback.style.color = "#f87171";
      return;
    }

    const agendamento = { data, hora, observacoes, pagamento, servico_id };

    try {
      const response = await fetch("http://localhost:3000/api/agendamentos", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agendamento),
      });

      if (!response.ok) {
        throw new Error("Erro ao realizar o agendamento");
      }

      feedback.textContent = "Agendamento realizado com sucesso!";
      feedback.style.color = "#4ade80";

      setTimeout(() => {
        window.location.href = "procura.html";
      }, 1000);
    } catch (error) {
      console.error(error);
      feedback.textContent = "Erro ao conectar com o servidor.";
      feedback.style.color = "#f87171";
    }
  });
});
