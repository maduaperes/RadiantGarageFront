const API_URL_SERVICOS = "http://localhost:3000/api/servicos";
const API_URL_PERFIL = "http://localhost:3000/api/auth/perfil";

document.addEventListener("DOMContentLoaded", () => {
    // Inicia o carregamento dos dados
    carregarPerfil();
    carregarServicos();
});

// ==========================================
// 1. GET - BUSCAR DADOS DO PERFIL
// ==========================================
async function carregarPerfil() {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(API_URL_PERFIL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });

        if (response.ok) {
            const perfil = await response.json();
            // FAT: Renderizando dados do estabelecimento no topo
            document.getElementById("nomeOficina").textContent = `Olá, ${perfil.nome || 'Oficina'}`;
            document.getElementById("endOficina").textContent = perfil.endereco || 'Endereço não cadastrado';
            document.getElementById("contatoOficina").textContent = perfil.contato || 'Contato não cadastrado';
        }
    } catch (err) {
        console.error("Erro ao carregar perfil:", err);
    }
}

// ==========================================
// 2. GET - BUSCAR E RENDERIZAR SERVIÇOS
// ==========================================
async function carregarServicos() {
    const list = document.getElementById("listServicos");

    try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL_SERVICOS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });

        if (!response.ok) throw new Error("Falha ao buscar serviços.");

        const servicos = await response.json();
        
        // Limpa a mensagem de "Carregando"
        list.innerHTML = "";

        if (servicos.length === 0) {
            list.innerHTML = "<li>Nenhum serviço cadastrado.</li>";
            return;
        }

        // FAT: Criando os itens da lista dinamicamente
        servicos.forEach(servico => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span><strong>${servico.nome_servico}</strong> - R$ ${parseFloat(servico.custo_servico).toFixed(2)}</span>
                <div class="actions-group">
                    <a href="editar-servico.html?id=${servico.id}" class="btn-edit">Alterar</a>
                    <button class="btn-delete" onclick="removerServico(${servico.id}, '${servico.nome_servico}')">Remover</button>
                </div>
            `;
            list.appendChild(li);
        });

    } catch (err) {
        console.error("Erro ao carregar serviços:", err);
        list.innerHTML = `<li style="color: #f87171;">Erro na conexão com o servidor.</li>`;
    }
}

// ==========================================
// 3. PUSH - REMOVER SERVIÇO (DELETE)
// ==========================================
async function removerServico(id, nome) {
    if (!confirm(`Deseja remover o serviço "${nome}"?`)) return;

    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${API_URL_SERVICOS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });

        if (response.ok) {
            alert("Removido com sucesso!");
            carregarServicos(); // FAT: Re-renderiza a lista atualizada
        } else {
            alert("Não foi possível remover o serviço.");
        }
    } catch (err) {
        console.error("Erro ao deletar:", err);
    }
}

// Lógica de Logout
const btnSair = document.getElementById("login");
if (btnSair && btnSair.textContent === "Sair") {
    btnSair.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = "index.html";
    });
}