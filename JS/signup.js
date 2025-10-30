// =============================
// Função de Máscaras Automáticas
// =============================
function aplicarMascara(input, tipo) {
  input.addEventListener("input", () => {
    let valor = input.value.replace(/\D/g, "");

    if (tipo === "cnpj") {
      valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
      valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
      valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
      input.value = valor.substring(0, 18);
    }

    if (tipo === "telefone") {
      if (valor.length <= 10) {
        valor = valor.replace(/^(\d{2})(\d{4})(\d)/, "($1) $2-$3");
      } else {
        valor = valor.replace(/^(\d{2})(\d{5})(\d)/, "($1) $2-$3");
      }
      input.value = valor.substring(0, 15);
    }

    if (tipo === "cep") {
      valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
      input.value = valor.substring(0, 9);
    }
  });
}

// =============================
// Inicialização de máscaras
// =============================
window.addEventListener("DOMContentLoaded", () => {
  aplicarMascara(document.getElementById("cnpj"), "cnpj");
  aplicarMascara(document.getElementById("telefone"), "telefone");
  aplicarMascara(document.getElementById("cep"), "cep");
});

// =============================
// Validação do formulário
// =============================
document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const feedback = document.getElementById("feedback");
  feedback.innerHTML = "";
  feedback.style.color = "";

  // Campos obrigatórios
  const requiredFields = [
    "nameEstab",
    "cnpj",
    "endereco",
    "cidade",
    "estado",
    "cep",
    "telefone",
    "emailEstab",
    "passwordEstab"
  ];

  let allFilled = true;

  // Verifica se todos os campos obrigatórios estão preenchidos
  requiredFields.forEach((id) => {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      allFilled = false;
      field.style.boxShadow = "0 0 8px rgba(255, 80, 80, 0.6)";
    } else {
      field.style.boxShadow = "none";
    }
  });

  if (!allFilled) {
    feedback.textContent = "Por favor, preencha todos os campos obrigatórios.";
    feedback.style.color = "#ff6666";
    return;
  }

  // =============================
  // Validações adicionais
  // =============================

  // Validação de CNPJ (básica)
  const cnpj = document.getElementById("cnpj").value.replace(/\D/g, "");
  if (cnpj.length !== 14) {
    feedback.textContent = "CNPJ inválido. Deve conter 14 dígitos.";
    feedback.style.color = "#ff6666";
    document.getElementById("cnpj").style.boxShadow = "0 0 8px rgba(255, 80, 80, 0.6)";
    return;
  }

  // Validação de e-mail
  const email = document.getElementById("emailEstab").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedback.textContent = "Por favor, insira um email válido.";
    feedback.style.color = "#ff6666";
    document.getElementById("emailEstab").style.boxShadow = "0 0 8px rgba(255, 80, 80, 0.6)";
    return;
  }

  // Validação de senha
  const senha = document.getElementById("passwordEstab").value;
  if (senha.length < 6) {
    feedback.textContent = "A senha deve ter no mínimo 6 caracteres.";
    feedback.style.color = "#ff6666";
    document.getElementById("passwordEstab").style.boxShadow = "0 0 8px rgba(255, 80, 80, 0.6)";
    return;
  }

  // =============================
  // Se tudo estiver certo
  // =============================
  feedback.textContent = "Cadastro realizado com sucesso!";
  feedback.style.color = "#7CFC00";

  // Limpa o formulário após sucesso
  this.reset();

  // Exemplo: redirecionar após 2 segundos
  // setTimeout(() => window.location.href = "login.html", 2000);

  // Caso tenha backend:
  // const formData = new FormData(this);
  // fetch("/api/estabelecimento", { method: "POST", body: formData });
});

// =============================
// Feedback visual ao digitar
// =============================
const inputs = document.querySelectorAll("input, textarea");
inputs.forEach(input => {
  input.addEventListener("input", () => {
    input.style.boxShadow = "none";
  });
});
