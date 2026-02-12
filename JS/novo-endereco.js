const API = "http://localhost:3000/api";
const token = localStorage.getItem("token");

const form = document.getElementById("addressForm");
const feedback = document.getElementById("feedback");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    cep: cep.value,
    rua: rua.value,
    cidade: cidade.value,
    estado: estado.value,
    numero: numero.value
  };

  try {
    const res = await fetch(`${API}/enderecos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    feedback.textContent = "Endereço salvo com sucesso!";
    feedback.style.color = "green";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);

  } catch (err) {
    console.error(err);
    feedback.textContent = err.message;
    feedback.style.color = "red";
  }
});
