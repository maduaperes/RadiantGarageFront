document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const feedback = document.getElementById('feedback');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('password').value.trim();

    if (!email || !senha) {
      feedback.textContent = "Preencha email e senha.";
      feedback.style.color = "red";
      return;
    }

    // Usuário fixo pra teste
    const validEmail = "...";
    const validSenha = "...";

    if (email !== validEmail || senha !== validSenha) {
      feedback.textContent = "Email ou senha incorretos.";
      feedback.style.color = "red";
      return;
    }

    feedback.textContent = "Entrando em sua conta...";
    feedback.style.color = "green";

    localStorage.setItem('lj_user', JSON.stringify({ name: 'Cliente', contact: email }));

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  });
});
