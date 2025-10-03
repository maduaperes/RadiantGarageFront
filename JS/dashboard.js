// ==========================
// Serviços disponíveis
// ==========================
const services = [
  { id: 1, name: 'Lavagem Simples', price: 'R$ 25', icon: 'fa-car' },
  { id: 2, name: 'Lavagem Completa', price: 'R$ 50', icon: 'fa-bubbles' },
  { id: 3, name: 'Estética Automotiva', price: 'R$ 120', icon: 'fa-star' },
  { id: 4, name: 'Polimento', price: 'R$ 200', icon: 'fa-spray-can-sparkles' }
];

// ==========================
// Função para renderizar serviços
// ==========================
function renderServices() {
  const list = document.getElementById('servicesList');
  if (!list) return;

  list.innerHTML = ''; // limpa antes de popular

  services.forEach(service => {
    const serviceEl = document.createElement('div');
    serviceEl.className = 'service';
    serviceEl.setAttribute('role', 'listitem');
    serviceEl.setAttribute('tabindex', '0');
    serviceEl.setAttribute('aria-label', `Serviço: ${service.name}`);

    serviceEl.innerHTML = `
      <i class="fa-solid ${service.icon} fa-2x" aria-hidden="true"></i>
      <p><strong>${service.name}</strong></p>
      <div class="muted">${service.price}</div>
    `;
    
    serviceEl.addEventListener('click', () => {
      localStorage.setItem('lj_selected', JSON.stringify(service));
      location.href = 'agendamento.html';
    });

    list.appendChild(serviceEl);
  });
}

// ==========================
// Exibir nome do usuário
// ==========================
function renderUserName() {
  const userNameEl = document.getElementById('userName');
  if (!userNameEl) return;

  const user = JSON.parse(localStorage.getItem('lj_user') || '{}');
  userNameEl.textContent = user.name ? `👋 Olá, ${user.name}` : '👋 Olá';
}

// ==========================
// Configurar botões
// ==========================
function setupButtons() {
  const quickBtn = document.getElementById('quickSchedule');
  if (quickBtn) {
    quickBtn.addEventListener('click', () => {
      location.href = 'agendamento.html';
    });
  }

  const btnBack = document.getElementById('btnBack');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      location.href = 'splash.html';
    });
  }
}

// ==========================
// Inicialização
// ==========================
function initDashboard() {
  renderServices();
  renderUserName();
  setupButtons();
}

// Executar
document.addEventListener('DOMContentLoaded', initDashboard);
