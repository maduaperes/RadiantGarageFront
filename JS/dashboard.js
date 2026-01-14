// ====== Sistema Unificado RadiantGarage ======
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. GERENCIAMENTO DE GRÁFICOS (Dashboard)
    const ctxPerformance = document.getElementById('performanceChart');
    if (ctxPerformance) {
        new Chart(ctxPerformance, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
                datasets: [{
                    label: 'Serviços Concluídos',
                    data: [20, 25, 30, 28, 35, 40, 38, 45, 50, 47],
                    backgroundColor: '#4f46e533',
                    borderColor: '#4f46e5ff',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: 'rgba(249, 115, 22, 1)',
                    pointBorderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { labels: { color: '#e6eef8' } } },
                scales: {
                    x: { ticks: { color: '#e6eef8' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                    y: { ticks: { color: '#e6eef8' }, grid: { color: 'rgba(255,255,255,0.1)' } }
                }
            }
        });
    }

    const ctxRevenue = document.getElementById('revenueChart');
    if (ctxRevenue) {
        new Chart(ctxRevenue, {
            type: 'bar',
            data: {
                labels: ['Troca de óleo', 'Revisão completa', 'Alinhamento', 'Balanceamento'],
                datasets: [{
                    label: 'Receita (R$)',
                    data: [1500, 2000, 1200, 1800],
                    backgroundColor: ['#4f46e5ff', '#4e46e5ff', '#4f46e5ff', '#4e46e5ff'],
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: (v) => 'R$ ' + v, color: '#e6eef8' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    x: { ticks: { color: '#e6eef8' }, grid: { color: 'rgba(255,255,255,0.1)' } }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    // 2. DADOS SIMULADOS PARA "VER TODOS" (Dashboard)
    const dadosCompletos = {
        servicos: [
            "Manutenção do Motor", "Combustão e Injeção",
            "Lavagem Simples/ Completa", "Diagnóstico e Revisão Geral",
            "Ar e Climatização", "Polimento"
        ],
        clientes: [
            "João Silva", "Maria Souza", "Carlos Oliveira", "Ana Pereira",
            "Ricardo Santos", "Beatriz Lima", "Fernando Costa", "Julia Gomes"
        ],
        agendamentos: [
            "05/10 - João Silva - Troca de óleo",
            "06/10 - Maria Souza - Revisão completa",
            "07/10 - Carlos Oliveira - Alinhamento",
            "08/10 - Ricardo Santos - Balanceamento",
            "09/10 - Beatriz Lima - Lavagem"
        ]
    };

    let tipoListaAtual = ""; // Controla qual lista o modal está exibindo

    // 3. GERENCIAMENTO DE MODAIS
    const modais = {
        edit: document.getElementById("editModal"),
        password: document.getElementById("passwordModal"),
        vehicle: document.getElementById("vehicleModal"),
        address: document.getElementById("addressModal"),
        promo: document.getElementById("promoModal"),
        list: document.getElementById("listModal")
    };

    // Referências extras para o Modal de Lista
    const modalListContent = document.getElementById("modalListContent");
    const modalTitle = document.getElementById("modalTitle");
    const editListBtn = document.getElementById("editListBtn"); // Você deve adicionar este ID no botão de editar do modal

    // Função para renderizar o conteúdo do modal (Modo Visualização ou Edição)
    const renderModalList = (isEditing = false) => {
        const items = dadosCompletos[tipoListaAtual] || [];
        modalListContent.innerHTML = items.map((item, index) => `
            <div class="history-item" style="margin-bottom: 8px;">
                ${isEditing 
                    ? `<input type="text" value="${item}" class="modal-edit-input" data-index="${index}" style="width:100%; padding:5px; background: #0b1220; color: #fff; border: 1px solid #413ba7; border-radius: 4px;">` 
                    : `<p>${item}</p>`}
            </div>
        `).join("");

        // Troca o texto do botão de edição se ele existir
        if (editListBtn) {
            editListBtn.textContent = isEditing ? "Salvar Itens" : "Editar Lista";
        }
    };

    // Abertura do Modal "Ver Todos"
    document.querySelectorAll(".view-all").forEach(btn => {
        btn.onclick = () => {
            tipoListaAtual = btn.getAttribute("data-type");
            const cardTitle = btn.parentElement.querySelector("h3").textContent;
            modalTitle.textContent = "Lista: " + cardTitle;
            renderModalList(false); // Abre sempre em modo visualização
            modais.list.classList.remove("hidden");
        };
    });

    // Lógica do Botão Editar/Salvar dentro do Modal de Lista
    if (editListBtn) {
        editListBtn.onclick = () => {
            const isEditing = editListBtn.textContent === "Salvar Itens";
            
            if (isEditing) {
                // SALVAR: Coleta os valores dos inputs
                const inputs = document.querySelectorAll(".modal-edit-input");
                const novosValores = Array.from(inputs).map(input => input.value.trim());
                
                // Atualiza a base de dados
                dadosCompletos[tipoListaAtual] = novosValores;
                
                // Atualiza o card na dashboard (primeiros 4 itens)
                const cardUl = document.querySelector(`.view-all[data-type="${tipoListaAtual}"]`).parentElement.querySelector("ul");
                if (cardUl) {
                    cardUl.innerHTML = novosValores.slice(0, 4).map(v => `<li>${v}</li>`).join("");
                }

                renderModalList(false); // Volta para visualização
            } else {
                // EDITAR: Entra no modo de edição
                renderModalList(true);
            }
        };
    }

    // Função auxiliar para abrir modais simples
    const setupOpen = (btnId, modal) => {
        const btn = document.getElementById(btnId);
        if (btn && modal) btn.onclick = () => modal.classList.remove("hidden");
    };

    setupOpen("editProfileBtn", modais.edit);
    setupOpen("changePasswordBtn", modais.password);
    setupOpen("editAddressBtn", modais.address);
    setupOpen("editPromoBtn", modais.promo);
    
    if (document.getElementById("closeListModal")) {
        document.getElementById("closeListModal").onclick = () => modais.list.classList.add("hidden");
    }

    // Configurar Botões Cancelar/Fechar
    const cancelMap = [
        { id: "cancelEdit", modal: modais.edit },
        { id: "cancelPassword", modal: modais.password },
        { id: "cancelVehicle", modal: modais.vehicle },
        { id: "cancelAddress", modal: modais.address },
        { id: "cancelPromo", modal: modais.promo }
    ];

    cancelMap.forEach(item => {
        const btn = document.getElementById(item.id);
        if (btn && item.modal) btn.onclick = () => item.modal.classList.add("hidden");
    });

    // 4. LÓGICA DE SALVAMENTO (Perfil e Endereço)
    if (document.getElementById("savePromo")) {
        document.getElementById("savePromo").onclick = () => {
            for (let i = 1; i <= 3; i++) {
                const input = document.getElementById(`inputPromo${i}`);
                const text = document.getElementById(`promoText${i}`);
                if (input && text) text.textContent = input.value || text.textContent;
            }
            modais.promo.classList.add("hidden");
        };
    }

    if (document.getElementById("saveAddress")) {
        document.getElementById("saveAddress").onclick = () => {
            const street = document.getElementById("editStreet").value.trim();
            const city = document.getElementById("editCity").value.trim();
            if (street && city) {
                const addrLabel = document.getElementById("userAddress");
                if (addrLabel) addrLabel.textContent = `📍 ${street} - ${city}`;
            }
            modais.address.classList.add("hidden");
        };
    }

    // Fechar ao clicar fora
    window.onclick = (event) => {
        Object.values(modais).forEach(modal => {
            if (modal && event.target === modal) modal.classList.add("hidden");
        });
    };
});

function logout() {
    if (confirm("Deseja realmente sair da conta?")) {
        window.location.href = "login.html";
    }
}