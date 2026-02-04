document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("agendamentoForm");
  const feedback = document.getElementById("feedbackMessage");
  const btnBack = document.getElementById("btnBack");

  btnBack.addEventListener("click", () => {
    window.history.back();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const observacoes = document.getElementById("observacoes").value;
    const pagamento = document.getElementById("pagamento").value;
    const servico = document.getElementById("servico").value;
    const termos = document.getElementById("termos").checked;

    if (!data || !hora || !pagamento || !servico) {
      feedback.textContent = "Por favor, preencha todos os campos obrigatórios.";
      feedback.style.color = "#f87171"; 
      return;
    }

    if (!termos) {
      feedback.textContent = "Você precisa aceitar os termos de uso e privacidade.";
      feedback.style.color = "#f87171";
      return;
    }

    const agendamento = {
      id: Date.now(), 
      data,
      hora,
      observacoes,
      pagamento,
      servico
    };

    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    agendamentos.push(agendamento);

    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    feedback.textContent = "Agendamento realizado com sucesso!";
    feedback.style.color = "#4ade80"; 

    setTimeout(() => {
      window.location.href = "procura.html";
    }, 1000);
  });
});
