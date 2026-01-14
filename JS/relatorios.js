// ====== Sistema de Relatórios RadiantGarage ======
document.addEventListener("DOMContentLoaded", () => {
    // Seleção de elementos
    const btnFiltrar = document.getElementById("btn-filtrar");
    const btnLimpar = document.getElementById("btn-limpar");
    const tabelaCorpo = document.getElementById("tabela-relatorios");
    const tipoRelatorio = document.getElementById("tipo-relatorio");

    // Base de dados simulada
    const dadosSimulados = {
        servicos: [
            { data: "28/10/2025", alvo: "Maria Silva", desc: "Troca de Óleo", valor: "R$ 150,00", status: "concluido" },
            { data: "27/10/2025", alvo: "João Pereira", desc: "Revisão Geral", valor: "R$ 450,00", status: "pendente" }
        ],
        clientes: [
            { data: "25/10/2025", alvo: "Ricardo Santos", desc: "Cadastro Novo", valor: "---", status: "concluido" },
            { data: "24/10/2025", alvo: "Beatriz Lima", desc: "Atualização de Perfil", valor: "---", status: "concluido" },
            { data: "23/10/2025", alvo: "Fernando Costa", desc: "Cadastro Novo", valor: "---", status: "concluido" }
        ],
        financeiro: [
            { data: "28/10/2025", alvo: "Entrada", desc: "Venda de Peças", valor: "+ R$ 1.200,00", status: "concluido" },
            { data: "27/10/2025", alvo: "Saída", desc: "Pagamento Fornecedor", valor: "- R$ 800,00", status: "concluido" }
        ]
    };

    // Função para renderizar a tabela
    function atualizarTabela(tipo) {
        // Limpa a tabela
        tabelaCorpo.innerHTML = "";

        // Se for "geral", podemos juntar tudo ou mostrar uma padrão. Aqui mostraremos serviços por padrão.
        const categoria = tipo === "geral" ? "servicos" : tipo;
        const lista = dadosSimulados[categoria] || [];

        if (lista.length === 0) {
            tabelaCorpo.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nenhum registro encontrado.</td></tr>`;
            return;
        }

        // Insere as novas linhas
        lista.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.data}</td>
                <td>${item.alvo}</td>
                <td>${item.desc}</td>
                <td>${item.valor}</td>
                <td class="status ${item.status}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</td>
            `;
            tabelaCorpo.appendChild(tr);
        });
    }

    // 1. LÓGICA DO BOTÃO FILTRAR
    btnFiltrar.addEventListener("click", () => {
        const tipo = tipoRelatorio.value;
        const dataInicio = document.getElementById("data-inicio").value;
        const dataFim = document.getElementById("data-fim").value;

        // Validação simples
        if (!dataInicio || !dataFim) {
            alert("Por favor, selecione o período de datas.");
            return;
        }

        btnFiltrar.textContent = "Filtrando...";
        
        setTimeout(() => {
            atualizarTabela(tipo);
            btnFiltrar.textContent = "Aplicar Filtro";
        }, 500);
    });

    // 2. BOTÃO LIMPAR
    btnLimpar.addEventListener("click", () => {
        document.getElementById("data-inicio").value = "";
        document.getElementById("data-fim").value = "";
        tipoRelatorio.value = "geral";
        atualizarTabela("geral");
    });

    // 3. EXPORTAÇÕES (Alertas simples)
    document.getElementById("btn-pdf").onclick = () => alert("Exportando PDF...");
    document.getElementById("btn-excel").onclick = () => alert("Exportando Excel...");
});