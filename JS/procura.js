// ==========================
// MULTISELECT - ABRIR E FECHAR DROPDOWN
// ==========================
const selectBox = document.querySelector('.select-box');
const optionsContainer = document.getElementById('optionsContainer');
const selectedSpan = document.getElementById('selected');
const checkboxes = document.querySelectorAll('#optionsContainer input[type="checkbox"]');
const searchForm = document.querySelector('.search-filters form');
const clearBtn = document.querySelector('.clear-btn');

selectBox.addEventListener('click', (e) => {
  e.preventDefault();    // evita que o label acione inputs
  e.stopPropagation();   // impede propagação
  const isOpen = optionsContainer.style.display === 'flex';
  optionsContainer.style.display = isOpen ? 'none' : 'flex';
});

// Fecha o dropdown ao clicar fora
document.addEventListener('click', (e) => {
  if (!selectBox.contains(e.target) && !optionsContainer.contains(e.target)) {
    optionsContainer.style.display = 'none';
  }
});

// Impede que clicar dentro do container feche o dropdown
optionsContainer.addEventListener('click', (e) => e.stopPropagation());

// ==========================
// MULTISELECT - ATUALIZAÇÃO DE SELEÇÃO
// ==========================
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const selected = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.parentNode.textContent.trim());

    selectedSpan.textContent = selected.length > 0
      ? selected.join(', ')
      : 'Selecione os serviços';

    filtrarServicos();
  });
});

// ==========================
// FILTRAGEM DOS CARDS
// ==========================
function filtrarServicos() {
  const selecionados = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  const cards = document.querySelectorAll('.service-card');

  cards.forEach(card => {
    const nomeServico = card.querySelector('h3').textContent.toLowerCase();

    if (selecionados.length === 0) {
      card.style.display = 'flex';
    } else {
      const corresponde = selecionados.some(valor =>
        nomeServico.includes(valor.replace(/_/g, ' '))
      );
      card.style.display = corresponde ? 'flex' : 'none';
    }
  });
}

// ==========================
// BOTÃO LIMPAR FILTROS
// ==========================
clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  checkboxes.forEach(cb => cb.checked = false);
  selectedSpan.textContent = 'Selecione os serviços';
  searchForm.reset();
  filtrarServicos();
});

// ==========================
// SUBMIT (caso queira filtrar manualmente)
// ==========================
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  filtrarServicos();
});
