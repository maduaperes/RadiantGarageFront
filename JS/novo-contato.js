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
const API_URL = "http://localhost:3000/api/contatos";

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

    // Validações
    if (!email) return showFeedback('Por favor, insira o email do contato.');
    if (!isValidEmail(email)) return showFeedback('Email inválido. Verifique o formato.');

    try {
        const token = localStorage.getItem('token'); // Token do Supabase

        const bodyData = {
            email,
            telefone: phone || null,
            celular: mobile || null
        };

        console.log("Dados enviados:", bodyData); // debug

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(bodyData)
        });

        const data = await response.json();

        if (!response.ok) {
            // Corrigido: usar 'error' que vem do backend
            throw new Error(data.error || 'Erro ao cadastrar contato.');
        }

        // ✅ Salvar apenas o id_contato no localStorage
        localStorage.setItem('currentContatoId', data.id_contato);

        showFeedback('Contato cadastrado com sucesso!', 'success');

        setTimeout(() => {
            contactForm.reset();
            clearFeedback();
            window.location.href = 'tipodeconta.html'; // ou outra página
        }, 1000);

    } catch (err) {
        console.error(err);
        showFeedback(err.message || 'Erro desconhecido.');
    }
}

// ===========================
// Evento de submit
// ===========================
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    cadastrarContato();
});
