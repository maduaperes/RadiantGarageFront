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
  e.preventDefault();    
  e.stopPropagation();   
  optionsContainer.style.display = optionsContainer.style.display === 'flex' ? 'none' : 'flex';
});

// Fecha o dropdown ao clicar fora
document.addEventListener('click', () => {
  optionsContainer.style.display = 'none';
});

// Impede que clicar dentro do container feche o dropdown
optionsContainer.addEventListener('click', (e) => e.stopPropagation());

// ==========================
// MULTISELECT - ATUALIZAÇÃO DE SELEÇÃO
// ==========================
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    atualizarSelecionados();
    filtrarServicos();
  });
});

function atualizarSelecionados() {
  const selected = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.parentNode.textContent.trim());

  selectedSpan.textContent = selected.length > 0
    ? selected.join(', ')
    : 'Selecione os serviços';
}

// ==========================
// NORMALIZAÇÃO DE TEXTO
// ==========================
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')                 // separa acentos
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/_/g, ' ')               // substitui underline por espaço
    .trim();
}

// ==========================
// FILTRAGEM DOS CARDS
// ==========================
function filtrarServicos() {
  const selecionados = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => normalizarTexto(cb.value));

  const cards = document.querySelectorAll('.service-card');

  cards.forEach(card => {
    const nomeServico = normalizarTexto(card.querySelector('h3').textContent);

    if (selecionados.length === 0) {
      card.style.display = 'flex'; // mostra todos se nada estiver selecionado
    } else {
      // verifica se o nome do serviço contém algum dos valores selecionados
      const corresponde = selecionados.some(valor => nomeServico.includes(valor));
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
  atualizarSelecionados();
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
