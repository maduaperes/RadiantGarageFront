document.getElementById("btnBack").addEventListener("click", () => {
  location.href = "dashboard.html";
});

document.getElementById("clientForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const client = {
    id: Date.now(),
    name: document.getElementById("clientName").value.trim(),
    phone: document.getElementById("clientPhone").value.trim(),
    email: document.getElementById("clientEmail").value.trim(),
    car: document.getElementById("clientCar").value.trim(),
  };

  if (!client.name || !client.phone || !client.email || !client.car) {
    alert("Preencha todos os campos!");
    return;
  }

  const clients = JSON.parse(localStorage.getItem("lj_clients") || "[]");
  clients.push(client);
  localStorage.setItem("lj_clients", JSON.stringify(clients));

  alert("Cliente cadastrado com sucesso!");
  location.href = "dashboard.html";
});
