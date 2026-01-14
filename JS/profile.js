// ==========================================
// 1. RENDERIZAÇÃO DO HISTÓRICO DE SERVIÇOS
// ==========================================
const historyData = [
    { servico: "Lavagem Completa", data: "05/10/2025", preco: "R$ 60,00", status: "concluido" },
    { servico: "Polimento", data: "29/09/2025", preco: "R$ 120,00", status: "concluido" },
    { servico: "Higienização Interna", data: "15/09/2025", preco: "R$ 80,00", status: "concluido" },
];

const historyContainer = document.getElementById("history");

if (historyContainer) {
    if (historyData.length > 0) {
        historyContainer.innerHTML = historyData
            .map(item => `
                <div class="history-item">
                    <p><strong>${item.servico}</strong> - ${item.data}</p>
                    <p style="font-size: 0.8rem; color: #94a3b8;">Valor: ${item.preco}</p>
                    <span class="status ${item.status}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                </div>
            `).join("");
    } else {
        historyContainer.innerHTML = "<p style='font-size: 0.85rem; color: #94a3b8;'>Nenhum serviço encontrado.</p>";
    }
}

// ==========================================
// 2. SELEÇÃO DE ELEMENTOS (MODAIS E BOTÕES)
// ==========================================
const editModal = document.getElementById("editModal");
const passwordModal = document.getElementById("passwordModal");
const vehicleModal = document.getElementById("vehicleModal");

const editBtn = document.getElementById("editProfileBtn");
const passwordBtn = document.getElementById("changePasswordBtn");
const addVehicleBtn = document.querySelector(".vehicles-section .btn-primary");

// ==========================================
// 3. CONTROLE DE ABERTURA DOS MODAIS
// ==========================================
if (editBtn) editBtn.onclick = () => editModal.classList.remove("hidden");
if (passwordBtn) passwordBtn.onclick = () => passwordModal.classList.remove("hidden");
if (addVehicleBtn) addVehicleBtn.onclick = () => vehicleModal.classList.remove("hidden");

// ==========================================
// 4. CONTROLE DE FECHAMENTO (BOTÕES CANCELAR)
// ==========================================
document.getElementById("cancelEdit").onclick = () => fecharModal(editModal);
document.getElementById("cancelPassword").onclick = () => fecharModal(passwordModal);
document.getElementById("cancelVehicle").onclick = () => fecharModal(vehicleModal);

// Fechar ao clicar fora do conteúdo branco do modal
window.onclick = (event) => {
    if (event.target == editModal) fecharModal(editModal);
    if (event.target == passwordModal) fecharModal(passwordModal);
    if (event.target == vehicleModal) fecharModal(vehicleModal);
};

function fecharModal(modal) {
    modal.classList.add("hidden");
}

// ==========================================
// 5. AÇÕES DE SALVAR
// ==========================================

// Salvar Perfil
document.getElementById("saveEdit").onclick = () => {
    const nameInput = document.getElementById("editName").value.trim();
    const emailInput = document.getElementById("editEmail").value.trim();

    if (nameInput) document.getElementById("userName").textContent = nameInput;
    if (emailInput) document.getElementById("userContact").textContent = emailInput;

    document.getElementById("editName").value = "";
    document.getElementById("editEmail").value = "";
    fecharModal(editModal);
};

// Alterar Senha
document.getElementById("savePassword").onclick = () => {
    const newPass = document.getElementById("newPassword").value;

    if (newPass.length < 6) {
        alert("A nova senha deve ter pelo menos 6 caracteres.");
        return;
    }
    
    alert("Senha alterada com sucesso!");
    document.getElementById("oldPassword").value = "";
    document.getElementById("newPassword").value = "";
    fecharModal(passwordModal);
};

// Adicionar Veículo
document.getElementById("saveVehicle").onclick = () => {
    const model = document.getElementById("carModel").value.trim();
    const plate = document.getElementById("carPlate").value.trim();

    if (!model || !plate) {
        alert("Preencha todos os campos do veículo.");
        return;
    }

    const vehicleList = document.querySelector(".vehicles-section .history-list");
    const novoVeiculo = document.createElement("div");
    novoVeiculo.className = "history-item";
    novoVeiculo.innerHTML = `
        <p><strong>${model}</strong> - ${plate}</p>
        <span class="status concluido">Ativo</span>
    `;

    vehicleList.appendChild(novoVeiculo);
    document.getElementById("carModel").value = "";
    document.getElementById("carPlate").value = "";
    fecharModal(vehicleModal);
};

// ==========================================
// 6. FUNÇÃO DE LOGOUT
// ==========================================
function logout() {
    if (confirm("Deseja realmente sair da conta?")) {
        window.location.href = "login.html";
    }
}