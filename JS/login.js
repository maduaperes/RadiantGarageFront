const API_URL = "http://localhost:3000/api"

const loginForm = document.getElementById("loginForm")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const feedback = document.getElementById("feedback")
const btnBack = document.getElementById("btnBack")

function showFeedback(message, type = "error") {
  feedback.textContent = message
  feedback.style.color = type === "error" ? "red" : "green"
}

function clearFeedback() {
  feedback.textContent = ""
}

btnBack.addEventListener("click", () => {
  window.history.back()
})

async function loginRequest(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
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

    localStorage.setItem("token", data.session.access_token)
    localStorage.setItem("user", JSON.stringify(data.user))

    showFeedback("Login realizado com sucesso!", "success")

    setTimeout(() => {
      window.location.href = "index.html"
    }, 800)

  } catch (err) {
    showFeedback(err.message)
  }
})
