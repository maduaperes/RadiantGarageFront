document.getElementById("btnBack").addEventListener("click", () => {
  location.href = "dashboard.html";
});

document.getElementById("serviceForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("serviceName").value.trim();
  const price = parseFloat(document.getElementById("servicePrice").value);
  const desc = document.getElementById("serviceDesc").value.trim();

  if (!name || !price || !desc) {
    alert("Preencha todos os campos!");
    return;
  }

  const services = JSON.parse(localStorage.getItem("lj_services") || "[]");
  const newService = { id: Date.now(), name, price, desc };

  services.push(newService);
  localStorage.setItem("lj_services", JSON.stringify(services));

  alert("Serviço cadastrado com sucesso!");
  location.href = "dashboard.html";
});
