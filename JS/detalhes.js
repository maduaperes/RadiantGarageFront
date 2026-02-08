const API = "http://localhost:3000/api";

const btnBack = document.getElementById("btnBack");
const loading = document.getElementById("loading");
const detalhesDiv = document.getElementById("detalhes");
const erroDiv = document.getElementById("erro");

btnBack?.addEventListener("click", () => window.history.back());

function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function carregarDetalhes() {
  const id = getIdFromURL();
  const token = localStorage.getItem("token");

  if (!id || !token) {
    erroDiv.textContent = "Agendamento inválido.";
    return;
  }

  try {
    const res = await fetch(`${API}/agendamentos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Erro ao buscar agendamento");

    const a = await res.json();

    document.getElementById("data").textContent =
      new Date(a.data_hora).toLocaleString("pt-BR");

    document.getElementById("cliente").textContent =
      a.cliente?.nome_cliente ?? "-";

    document.getElementById("servico").textContent =
      a.servico?.nome_servico ?? "-";

    document.getElementById("pagamento").textContent =
      a.pagamento;

    document.getElementById("observacao").textContent =
      a.observacao || "Sem observação";



    loading.style.display = "none";
    detalhesDiv.style.display = "block";

  } catch (err) {
    erroDiv.textContent = err.message;
    loading.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", carregarDetalhes);
