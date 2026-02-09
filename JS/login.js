const API = "http://localhost:3000/api"

const loginForm = document.getElementById("loginForm")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const feedback = document.getElementById("feedback")
const btnBack = document.getElementById("btnBack")


// ================================
// 🔹 Verifica status do cadastro
// ================================
async function verificarCadastro(token) {
  const response = await fetch(`${API}/auth/status`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error("Erro ao verificar cadastro")
  }

  return await response.json()
}


// ================================
// 🔹 Feedback visual
// ================================
function showFeedback(message, type = "error") {
  feedback.textContent = message
  feedback.style.color = type === "error" ? "red" : "green"
}

function clearFeedback() {
  feedback.textContent = ""
}


// ================================
// 🔹 Botão voltar
// ================================
btnBack.addEventListener("click", () => {
  window.history.back()
})


// ================================
// 🔹 Requisição de login
// ================================
async function loginRequest(email, password) {
  const response = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Erro ao fazer login")
  }

  return data
}


// ================================
// 🔹 SUBMIT LOGIN
// ================================
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  clearFeedback()

  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()

  if (!email || !password) {
    showFeedback("Preencha todos os campos")
    return
  }

  try {
    const data = await loginRequest(email, password)

    const token = data.session.access_token

    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(data.user))

    showFeedback("Login realizado com sucesso!", "success")

    const status = await verificarCadastro(token)

    setTimeout(() => {

      if (!status.finalizado) {

        switch (status.motivo) {

          case "SEM_CONTATO":
            window.location.href = "novo-contato.html"
            return

          case "SEM_TIPO":
            window.location.href = "tipodeconta.html"
            return
        }
      }

      window.location.href = "index.html"

    }, 800)

  } catch (err) {
    showFeedback(err.message)
  }
})
