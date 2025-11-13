document.addEventListener("DOMContentLoaded", () => {
  // ===== Seleção dos elementos do HTML =====
  const nomeEl = document.getElementById("nomeCliente");
  const veiculoEl = document.getElementById("veiculo");
  const placaEl = document.getElementById("placa");
  const servicoEl = document.getElementById("servico");
  const dataEl = document.getElementById("data");
  const horarioEl = document.getElementById("horario");
  const pagamentoEl = document.getElementById("pagamento");
  const observacoesEl = document.getElementById("observacoes");

  const statusBox = document.getElementById("statusBox");
  const progressBar = document.getElementById("progressBar");
  const etaEl = document.getElementById("eta");

  const btnBack = document.getElementById("btnBack");
  const toDashboard = document.getElementById("toDashboard");
  const leaveFeedback = document.getElementById("leaveFeedback");

  // Criar botão de cancelar agendamento dinamicamente
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancelar Agendamento";
  cancelBtn.className = "secondary";
  cancelBtn.style.marginTop = "15px";
  cancelBtn.style.display = "block"; 
  cancelBtn.style.width = "100%";
  cancelBtn.style.cursor = "pointer";
  statusBox.parentNode.appendChild(cancelBtn);

  // ===== Função para preencher campo com fallback =====
  function preencherCampo(el, valor) {
    if (!el) return;
    if (valor && valor.trim() !== "") {
      el.textContent = valor;
      el.style.fontStyle = "normal";
      el.style.color = "#fff";
    } else {
      el.textContent = "(Será finalizado pelo estabelecimento)";
      el.style.fontStyle = "italic";
      el.style.color = "#999";
    }
  }

  // ===== Botões =====
  if (btnBack) btnBack.addEventListener("click", () => window.location.href = "procura.html");
  if (toDashboard) toDashboard.addEventListener("click", () => window.location.href = "servico.html");
  if (leaveFeedback) leaveFeedback.addEventListener("click", () => alert("Em breve você poderá avaliar o serviço! ⭐"));

  cancelBtn.addEventListener("click", () => {
    if (confirm("Deseja realmente cancelar este agendamento?")) {
      // Limpar dados do último agendamento
      localStorage.removeItem("ultimoAgendamento");

      // Limpar campos do agendamento
      [nomeEl, veiculoEl, placaEl, servicoEl, dataEl, horarioEl, pagamentoEl, observacoesEl].forEach(el => {
        if (el) el.textContent = "—";
      });

      // Atualizar status
      if (statusBox) statusBox.textContent = "Serviço cancelado ❌";
      if (progressBar) progressBar.style.width = "0%";
      if (etaEl) etaEl.textContent = "";

      // Esconder botão cancelar
      cancelBtn.style.display = "none";
    }
  });

  // ===== Buscar dados salvos =====
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const clienteAtivo = clientes[clientes.length - 1] || null;
  const agendamento = JSON.parse(localStorage.getItem("ultimoAgendamento")) || {};

  // ===== Preencher detalhes do agendamento =====
  preencherCampo(nomeEl, clienteAtivo?.nome || "Cliente não identificado");
  preencherCampo(veiculoEl, agendamento.veiculo);
  preencherCampo(placaEl, agendamento.placa);
  preencherCampo(servicoEl, agendamento.servico);
  preencherCampo(dataEl, agendamento.data);
  preencherCampo(horarioEl, agendamento.horario);
  preencherCampo(pagamentoEl, agendamento.pagamento);
  preencherCampo(observacoesEl, agendamento.observacoes);

  // ===== Simulação de progresso do serviço =====
  let etapa = 0;
  const etapas = [
    { texto: "Aguardando confirmação...", progresso: "15%", tempo: "2h" },
    { texto: "Serviço confirmado ✅", progresso: "40%", tempo: "1h30min" },
    { texto: "Em execução 🔧", progresso: "70%", tempo: "40min" },
    { texto: "Finalizado 🏁", progresso: "100%", tempo: "Serviço concluído!" }
  ];

  const atualizarStatus = () => {
    if (etapa < etapas.length) {
      const atual = etapas[etapa];
      if (statusBox && statusBox.textContent !== "Serviço cancelado ❌") {
        statusBox.textContent = atual.texto;
        progressBar.style.width = atual.progresso;
        etaEl.textContent = `Tempo estimado de conclusão: ${atual.tempo}`;

        // Mostrar botão cancelar apenas antes do serviço começar
        if (etapa < 2) cancelBtn.style.display = "block";
        else cancelBtn.style.display = "none";
      }
      etapa++;
    } else {
      clearInterval(intervalo);
    }
  };

  atualizarStatus();
  const intervalo = setInterval(atualizarStatus, 2500);
});
