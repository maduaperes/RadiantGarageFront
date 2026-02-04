document.addEventListener('DOMContentLoaded', () => {
  // ==== BOTÃO VOLTAR ====
  const btnBack = document.getElementById('btnBack');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      // Substitua por qualquer página que deseja voltar
      // Ex: window.location.href = 'index.html';
      window.history.back();
    });
  }

  // ==== FUNÇÃO "LER MAIS" ====
  const botoesLerMais = document.querySelectorAll('.read-more');
  botoesLerMais.forEach(botao => {
    botao.addEventListener('click', () => {
      const descricao = botao.closest('.descricao');
      descricao.classList.toggle('expandida');

      botao.textContent = descricao.classList.contains('expandida') ? 'Ler menos' : 'Ler mais';
    });
  });

  // ==== SALVAR SERVIÇO SELECIONADO ====
  const btnConfirmar = document.getElementById('btnConfirmar');
  const servicoSelect = document.getElementById('servicoSelect');

  if (btnConfirmar && servicoSelect) {
    btnConfirmar.addEventListener('click', () => {
      const servicoSelecionado = servicoSelect.value.trim();
      if (!servicoSelecionado) {
        alert('Por favor, selecione um serviço.');
        return;
      }

      // Pega o agendamento existente ou cria novo objeto
      const agendamento = JSON.parse(localStorage.getItem('ultimoAgendamento')) || {};

      // Atualiza o serviço selecionado
      agendamento.servico = servicoSelecionado;

      // Inicializa outros campos se necessário
      agendamento.veiculo = agendamento.veiculo || '';
      agendamento.placa = agendamento.placa || '';
      agendamento.data = agendamento.data || '';
      agendamento.horario = agendamento.horario || '';
      agendamento.pagamento = agendamento.pagamento || '';
      agendamento.observacoes = agendamento.observacoes || '';

      // Salva no localStorage
      localStorage.setItem('ultimoAgendamento', JSON.stringify(agendamento));

      // Redireciona para status.html
      window.location.href = 'index.html';
    });
  }
});
