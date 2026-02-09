// ===========================
// Seleção dos elementos
// ===========================
const contactForm = document.getElementById('contactForm');
const contactEmail = document.getElementById('contactEmail');
const contactPhone = document.getElementById('contactPhone');
const contactMobile = document.getElementById('contactMobile');
const feedback = document.getElementById('feedback');
const btnBack = document.getElementById('btnBack');

// ===========================
// URL do backend
// ===========================
const API = "http://localhost:3000/api/contatos";

// ===========================
// Funções de feedback
// ===========================
function showFeedback(message, type = 'error') {
    feedback.textContent = message;
    feedback.style.color = type === 'error' ? 'red' : 'green';
}

function clearFeedback() {
    feedback.textContent = '';
}

// ===========================
// Validação de email
// ===========================
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ===========================
// Botão voltar
// ===========================
btnBack?.addEventListener('click', () => {
    window.history.back();
});

// ===========================
// Função para cadastrar contato
// ===========================
async function cadastrarContato() {
    clearFeedback();

    const email = contactEmail.value.trim();
    const phone = contactPhone.value.trim();
    const mobile = contactMobile.value.trim();

    if (!email) return showFeedback('Por favor, insira o email.');
    if (!isValidEmail(email)) return showFeedback('Email inválido.');

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return showFeedback('Sessão expirada. Faça login novamente.');
        }

        const bodyData = {
            email,
            telefone: phone || null,
            celular: mobile || null
        };

        console.log("Dados enviados:", bodyData);

        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bodyData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro ao cadastrar contato.');
        }

        // ❌ não salva mais id localmente
        // backend já resolve tudo pelo UUID do usuário

        showFeedback('Contato cadastrado com sucesso!', 'success');

        setTimeout(() => {
            window.location.href = 'tipodeconta.html';
        }, 800);

    } catch (err) {
        console.error(err);
        showFeedback(err.message);
    }
}

// ===========================
// Evento de submit
// ===========================
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    cadastrarContato();
});
