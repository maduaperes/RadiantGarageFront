const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const feedback = document.getElementById('feedback');
const btnBack = document.getElementById('btnBack');

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showFeedback(message, type = 'error') {
  feedback.textContent = message;
  feedback.style.color = type === 'error' ? 'red' : 'green';
}

function clearFeedback() {
  feedback.textContent = '';
}

btnBack.addEventListener('click', () => {
  window.history.back();
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  clearFeedback();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showFeedback('Por favor, preencha todos os campos.');
    return;
  }

  if (!isValidEmail(email)) {
    showFeedback('Por favor, insira um email válido.');
    return;
  }

  /* ==========================
     TESTE DE LOGIN
  ========================== */

  // CLIENTE
  if (email === 'cliente@exemplo.com' && password === '123456') {
    showFeedback('Login realizado com sucesso! (Cliente)', 'success');

    setTimeout(() => {
      window.location.href = 'agendamento.html';
    }, 1000);
    return;
  }

  // ESTABELECIMENTO
  if (email === 'admin@exemplo.com' && password === '123456') {
    showFeedback('Login realizado com sucesso! (Estabelecimento)', 'success');

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
    return;
  }

  // ERRO
  showFeedback('Email ou senha incorretos.');
});
