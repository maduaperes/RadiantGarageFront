const API = "http://localhost:3000/api";
const token = localStorage.getItem("token");

const listServicos = document.getElementById("listServicos");
const listAgendamentos = document.getElementById("listAgendamentos");
const nomeEl = document.getElementById("nome-estabelecimento");
const enderecoEl = document.getElementById("endereco-completo");
const contatoEl = document.getElementById("contato");
const enderecoBtn = document.getElementById("endereco");


if (!token) {
  window.location.href = "login.html";
}

async function carregarPerfil() {
try {
    const res = await fetch(`${API}/estabelecimentos/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Erro ao buscar estabelecimento");

    const estabelecimento = await res.json();

    const resEndereco = await fetch(`${API}/estabelecimentos/me/endereco`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const endereco = await resEndereco.json();

    if (!endereco) {
      window.location.href = "novo-endereco.html";
      return;
    }

    enderecoEl.innerHTML = `
      <strong>Endereço:</strong>
      ${endereco.rua}, ${endereco.numero} - ${endereco.cidade}, ${endereco.estado}
    `;

      const resContato = await fetch(`${API}/estabelecimentos/me/contato`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const contato = await resContato.json();

    if (!contato) {
      contatoEl.innerHTML = "<strong>Contato:</strong> Não cadastrado";
      return;
    }

    contatoEl.innerHTML = `
      <strong>Contato:</strong>
      ${contato.telefone} | ${contato.email}
    `;

    const nome = estabelecimento?.nome_estabelecimento || estabelecimento?.nome || "Não informado";

    nomeEl.textContent = `Ola, ${nome}`;

  } catch (err) {
    console.error(err);
    nomeEl.textContent = "Erro ao carregar informações";
  }
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
  carregarPerfil();
  carregarServicos();
  carregarAgendamentos();
});
