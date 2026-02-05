const REGISTER_URL = "http://localhost:3000/api/auth/register";
const LOGIN_URL = "http://localhost:3000/api/auth/login";

const form = document.getElementById("signupForm");
const feedback = document.getElementById("feedback");

function showFeedback(message, isError = true) {
  feedback.textContent = message;
  feedback.style.color = isError ? "#f87171" : "#4ade80";
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validação básica antes do Push
  if (password !== confirmPassword) {
    return showFeedback("As senhas não coincidem.");
  }

  if (password.length < 6) {
    return showFeedback("A senha deve ter pelo menos 6 caracteres.");
  }

  try {
    // 1. Requisição de Registro (POST)
    const registerResponse = await fetch(REGISTER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const registerData = await registerResponse.json();

    if (!registerResponse.ok) {
      throw new Error(registerData.error || "Erro ao criar conta.");
    }

    // 2. Requisição de Login Automático (conforme seu modelo)
    const loginResponse = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error("Conta criada, mas erro ao logar automaticamente.");
    }

    // Salvando o token do Supabase (data.session.access_token ou data.token)
    // Ajustado conforme o retorno padrão do seu authService
    const token = loginData.session?.access_token || loginData.token;
    if (token) {
      localStorage.setItem("token", token);
    }

    showFeedback("Conta criada com sucesso! Redirecionando...", false);

    setTimeout(() => {
      window.location.href = "novo-contato.html";
    }, 1500);

  } catch (err) {
    console.error(err);
    showFeedback(err.message);
  }
});