function getServiceIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderizarServicoDetalhe(servico) {
  const container = document.getElementById("serviceDetailContainer");
  if (!container) return;

  container.innerHTML = `
    <h1><strong>${servico.nome_servico}</strong></h1>
    <div class="images">
      <img class="main-img"
           src="https://www.tecfil.com.br/wp-content/uploads/2020/09/galerias_tecfil-seo_0005_shutterstock_1457616980-1024x683.jpg"
           alt="Serviço">

      <div class="thumbs">
        <img src="https://assets.gulfoilltd.com/gulfindia/files/inline-images/Ensuring%20Safety%20and%20Readiness.webp?VersionId=gpUl2M6dWY8TgRjNSmlEbM1ofRwmxTfM" alt="Detalhe 1">
        <img src="https://cdn.create.vista.com/api/media/small/228020620/stock-photo-cropped-shot-auto-mechanic-rag-checking-automobile" alt="Detalhe 2">
        <img src="https://images.pexels.com/photos/8985510/pexels-photo-8985510.jpeg" alt="Detalhe 3">
        <img src="https://images.pexels.com/photos/7564871/pexels-photo-7564871.jpeg" alt="Detalhe 4">
      </div>
    </div>

  <div class="avaliacao">
    <span class="preco">Preço estimado: ${servico.custo_servico}</span>
    <a href="agendamento.html?id=${servico.id}">Agendar Agora</a>
  </div>

    <p><strong>Tempo estimado:</strong> ${servico.tempo_estipulado} minutos</p>

    <hr />

    <div class="detalhes-adicionais">
      <h2>Informações do Serviço</h2>
      <ul>
        <li><strong>Nome do serviço:</strong> ${servico.nome_servico}</li>
        <li><strong>Preço estimado:</strong> ${servico.custo_servico}</li>
        <li><strong>Tempo estimado:</strong> ${servico.tempo_estipulado} minutos</li>
      </ul>
    </div>

    <hr />

    <div class="descricao">
      <strong>Descrição:</strong>
      <p>${servico.descricao ?? "Sem descrição"}</p>
    </div>
  `;
}

function renderizarServicosSugeridos(servicos) {
  const container = document.getElementById("suggestedServices");
  if (!container) return;

  container.innerHTML = "";

  const imagensSugeridas = [
    "https://www.oklocadoradeveiculos.com/wp-content/uploads/2020/05/Depositphotos_94983148_xl-2015A-1080x675.jpg",
    "https://mobilidade.estadao.com.br/wp-content/uploads/2023/05/injecao.jpg",
    "https://suaoficinaonline.com.br/conteudo/content/images/2018/12/insulfilm.jpg",
    "https://www.zuldigital.com.br/blog/wp-content/uploads/2021/11/shutterstock_1859193349_Easy-Resize.com_.jpg",
    "https://wicar.com.br/wp-content/uploads/2021/08/polimento-automotivo.jpg",
    "https://www.simoniz.uk/wp-content/uploads/2025/03/iStock-2170601866.jpg"
  ];

  servicos.forEach((servico, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h1>${servico.nome_servico}</h1>
      <img src="${imagensSugeridas[index % imagensSugeridas.length]}" alt="Serviço">
      <div class="service-content">
        <h5>${servico.nome_servico}</h5>
        <p>${servico.descricao ?? "Sem descrição"}</p>
        <p>Preço: ${servico.custo_servico}</p>
        <a href="servico.html?id=${servico.id}">Ver mais</a>
      </div>
    `;
    container.appendChild(li);
  });
}

async function buscarServicoPorId() {
  const serviceId = getServiceIdFromURL();
  if (!serviceId) return;

  try {
    const response = await fetch(`http://localhost:3000/api/servicos/publico/${serviceId}`);
    if (!response.ok) throw new Error(`Erro ao buscar serviço: ${response.status}`);

    const servico = await response.json();
    renderizarServicoDetalhe(servico);
  } catch (error) {
    console.error("Erro ao buscar serviço:", error.message);
    const container = document.getElementById("serviceDetailContainer");
    if (container) container.innerHTML = `<p>Erro ao carregar o serviço.</p>`;
  }
}

async function buscarServicosSugeridos() {
  try {
    const response = await fetch(`http://localhost:3000/api/servicos/todos`);
    if (!response.ok) throw new Error(`Erro ao buscar serviços sugeridos: ${response.status}`);

    const servicos = await response.json();
    const serviceId = getServiceIdFromURL();
    const sugeridos = servicos.filter(s => s.id != serviceId).slice(0, 6);
    renderizarServicosSugeridos(sugeridos);
  } catch (error) {
    console.error("Erro ao buscar serviços sugeridos:", error.message);
  }
}

document.getElementById("btnBack")?.addEventListener("click", () => window.history.back());

document.addEventListener("DOMContentLoaded", () => {
  buscarServicoPorId();
  buscarServicosSugeridos();
});
