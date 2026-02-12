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

    userName.textContent = cliente.nome_cliente;
    userContact.textContent = `CPF: ${cliente.cpf}`;

    await listarAgendamentos();
    
  } catch (err) {
    console.error(err);
    userName.textContent = "Erro ao carregar perfil";
    userContact.textContent = "";
  }
}




async function listarAgendamentos() {
  const response = await fetch(`${API}/agendamentos/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const lista = await response.json();

  agendamentosContainer.innerHTML = "";

  if (!lista.length) {
    agendamentosContainer.innerHTML = "<p>Nenhum agendamento encontrado.</p>";
    return;
  }

  lista.forEach(a => {
    const div = document.createElement("div");
    div.classList.add("history-item");

    div.innerHTML = `
     <p><strong>Estabelecimento:</strong> ${a.servico?.estabelecimento?.nome_estabelecimento}</p>
     <p><strong>Serviço:</strong> ${a.servico?.nome_servico}</p>
      <p><strong>Data e hora:</strong> ${new Date(a.data_hora).toLocaleString('pt-BR')}</p>
      <p><strong>Pagamento:</strong> ${a.pagamento}</p>
      ${a.observacao ? `<p><strong>Observação:</strong> ${a.observacao}</p>` : ""}
    `;
    
    agendamentosContainer.appendChild(div);
  });
}


// Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", carregarPerfil);
