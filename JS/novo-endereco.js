document.addEventListener('DOMContentLoaded', () => {
    const addressForm = document.getElementById('addressForm');
    const cepInput = document.getElementById('cep');
    const ruaInput = document.getElementById('rua');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const feedback = document.getElementById('feedback');
    const btnBack = document.getElementById('btnBack');

    if (!addressForm) return;

    function showFeedback(message, type = 'error') {
        feedback.textContent = message;
        feedback.style.color = type === 'success' ? 'lightgreen' : '#f87171';
    }

    function clearFeedback() {
        feedback.textContent = '';
    }

    // Botão voltar
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            window.history.back();
        });
    }

    // Submit do formulário
    addressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFeedback();

        const cep = cepInput.value.trim();
        const rua = ruaInput.value.trim();
        const bairro = bairroInput.value.trim();
        const cidade = cidadeInput.value.trim();
        const estado = estadoInput.value.trim();

        if (!cep || !rua || !bairro || !cidade || !estado) {
            showFeedback('Preencha todos os campos.');
            return;
        }

        const endereco = {
            cep,
            rua,
            bairro,
            cidade,
            estado,
            createdAt: new Date().toISOString()
        };

        const enderecos = JSON.parse(localStorage.getItem('enderecos')) || [];
        enderecos.push(endereco);
        localStorage.setItem('enderecos', JSON.stringify(enderecos));

        showFeedback('Endereço cadastrado com sucesso!', 'success');

        setTimeout(() => {
            addressForm.reset();
            clearFeedback();
            window.location.href = 'dashboard.html';
        }, 1000);
    });
});
