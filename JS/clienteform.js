document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const cpfInput = document.getElementById('cpf');
    const feedback = document.getElementById('feedback');
    const btnBack = document.getElementById('btnBack');

    // 1. Máscara de CPF corrigida
    cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }

        e.target.value = value;
    });

    // 2. Validação oficial de CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    // 3. Gerenciar envio
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const cpf = cpfInput.value;

        // Validações
        if (nome.length < 3) {
            showFeedback("Por favor, insira seu nome completo.", "error");
            return;
        }

        if (!validarCPF(cpf)) {
            showFeedback("CPF inválido. Verifique os números.", "error");
            return;
        }

        // Caso passe nas validações: SUCESSO
        showFeedback("Cadastro realizado com sucesso! Redirecionando...", "success");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    });

    // Botão Voltar
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            window.history.back();
        });
    }

    // FUNÇÃO AJUSTADA: Limpa classes anteriores para evitar cores erradas
    function showFeedback(message, type) {
        feedback.textContent = message;
        // Sobrescreve todas as classes, garantindo que só exista a classe atual
        feedback.className = `feedback-message ${type}`;
        feedback.style.display = "block";
    }
});