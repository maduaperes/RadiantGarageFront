// Botão de voltar
document.getElementById("btnBack").addEventListener("click", () => {
  location.href = "dashboard.html";
});

// Função para coletar valores de checkboxes múltiplas
function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
    .map(input => input.value);
}

// Formata o campo preço enquanto digita
const priceInput = document.getElementById("servicePrice");
priceInput.addEventListener("input", (e) => {
  let value = e.target.value;

  // Remove tudo que não é número
  value = value.replace(/\D/g, "");

  // Converte para reais (2 casas decimais)
  value = (parseInt(value || "0") / 100).toFixed(2);

  // Formata com vírgula como decimal
  value = value.replace(".", ",");

  // Adiciona R$
  e.target.value = value;
});

// Formulário
document.getElementById("serviceForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("serviceName").value.trim();
  const category = document.getElementById("serviceCategory").value.trim();
  const status = document.getElementById("serviceStatus").value;
  const urgent = getCheckedValues("urgentService");
  
  const times = Array.from(document.querySelectorAll('input[type="time"]')).map(input => input.value);
  const dates = Array.from(document.querySelectorAll('input[type="date"]')).map(input => input.value);
  const type = getCheckedValues("serviceType");

  // Converte preço de R$ 1.234,56 para número
  const price = parseFloat(priceInput.value.replace(/\./g, "").replace(",", ".")) || 0;

  const notes = document.getElementById("serviceNotes").value.trim();
  const imageInput = document.getElementById("serviceImage");
  const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null;

  // Validação básica
  if (!name || !category || !status) {
    alert("Preencha os campos obrigatórios!");
    return;
  }

  const services = JSON.parse(localStorage.getItem("lj_services") || "[]");

  const newService = {
    id: Date.now(),
    name,
    category,
    status,
    urgent,
    times,
    dates,
    type,
    price,
    notes,
    image
  };

  services.push(newService);
  localStorage.setItem("lj_services", JSON.stringify(services));

  alert("Serviço cadastrado com sucesso!");
  location.href = "dashboard.html";
});

// Script para multi-select dropdown
document.querySelectorAll('.multi-select').forEach(select => {
  const selectBox = select.querySelector('.select-box');
  const optionsContainer = select.querySelector('.options-container');
  const selected = select.querySelector('.selected');

  selectBox.addEventListener('click', () => {
    select.classList.toggle('active');
  });

  optionsContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checkedOptions = Array.from(optionsContainer.querySelectorAll('input[type="checkbox"]:checked'))
        .map(input => input.parentNode.textContent.trim());
      selected.textContent = checkedOptions.length > 0 ? checkedOptions.join(', ') : 'Selecione as opções';
    });
  });
});

// Fecha dropdown se clicar fora
document.addEventListener('click', e => {
  document.querySelectorAll('.multi-select').forEach(select => {
    if (!select.contains(e.target)) {
      select.classList.remove('active');
    }
  });
});
