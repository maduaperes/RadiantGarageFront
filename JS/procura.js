// ==========================
// SELEÇÃO DE SERVIÇOS POR TAGS
// ==========================
const tags = document.querySelectorAll('.service-tags .tag');
let selectedServices = [];

tags.forEach(tag => {
  tag.addEventListener('click', () => {
    const value = tag.dataset.value;

    if (selectedServices.includes(value)) {
      selectedServices = selectedServices.filter(s => s !== value);
      tag.classList.remove('selected');
    } else {
      selectedServices.push(value);
      tag.classList.add('selected');
    }

    console.log('Serviços selecionados:', selectedServices);
  });
});

// ==========================
// FORMULARIO DE BUSCA
// ==========================
const searchForm = document.querySelector('.search-filters form');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(searchForm);
  const data = {
    servicos: selectedServices,
    urgencia: formData.get('urgencia') || '',
    data: formData.get('data') || '',
    horario: formData.get('horario') || '',
    tempo: formData.get('tempo') || '',
    atendimento: formData.get('atendimento') || '',
    localidade: formData.get('localidade') || ''
  };

  console.log('Busca realizada com os filtros:', data);

  // Aqui você pode adicionar a lógica para filtrar os cards
});

// ==========================
// BOTÃO LIMPAR FILTROS
// ==========================
const clearBtn = document.querySelector('.clear-btn');

clearBtn.addEventListener('click', () => {
  // Remove seleção das tags
  selectedServices = [];
  tags.forEach(tag => tag.classList.remove('selected'));

  // Reseta form
  searchForm.reset();

  console.log('Filtros limpos');
});
