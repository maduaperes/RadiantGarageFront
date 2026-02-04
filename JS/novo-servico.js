// Seleciona elementos do DOM
const serviceForm = document.getElementById('serviceForm');
const serviceName = document.getElementById('serviceName');
const serviceCategory = document.getElementById('serviceCategory');
const servicePrice = document.getElementById('servicePrice');
const serviceNotes = document.getElementById('serviceNotes');
const feedback = document.getElementById('feedback');
const btnBack = document.getElementById('btnBack');

// Função para mostrar feedback
function showFeedback(message, type = 'error') {
  feedback.textContent = message;
  feedback.style.color = type === 'error' ? 'red' : 'green';
}

// Função para limpar feedback
function clearFeedback() {
  feedback.textContent = '';
}

// Função para validar preço (apenas números e vírgula)
function isValidPrice(price) {
  const regex = /^\d{1,7}(,\d{2})?$/; // Ex: 250 ou 250,00
  return regex.test(price);
}

// Evento de clique no botão de voltar
btnBack.addEventListener('click', () => {
  window.history.back();
});

// Evento de submit do formulário
serviceForm.addEventListener('submit', (e) => {
  e.preventDefault(); // previne reload da página

  clearFeedback();

  const name = serviceName.value.trim();
  const category = serviceCategory.value.trim();
  const price = servicePrice.value.trim();
  const notes = serviceNotes.value.trim();

  // Validações
  if (!name) {
    showFeedback('Por favor, insira o nome do serviço.');
    return;
  }

  if (!category) {
    showFeedback('Por favor, insira a categoria do serviço.');
    return;
  }

  if (!price) {
    showFeedback('Por favor, insira o preço do serviço.');
    return;
  }

  if (!isValidPrice(price)) {
    showFeedback('Preço inválido. Use apenas números e vírgula. Ex: 250,00');
    return;
  }

  // Simulação de salvar no localStorage
  const services = JSON.parse(localStorage.getItem('services') || '[]');
  services.push({ name, category, price, notes });
  localStorage.setItem('services', JSON.stringify(services));

  showFeedback('Serviço cadastrado com sucesso!', 'success');

  // Limpa o formulário após 1 segundo
  setTimeout(() => {
    serviceForm.reset();
    clearFeedback();

    // redireciona para o dashboard
    window.location.href = "dashboard.html";
  }, 1000);
});
