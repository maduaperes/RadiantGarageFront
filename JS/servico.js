document.addEventListener('DOMContentLoaded', () => {
  // ==== BOTÃO VOLTAR ====
  const btnBack = document.getElementById('btnBack');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      window.history.back();
    });
  }

  // ==== FUNÇÃO "LER MAIS" ====
  const botoesLerMais = document.querySelectorAll('.read-more');

  botoesLerMais.forEach(botao => {
    botao.addEventListener('click', () => {
      const descricao = botao.closest('.descricao');

      // Alterna a classe para expandir ou recolher
      descricao.classList.toggle('expandida');

      // Troca o texto do botão conforme o estado
      if (descricao.classList.contains('expandida')) {
        botao.textContent = 'Ler menos';
      } else {
        botao.textContent = 'Ler mais';
      }
    });
  });
});
