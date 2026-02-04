// ------------------ MULTISELECT ------------------
const selectBox = document.querySelector('.select-box');
const optionsContainer = document.getElementById('optionsContainer');
const selectedSpan = document.getElementById('selected');
const checkboxes = document.querySelectorAll('#optionsContainer input[type="checkbox"]');
const searchForm = document.querySelector('.search-filters form');
const clearBtn = document.querySelector('.clear-btn');

// Abre e fecha o dropdown
if (selectBox && optionsContainer) {
  selectBox.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    optionsContainer.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    optionsContainer.classList.remove('open');
  });

  optionsContainer.addEventListener('click', (e) => e.stopPropagation());
}

// Atualiza seleção no span
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    atualizarSelecionados();
    filtrarServicos();
  });
});

function atualizarSelecionados() {
  const selecionados = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.parentNode.textContent.trim());

  if (selecionados.length === 0) {
    selectedSpan.textContent = 'Selecione os serviços';
  } else if (selecionados.length <= 3) {
    selectedSpan.textContent = selecionados.join(', ');
  } else {
    selectedSpan.textContent = selecionados.slice(0, 3).join(', ') + ` + ${selecionados.length - 3} outros`;
  }
}

function normalizarTexto(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/_/g, ' ').trim();
}

// ------------------ FILTRO DE SERVIÇOS ------------------

// Mapeamento de filtros -> categorias
const filtroParaCategoria = {
  'manutencao e mecanica geral': 'manutencao e mecanica geral',
  'transmissao e cambio': 'manutencao e mecanica geral',
  'freios e suspensao': 'manutencao e mecanica geral',
  'sistema eletrico': 'manutencao e mecanica geral',
  'sistema de escape': 'manutencao e mecanica geral',
  'combustivel e injecao': 'manutencao e mecanica geral',
  'revisao e diagnostico': 'manutencao e mecanica geral',
  'personalizacao e acessorios': 'manutencao e mecanica geral',
  'ar e climatizacao': 'ar e climatizacao',
  'estetica automotiva': 'estetica automotiva',
  'interior e conforto': 'interior e conforto',
  'seguranca e direcao': 'seguranca e direcao',
  'diagnostico e revisao': 'diagnostico e revisao',
  'estetica externa': 'estetica externa'
};

function filtrarServicos() {
  // Pega filtros selecionados e transforma em categorias
  const selecionados = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => normalizarTexto(cb.value))
    .map(filtro => filtroParaCategoria[filtro]);

  const cards = document.querySelectorAll('.service-card');
  const categorias = document.querySelectorAll('.category-title');

  // Mostra ou esconde cards
  cards.forEach(card => {
    const categoria = normalizarTexto(card.dataset.category);

    if (selecionados.length === 0) {
      card.style.display = 'flex';
    } else {
      const corresponde = selecionados.includes(categoria);
      card.style.display = corresponde ? 'flex' : 'none';
    }
  });

  // Mostra ou esconde categorias
  categorias.forEach(categoria => {
    let cardsDaCategoria = [];
    let next = categoria.nextElementSibling;
    while (next && !next.classList.contains('category-title')) {
      if (next.classList.contains('service-card')) cardsDaCategoria.push(next);
      next = next.nextElementSibling;
    }
    const algumVisivel = cardsDaCategoria.some(card => card.style.display === 'flex');
    categoria.style.display = algumVisivel ? 'block' : 'none';
  });
}

// ------------------ LIMPAR FILTROS ------------------
if (clearBtn) {
  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkboxes.forEach(cb => cb.checked = false);
    atualizarSelecionados();
    if (searchForm) searchForm.reset();
    filtrarServicos();
  });
}

// ------------------ SUBMIT FORM ------------------
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    filtrarServicos();
  });
}

// Inicializa mostrando todos
filtrarServicos();
