// roda só depois do HTML carregar
document.addEventListener("DOMContentLoaded", () => {

    const API = "http://localhost:3000/api";

    // =========================
    // ELEMENTOS
    // =========================
    const form = document.getElementById("signupForm");
    const nomeInput = document.getElementById("nome");
    const cnpjInput = document.getElementById("cnpj");
    const descInput = document.getElementById("description");
    const feedback = document.getElementById("feedback");
    const btnBack = document.getElementById("btnBack");

    if (!form) return console.error("Form signupForm não encontrado");

    // =========================
    // FEEDBACK
    // =========================
    function showFeedback(message, type = "error") {
        feedback.textContent = message;
        feedback.style.color = type === "error" ? "red" : "green";
    }

    // =========================
    // VOLTAR
    // =========================
    btnBack?.addEventListener("click", () => window.history.back());

    // =========================
    // SUBMIT
    // =========================
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = nomeInput.value.trim();
        const cnpj = cnpjInput.value.replace(/\D/g, "");
        const descricao = descInput.value.trim();

        if (!nome) return showFeedback("Informe o nome.");
        if (!descricao) return showFeedback("Informe a descrição.");

        try {
            const token = localStorage.getItem("token");
            if (!token) return showFeedback("Sessão expirada. Faça login novamente.");

            // 🔥 Primeiro, buscar o contato do usuário logado
            const contatoResponse = await fetch(`${API}/contatos/me`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!contatoResponse.ok) {
                throw new Error("Não foi possível obter o contato do usuário.");
            }

            const contatoData = await contatoResponse.json();
            const contatoId = contatoData.id_contato;

            if (!contatoId) {
                throw new Error("Contato não encontrado para este usuário.");
            }

            // 🔥 Criando o estabelecimento com o id do contato
            const bodyData = {
                nome_estabelecimento: nome,
                cnpj,
                descricao,
                id_contato: contatoId // associa o estabelecimento ao contato do usuário
            };

            const response = await fetch(`${API}/estabelecimentos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(bodyData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao cadastrar estabelecimento");
            }

            showFeedback("Estabelecimento cadastrado com sucesso!", "success");

            setTimeout(() => {
                window.location.href = "novo-endereco.html";
            }, 800);

        } catch (err) {
            console.error(err);
            showFeedback(err.message, "error");
        }
    });

});
