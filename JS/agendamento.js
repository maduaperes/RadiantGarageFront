document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("agendamentoForm");
  const feedback = document.getElementById("feedbackMessage");
  const backButton = document.querySelector(".back");

  // Botão de voltar
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.history.back();
    });
  }

  // Função para exibir mensagens
  function showMessage(text, type = "error") {
    feedback.textContent = text;
    feedback.style.color = type === "success" ? "#4ade80" : "#f87171"; // verde ou vermelho
    feedback.style.marginTop = "12px";
  }

  // Função de validação simples
  function validateForm() {
    const requiredFields = form.querySelectorAll("input[required], select[required]");
    for (const field of requiredFields) {
      if (!field.value.trim()) {
        field.focus();
        showMessage("Por favor, preencha todos os campos obrigatórios.");
        return false;
      }
    }

    const termos = document.getElementById("termos");
    if (!termos.checked) {
      showMessage("Você deve aceitar os termos de uso e privacidade.");
      termos.focus();
      return false;
    }

    return true;
  }

  // Submissão do formulário
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    // Coletar dados do formulário
    const dados = {
      nome: document.getElementById("nome").value.trim(),
      telefone: document.getElementById("telefone").value.trim(),
      email: document.getElementById("email").value.trim(),
      data: document.getElementById("data").value,
      horario: document.getElementById("horario").value,
      veiculo: document.getElementById("veiculo").value.trim(),
      servico: document.getElementById("servico").value,
      pagamento: document.getElementById("pagamento").value,
      placa: document.getElementById("placa").value.trim(),
      observacoes: document.getElementById("observacoes").value.trim(),
    };

    console.log("Dados do agendamento:", dados);

    // Simulação de envio
    showMessage("Agendamento realizado com sucesso!", "success");

    // Limpar formulário após sucesso
    form.reset();

    // Redirecionar para a página de status após 2 segundos
    setTimeout(() => {
      window.location.href = "status.html"; // 🔁 altere o nome se o arquivo for diferente
    }, 2000);
  });
});
