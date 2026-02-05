document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const cnpjInput = document.getElementById('cpf'); // ID conforme seu HTML
    const feedback = document.getElementById('feedback');
    const btnBack = document.getElementById('btnBack');

    // 1. Máscara de CNPJ (00.000.000/0001-00)
    cnpjInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove o que não é número
        
        if (value.length <= 14) {
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        }
        
        e.target.value = value;
    });

    // 2. Validação de CNPJ (Algoritmo Oficial)
    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj === '' || cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0)) return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(1)) return false;

        return true;
    }

    // 3. Gerenciar o envio
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const cnpj = cnpjInput.value;
        const descricao = document.getElementById('description').value.trim();

        // Validação de campos
        if (nome.length < 3) {
            showFeedback("Insira o nome do estabelecimento.", "error");
            return;
        }

        if (!validarCNPJ(cnpj)) {
            showFeedback("CNPJ inválido. Verifique os números.", "error");
            return;
        }

        if (descricao.length < 10) {
            showFeedback("A descrição deve ter pelo menos 10 caracteres.", "error");
            return;
        }

        // Sucesso
        showFeedback("Estabelecimento cadastrado com sucesso!", "success");
        
        console.log("Dados salvos:", { nome, cnpj, descricao });

        setTimeout(() => {
            window.location.href = "dashboard.html"; 
        }, 2000);
    });

    // Botão Voltar
    if(btnBack) {
        btnBack.addEventListener('click', () => window.history.back());
    }

    // Função de Feedback (Corrigida para não misturar cores)
    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = `feedback-message ${type}`;
        feedback.style.display = "block";
    }
});