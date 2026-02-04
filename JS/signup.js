// =============================
// Seleção dos elementos
// =============================
const form = document.getElementById("signupForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const feedback = document.getElementById("feedback");
const btnBack = document.getElementById("btnBack");

// =============================
// Botão voltar
// =============================
if (btnBack) {
  btnBack.addEventListener("click", () => {
    window.history.back();
  });
}

// =============================
// Validação do formulário
// =============================
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    feedback.textContent = "";
    feedback.style.color = "";

    // Validação email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      feedback.textContent = "Informe o email.";
      feedback.style.color = "#f87171";
      email.focus();
      return;
    }

    if (!emailRegex.test(email.value)) {
      feedback.textContent = "Email inválido.";
      feedback.style.color = "#f87171";
      email.focus();
      return;
    }

    // Validação senha
    if (password.value.length < 6) {
      feedback.textContent = "A senha deve ter no mínimo 6 caracteres.";
      feedback.style.color = "#f87171";
      password.focus();
      return;
    }

    // Confirmação de senha
    if (password.value !== confirmPassword.value) {
      feedback.textContent = "As senhas não coincidem.";
      feedback.style.color = "#f87171";
      confirmPassword.focus();
      return;
    }

    // =============================
    // Sucesso
    // =============================
    feedback.textContent = "Cadastro realizado com sucesso!";
    feedback.style.color = "#4ade80";

    form.reset();

    setTimeout(() => {
      window.location.href = "novo-contato.html";
    }, 1000);
  });
}

// =============================
// Remove erro ao digitar
// =============================
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", () => {
    input.style.boxShadow = "none";
  });
});
