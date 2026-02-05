const btnBack = document.getElementById("btnBack");
if (btnBack) {
  btnBack.addEventListener("click", () => {
    window.history.back(); // volta para a página anterior
  });
}


// Pega ID do serviço da URL
function getServiceIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

const agendamentoForm = document.getElementById("agendamentoForm");
const feedbackMessage = document.getElementById("feedbackMessage");

async function enviarAgendamento(event) {
  event.preventDefault();

  const serviceId = getServiceIdFromURL();
  if (!serviceId) {
    feedbackMessage.textContent = "Serviço não identificado.";
    feedbackMessage.style.color = "red";
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Você precisa estar logado para agendar.");
    window.location.href = "login.html";
    return;
  }

  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const observacao = document.getElementById("observacoes").value;
  const pagamento = document.getElementById("pagamento").value;

  if (!data || !hora || !pagamento) {
    feedbackMessage.textContent = "Data, hora e forma de pagamento são obrigatórios.";
    feedbackMessage.style.color = "red";
    return;
  }

  const dataHora = new Date(`${data}T${hora}:00`).toISOString();

  try {
    // Envia o POST sem id_cliente, backend pega do token
    const response = await fetch("http://localhost:3000/api/agendamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        data_hora: dataHora,
        id_servico_fk: serviceId,
        pagamento,
        observacao
      })
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.error || "Erro ao agendar serviço");

    feedbackMessage.textContent = "Agendamento realizado com sucesso!";
    feedbackMessage.style.color = "green";
    agendamentoForm.reset();

  } catch (error) {
    feedbackMessage.textContent = error.message;
    feedbackMessage.style.color = "red";
    console.error("Erro ao enviar agendamento:", error);
  }
}

// Listener do formulário
agendamentoForm.addEventListener("submit", enviarAgendamento);
