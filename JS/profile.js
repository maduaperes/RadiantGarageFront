const API = "http://localhost:3000/api";

// ===============================
// ELEMENTOS EXISTENTES NO HTML
// ===============================
const userName = document.getElementById("userName");
const userContact = document.getElementById("userContact");

// ===============================
// TOKEN
// ===============================
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// ===============================
// CARREGAR PERFIL PELO TOKEN
// ===============================
async function carregarPerfil() {
  const res = await fetch("http://localhost:3000/api/clientes/me", {
    credentials: "include"
  });

  if (!res.ok) return;

  const cliente = await res.json();

  userName.textContent = cliente.nome_cliente;
  userContact.textContent = `CPF: ${cliente.cpf}`;
}


// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", carregarPerfil);
