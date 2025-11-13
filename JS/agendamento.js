document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("agendamentoForm");
  const feedback = document.getElementById("feedbackMessage");
  const backButton = document.querySelector(".back");

  // Botão de voltar
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "servico.html"; // substitua pelo caminho correto da página
    });
  }

  // Função de exibir mensagem
  function showMessage(text, type = "error") {
    if (!feedback) return;
    feedback.textContent = text;
    feedback.style.color = type === "success" ? "#4ade80" : "#f87171";
    feedback.style.marginTop = "12px";
    feedback.style.textAlign = "center";
    feedback.style.transition = "0.3s";
  }

  // Validação do formulário
  function validateForm() {
    const requiredFields = form.querySelectorAll("input[required], select[required]");
    for (const field of requiredFields) {
      if (!field.value.trim()) {
        showMessage("Por favor, preencha todos os campos obrigatórios.");
        field.focus();
        return false;
      }
    }

    const termos = document.getElementById("termos");
    if (termos && !termos.checked) {
      showMessage("Você deve aceitar os termos de uso e privacidade.");
      termos.focus();
      return false;
    }

    return true;
  }

  // Submit do formulário
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    // ===== Dados do cliente =====
    const cliente = {
      nome: document.getElementById("nome").value.trim(),
      telefone: document.getElementById("telefone").value.trim()
    };

    // ===== Dados do agendamento =====
    const servicoSelect = document.getElementById("servico");
    const agendamento = {
      veiculo: document.getElementById("veiculo").value.trim(),
      placa: document.getElementById("placa") ? document.getElementById("placa").value.trim() : "",
      servico: servicoSelect ? servicoSelect.options[servicoSelect.selectedIndex].text : "",
      data: document.getElementById("data") ? document.getElementById("data").value.trim() : "",
      horario: document.getElementById("horario") ? document.getElementById("horario").value.trim() : "",
      pagamento: document.getElementById("pagamento").value,
      observacoes: document.getElementById("observacoes").value.trim()
    };

    // ===== Salvar no localStorage =====
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.push(cliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    localStorage.setItem("ultimoAgendamento", JSON.stringify(agendamento));

    // Mostrar sucesso
    showMessage("Agendamento realizado com sucesso!", "success");
    form.reset();

    // Redirecionar para status
    setTimeout(() => {
      window.location.href = "status.html";
    }, 1500);
  });
});
