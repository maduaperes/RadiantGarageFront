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

    // Usuários fixos para teste
    const usuariosTeste = [
      { tipo: "admin", email: "...", senha: "..." },
      { tipo: "cliente", email: "***", senha: "***" }
    ];

    // Verifica se o usuário existe e se as credenciais estão corretas
    const usuario = usuariosTeste.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuario) {
      feedback.textContent = "Email ou senha incorretos.";
      feedback.style.color = "red";
      return;
    }

    feedback.textContent = `Entrando como ${usuario.tipo}...`;
    feedback.style.color = "green";

    // Salva informações básicas do usuário
    localStorage.setItem(
      'lj_user',
      JSON.stringify({ name: usuario.tipo, contact: email })
    );

    // Redireciona conforme o tipo de usuário
    setTimeout(() => {
      if (usuario.tipo === "admin") {
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'agendamento.html';
      }
    }, 1500);
  });
});
