document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm");
    const feedback = document.getElementById("feedback");

    const nameInput = document.getElementById("nameCliente");
    const emailInput = document.getElementById("emailCliente");
    const phoneInput = document.getElementById("phone");
    const cpfInput = document.getElementById("cpf");
    const passwordInput = document.getElementById("passwordCliente");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    // Máscara de telefone
    phoneInput.addEventListener("input", () => {
        let value = phoneInput.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 6) {
            phoneInput.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            phoneInput.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            phoneInput.value = value;
        }
    });

    // Máscara de CPF
    cpfInput.addEventListener("input", () => {
        let value = cpfInput.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        cpfInput.value = value;
    });

    // ✅ Validação confiável de CPF (AJUSTADA)
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos

        // 1. Verifica se tem 11 dígitos e se não é uma sequência repetida (ex: 111.111.111-11)
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        let resto;

        // --- Primeiro dígito verificador (9º índice) ---
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }

        resto = soma % 11;
        let dv1 = (resto < 2) ? 0 : 11 - resto;

        if (dv1 !== parseInt(cpf.charAt(9))) return false;

        // --- Segundo dígito verificador (10º índice) ---
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }

        resto = soma % 11;
        let dv2 = (resto < 2) ? 0 : 11 - resto;

        return dv2 === parseInt(cpf.charAt(10));
    }

    // Mensagens de feedback
    function showMessage(msg, type = "error") {
        feedback.textContent = msg;
        feedback.className = `feedback-message ${type}`;
    }

    // Validação e envio
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const cpf = cpfInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!name || !email || !phone || !cpf || !password || !confirmPassword) {
            showMessage("Por favor, preencha todos os campos.", "error");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            showMessage("E-mail inválido.", "error");
            return;
        }

        // AQUI USA A FUNÇÃO CORRIGIDA
        if (!validarCPF(cpf)) {
            showMessage("CPF inválido.", "error");
            return;
        }

        if (password.length < 6) {
            showMessage("A senha deve ter pelo menos 6 caracteres.", "error");
            return;
        }

        if (password !== confirmPassword) {
            showMessage("As senhas não coincidem.", "error");
            return;
        }

        // Simulação de envio/localStorage
        const novoCliente = { name, email, phone, cpf, password };
        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

        if (clientes.some(c => c.email === email)) {
            showMessage("Este e-mail já está cadastrado.", "error");
            return;
        }

        clientes.push(novoCliente);
        localStorage.setItem("clientes", JSON.stringify(clientes));

        showMessage("Cadastro realizado com sucesso! Redirecionando...", "success");

        setTimeout(() => {
            window.location.href = "agendamento.html";
        }, 2000);
    });
});