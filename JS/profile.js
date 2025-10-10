// Simulação de histórico
const historyData = [
  { servico: "Lavagem completa", data: "05/10/2025", preco: "R$ 60,00" },
  { servico: "Polimento", data: "29/09/2025", preco: "R$ 120,00" },
  { servico: "Higienização interna", data: "15/09/2025", preco: "R$ 80,00" },
];

const historyContainer = document.getElementById("history");

if (historyData.length > 0) {
  historyContainer.innerHTML = historyData
    .map(
      (item) => `
      <div class="history-item">
        <h4>${item.servico}</h4>
        <p><strong>Data:</strong> ${item.data}</p>
        <p><strong>Valor:</strong> ${item.preco}</p>
      </div>
    `
    )
    .join("");
} else {
  historyContainer.innerHTML = "<p>Nenhum serviço encontrado.</p>";
}

// Modais
const editBtn = document.getElementById("editProfileBtn");
const passwordBtn = document.getElementById("changePasswordBtn");
const logoutBtn = document.getElementById("logoutBtn");

const editModal = document.getElementById("editModal");
const passwordModal = document.getElementById("passwordModal");

document.getElementById("cancelEdit").onclick = () => editModal.classList.add("hidden");
document.getElementById("cancelPassword").onclick = () => passwordModal.classList.add("hidden");

editBtn.onclick = () => editModal.classList.remove("hidden");
passwordBtn.onclick = () => passwordModal.classList.remove("hidden");

// Salvar alterações
document.getElementById("saveEdit").onclick = () => {
  const name = document.getElementById("editName").value.trim();
  const email = document.getElementById("editEmail").value.trim();

  if (name) document.getElementById("userName").textContent = name;
  if (email) document.getElementById("userContact").textContent = email;

  editModal.classList.add("hidden");
};

// Alterar senha
document.getElementById("savePassword").onclick = () => {
  const newPass = document.getElementById("newPassword").value.trim();
  if (newPass.length < 6) {
    alert("A nova senha deve ter pelo menos 6 caracteres.");
    return;
  }
  alert("Senha alterada com sucesso!");
  passwordModal.classList.add("hidden");
};

// Logout
logoutBtn.onclick = () => {
  if (confirm("Deseja sair da conta?")) {
    window.location.href = "login.html";
  }
};
