// URL da sua API para atualizar o perfil do usuário
const API_URL = "http://localhost:3000/api/auth/perfil"; 

const btnBack = document.getElementById("btnBack");
const cards = document.querySelectorAll(".account-card");
const feedback = document.getElementById("feedback");

// Evento Voltar
if (btnBack) {
    btnBack.addEventListener("click", () => {
        window.history.back();
    });
}

// Lógica de Seleção e Envio (GET, PUSH e FAT)
cards.forEach(card => {
    card.addEventListener("click", async (event) => {
        event.preventDefault(); // Pausa o redirecionamento para processar o PUSH

        const tipoConta = card.getAttribute("data-type");
        const destino = card.getAttribute("href");
        const token = localStorage.getItem('token');

        // FAT: Feedback visual imediato
        feedback.textContent = `Selecionado: ${tipoConta.toUpperCase()}. Salvando...`;
        feedback.style.color = "#4ade80";
        feedback.style.display = "block";

        try {
            // Estrutura de PUSH solicitada
            const bodyData = {
                tipo: tipoConta,
                atualizado_em: new Date().toISOString()
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(bodyData)
            });

            // Se o backend aceitar ou se o token for válido, prossegue
            if (response.ok || response.status === 404) {
                // Redireciona para o formulário específico
                setTimeout(() => {
                    window.location.href = destino;
                }, 1000);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro ao salvar perfil");
            }

        } catch (err) {
            console.error("Erro na requisição:", err);
            // Mesmo com erro de rota (caso não exista), permite o fluxo de teste
            setTimeout(() => {
                window.location.href = destino;
            }, 1200);
        }
    });
});