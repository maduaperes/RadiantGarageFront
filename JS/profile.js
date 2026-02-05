const API = "http://localhost:3000/api";

const userName = document.getElementById("userName");
const userContact = document.getElementById("userContact");
const agendamentosContainer = document.getElementById("agendamentos");

const token = localStorage.getItem("token");

// Redireciona para login se não tiver token
if (!token) {
  window.location.href = "login.html";
}

// Função para carregar perfil do cliente
async function carregarPerfil() {
  try {
    // Buscar dados do cliente logado
    const resCliente = await fetch(`${API}/clientes/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!resCliente.ok) throw new Error("Não foi possível carregar os dados do cliente");

    const cliente = await resCliente.json();

    // Renderizar nome e CPF
    userName.textContent = cliente.nome_cliente;
    userContact.textContent = `CPF: ${cliente.cpf}`;

    // Agora carregar os agendamentos do cliente
    await carregarAgendamentos(cliente.id);
    
  } catch (err) {
    console.error(err);
    userName.textContent = "Erro ao carregar perfil";
    userContact.textContent = "";
  }
}

// Função para carregar agendamentos
async function carregarAgendamentos(idCliente) {
  try {
    const resAgend = await fetch(`${API}/agendamentos/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!resAgend.ok) throw new Error("Não foi possível carregar os agendamentos");

    const agendamentos = await resAgend.json();

    agendamentosContainer.innerHTML = "";

    if (agendamentos.length === 0) {
      agendamentosContainer.innerHTML = "<p>Nenhum agendamento encontrado.</p>";
      return;
    }

    agendamentos.forEach(a => {
      const div = document.createElement("div");
      div.classList.add("history-item");
      div.innerHTML = `
        <p><strong>Data:</strong> ${new Date(a.data_hora).toLocaleString('pt-BR')}</p>
        <p><strong>Status:</strong> ${a.status}</p>
        <p><strong>Pagamento:</strong> ${a.pagamento}</p>
        ${a.observacao ? `<p><strong>Observação:</strong> ${a.observacao}</p>` : ""}
      `;
      agendamentosContainer.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    agendamentosContainer.innerHTML = "<p>Erro ao carregar agendamentos.</p>";
  }
}

// Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", carregarPerfil);
