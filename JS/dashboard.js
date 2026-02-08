const API = "http://localhost:3000/api";
const token = localStorage.getItem("token");

const listServicos = document.getElementById("listServicos");
const listAgendamentos = document.getElementById("listAgendamentos");

if (!token) {
  window.location.href = "login.html";
}

async function carregarServicos() {
  try {
    const res = await fetch(`${API}/servicos/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Erro ao buscar serviços");

    const servicos = await res.json();

    listServicos.innerHTML = "";

    servicos.forEach(servico => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span>${servico.nome_servico}</span>
        <div class="actions-group">
          <a href="editar-servico.html?id=${servico.id}" class="btn-edit">Alterar</a>
          <button class="btn-delete" onclick="deletarServico(${servico.id})">Remover</button>
        </div>
      `;

      listServicos.appendChild(li);
    });

  } catch (err) {
    console.error(err);
  }
}

async function carregarAgendamentos() {
  try {
    const res = await fetch(`${API}/agendamentos/estabelecimento`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Erro ao buscar agendamentos");

    const agendamentos = await res.json();

    listAgendamentos.innerHTML = "";

    agendamentos.forEach(a => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span>
          <strong>${new Date(a.data_hora).toLocaleDateString("pt-BR")}</strong>
          - ${a.cliente.nome_cliente}
          - ${a.servico.nome_servico}
        </span>
        <div class="actions-group">
          <a href="detalhes.html?id=${a.id}" class="btn-edit">Ver</a>
        </div>
      `;

      listAgendamentos.appendChild(li);
    });

  } catch (err) {
    console.error(err);
  }
}

async function deletarServico(id) {
  if (!confirm("Deseja remover este serviço?")) return;

  await fetch(`${API}/servicos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  carregarServicos();
}

document.addEventListener("DOMContentLoaded", () => {
  carregarServicos();
  carregarAgendamentos();
});
