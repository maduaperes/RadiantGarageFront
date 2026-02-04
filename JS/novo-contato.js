// Seleciona elementos do DOM
const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactPhone = document.getElementById('contactPhone');
const contactMobile = document.getElementById('contactMobile');
const feedback = document.getElementById('feedback');
const btnBack = document.getElementById('btnBack');

// Função para mostrar feedback
function showFeedback(message, type = 'error') {
    feedback.textContent = message;
    feedback.style.color = type === 'error' ? 'red' : 'green';
}

// Função para limpar feedback
function clearFeedback() {
    feedback.textContent = '';
}

// Função para validar email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Evento de clique no botão de voltar
btnBack.addEventListener('click', () => {
    window.history.back(); // volta para a página anterior
});

// Evento de submit do formulário
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // previne o reload da página

    clearFeedback();

    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const phone = contactPhone.value.trim();
    const mobile = contactMobile.value.trim();

    // Validações
    if (!name) {
        showFeedback('Por favor, insira o nome do contato.');
        return;
    }

    if (!email) {
        showFeedback('Por favor, insira o email do contato.');
        return;
    }

    if (!isValidEmail(email)) {
        showFeedback('Email inválido. Verifique o formato.');
        return;
    }

    // Simulação de salvar no localStorage
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({ name, email, phone, mobile });
    localStorage.setItem('contacts', JSON.stringify(contacts));

    showFeedback('Contato cadastrado com sucesso!', 'success');

    setTimeout(() => {
        contactForm.reset();
        clearFeedback();
        window.location.href = 'tipodeconta.html';
    }, 1000);
});
