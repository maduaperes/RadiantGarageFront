const API_URL = "http://localhost:3000/api"

const loginBtn = document.getElementById("login")
const perfilBtn = document.getElementById("varbuttonId")

async function checkEstabelecimento(token) {
  const response = await fetch(`${API_URL}/estabelecimentos/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) return false

  const data = await response.json()
  return data?.isEstabelecimento === true
}

function logout(e) {
  e?.preventDefault()
  localStorage.clear()
  window.location.href = "login.html"
}

async function initHeaderAuth() {

  const token = localStorage.getItem("token")

  if (!token) {

    if (loginBtn) {
      loginBtn.textContent = "Login"
      loginBtn.href = "login.html"
      loginBtn.style.backgroundColor = ""
    }

    if (perfilBtn) {
      perfilBtn.style.display = "none"
    }

    return
  }

  if (loginBtn) {
    loginBtn.textContent = "Logout"
    loginBtn.href = "#"
    loginBtn.style.backgroundColor = "red"
    loginBtn.onclick = logout
  }

  if (!perfilBtn) return

  perfilBtn.style.display = "inline-block"

  const isEstabelecimento = await checkEstabelecimento(token)

  if (isEstabelecimento) {
    perfilBtn.textContent = "Dashboard"
    perfilBtn.href = "dashboard.html"
  } else {
    perfilBtn.textContent = "Perfil"
    perfilBtn.href = "profile.html"
  }
}

document.addEventListener("DOMContentLoaded", initHeaderAuth)
