// =============================
// Botão voltar
// =============================
const btnBack = document.getElementById("btnBack");

if (btnBack) {
    btnBack.addEventListener("click", () => {
        window.history.back();
    });
}

// =============================
// Mensagem temporária + redirecionamento
// =============================
const cards = document.querySelectorAll(".account-card");
const feedback = document.getElementById("feedback");

cards.forEach(card => {
    card.addEventListener("click", (event) => {
        event.preventDefault(); // impede redirecionamento imediato

        const tipo = card.querySelector("h3").innerText;
        const destino = card.getAttribute("href");

        // Mensagem temporária no final da página
        feedback.textContent = `Você selecionou: ${tipo}`;
        feedback.classList.add("show");

        // Limpa depois
        setTimeout(() => {
            feedback.classList.remove("show");
        }, 1200);

        // Redireciona
        setTimeout(() => {
            window.location.href = destino;
        }, 1500);
    });
});
