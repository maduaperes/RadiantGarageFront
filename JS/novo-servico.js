const API = "http://localhost:3000/api";
const serviceForm = document.getElementById('serviceForm');
const serviceName = document.getElementById('serviceName');
const servicePrice = document.getElementById('servicePrice');
const serviceNotes = document.getElementById('serviceNotes');
const serviceCategory = document.getElementById('serviceCategory');
const feedback = document.getElementById('feedback');
const btnBack = document.getElementById('btnBack');

// --- FUNÇÕES DE FEEDBACK ---
function showFeedback(message, type = 'error') {
  feedback.textContent = message;
  feedback.style.color = type === 'error' ? 'red' : 'green';
}

function clearFeedback() {
  feedback.textContent = '';
}


btnBack?.addEventListener('click', (e) => {
  e.preventDefault();
  window.history.back();
});


async function loadCategories() {
  clearFeedback();

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      showFeedback("Usuário não autenticado.");
      return;
    }

    const res = await fetch(`${API}/categorias`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Erro categorias:", errorText);
      throw new Error("Erro ao buscar categorias");
    }

    const categorias = await res.json();

    serviceCategory.innerHTML =
      '<option value="" disabled selected hidden>Selecione a categoria</option>';

    categorias.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id_categoria ?? cat.id;
      option.textContent = cat.nome_categoria ?? cat.nome;
      serviceCategory.appendChild(option);
    });

  } catch (err) {
    console.error(err);
    showFeedback("Não foi possível carregar categorias.");
  }
}


async function cadastrarServico() {
  clearFeedback();

  const nome_servico = serviceName.value.trim();
  let custo_servico = servicePrice.value.trim();
  const descricao = serviceNotes.value.trim();
  const id_categoria_fk = parseInt(serviceCategory.value);
  const tempo_estipulado = 60;

  if (!nome_servico) return showFeedback("Insira o nome do serviço!");
  if (!custo_servico) return showFeedback("Insira o preço do serviço!");
  if (!id_categoria_fk) return showFeedback("Selecione uma categoria!");

  custo_servico = parseFloat(custo_servico.replace(",", "."));
  if (isNaN(custo_servico)) return showFeedback("Preço inválido!");

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API}/servicos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        nome_servico,
        custo_servico,
        descricao,
        id_categoria_fk,
        tempo_estipulado
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Erro ao cadastrar serviço");
    }

    showFeedback("Serviço cadastrado com sucesso!", "success");
    setTimeout(() => {
      serviceForm.reset();
      window.history.back();
    }, 800);

  } catch (err) {
    console.error(err);
    showFeedback(err.message);
  }
}


// --- EVENTOS ---
serviceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  cadastrarServico();
});

window.addEventListener('DOMContentLoaded', loadCategories);
