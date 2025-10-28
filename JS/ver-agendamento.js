document.getElementById("btnBack").addEventListener("click", () => {
  location.href = "dashboard.html";
});

const tableBody = document.querySelector("#agendTable tbody");
const history = JSON.parse(localStorage.getItem("lj_history") || "[]");
const services = JSON.parse(localStorage.getItem("lj_services") || "[]");

if (history.length === 0) {
  tableBody.innerHTML = `<tr><td colspan="5">Nenhum agendamento encontrado</td></tr>`;
} else {
  history.forEach(item => {
    const service = services.find(s => s.id == item.serviceId);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${service ? service.name : "Desconhecido"}</td>
      <td>${item.date}</td>
      <td>${item.time}</td>
      <td>${item.payment}</td>
      <td>${item.status}</td>
    `;
    tableBody.appendChild(tr);
  });
}