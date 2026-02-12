const form = document.getElementById("signupForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const feedback = document.getElementById("feedback");
const btnBack = document.getElementById("btnBack");

const REGISTER_URL = "http://localhost:3000/api/auth/register";
const LOGIN_URL = "http://localhost:3000/api/auth/login";

btnBack?.addEventListener("click", () => {
  window.history.back();
});

function showError(message, input) {
  feedback.textContent = message;
  feedback.style.color = "#f87171";
  input?.focus();
}

function showFeedback(message, type = "success") {
  feedback.textContent = message;
  feedback.style.color = type === "success" ? "#4ade80" : "#f87171";
}

function clearFeedback() {
  feedback.textContent = "";
}

async function loginUser(emailValue, passwordValue) {
  try {
    const res = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailValue, password: passwordValue })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || "Erro ao logar usuário.");
    }

    const token = data.session?.access_token;

    if (!token) {
      throw new Error("Token não retornado pelo login.");
    }

    localStorage.setItem("token", token);

    return true;
  } catch (err) {
    console.error(err);
    showFeedback("Cadastro realizado, mas falha no login: " + err.message, "error");
    return false;
  }
}


form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearFeedback();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) return showError("Informe o email.", email);
  if (!emailRegex.test(email.value)) return showError("Email inválido.", email);

  if (password.value.length < 6) return showError("A senha deve ter no mínimo 6 caracteres.", password);

  if (password.value !== confirmPassword.value) return showError("As senhas não coincidem.", confirmPassword);

  try {
    const registerRes = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value.trim(), password: password.value })
    });

    const registerData = await registerRes.json();

    if (!registerRes.ok) {
      throw new Error(registerData.message || "Erro ao cadastrar usuário.");
    }

    const loggedIn = await loginUser(email.value.trim(), password.value);
    if (!loggedIn) return;

    showFeedback("Cadastro e login realizados com sucesso!", "success");
    form.reset();

    setTimeout(() => {
      window.location.href = "novo-contato.html";
    }, 1000);

  } catch (err) {
    console.error(err);
    showFeedback(err.message || "Erro desconhecido.");
  }
});

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", () => {
    input.style.boxShadow = "none";
  });
});
