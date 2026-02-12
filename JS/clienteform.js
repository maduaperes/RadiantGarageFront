document.addEventListener("DOMContentLoaded", () => {

    const API = "http://localhost:3000/api";

    // ELEMENTOS
    const form = document.getElementById("signupForm");
    const nomeInput = document.getElementById("nome");
    const cpfInput = document.getElementById("cpf");
    const feedback = document.getElementById("feedback");
    const btnBack = document.getElementById("btnBack");

    if (!form) return console.error("signupForm não encontrado");

    // FUNÇÃO DE FEEDBACK
    function showFeedback(msg, type = "error") {
        feedback.textContent = msg;
        feedback.style.color = type === "error" ? "red" : "green";
    }

    // BOTÃO VOLTAR
    btnBack?.addEventListener("click", () => window.history.back());

    // SUBMIT DO FORMULÁRIO
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = nomeInput.value.trim();
        const cpf = cpfInput.value.replace(/\D/g, '');

        if (!nome) {
            return showFeedback("O nome do cliente é obrigatório.");
        }

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return showFeedback("Sessão expirada. Faça login novamente.");
            }

            // 1️⃣ Buscar o contato do usuário logado
            const contatoResponse = await fetch(`${API}/contatos/me`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!contatoResponse.ok) {
                throw new Error("Não foi possível obter o contato do usuário.");
            }

            const contatoData = await contatoResponse.json();
            const contatoId = contatoData.id_contato; // pegar o id_contato da tabela contato

            if (!contatoId) {
                throw new Error("Contato não encontrado para este usuário.");
            }

            // 2️⃣ Criar cliente com o id do contato
            const clienteBody = {
                nome_cliente: nome,
                cpf: cpf,
                id_contato: contatoId
            };

            const clienteResponse = await fetch(`${API}/clientes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(clienteBody)
            });

            const clienteData = await clienteResponse.json();

            if (!clienteResponse.ok) {
                throw new Error(clienteData.error || "Erro ao cadastrar cliente");
            }

            showFeedback("Cliente cadastrado com sucesso!", "success");

            setTimeout(() => {
                window.location.href = "index.html";
            }, 800);

        } catch (err) {
            console.error(err);
            showFeedback(err.message, "error");
        }
    });

});
