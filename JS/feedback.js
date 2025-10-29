// ===== Variáveis principais =====
let overallRating = 0, serviceRating = 0, attendanceRating = 0;

const starsOverall = document.querySelectorAll('#stars-overall span');
const starsService = document.querySelectorAll('#stars-service span');
const starsAttendance = document.querySelectorAll('#stars-attendance span');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const categorySelect = document.getElementById('category');
const imageInput = document.getElementById('image');
const checkboxAgree = document.getElementById('agree');

const submitBtn = document.getElementById('submit');
const clearBtn = document.getElementById('clear');
const feedbackMessage = document.getElementById('feedbackMessage');

let feedbackTimeout;

// ===== Função: Mostrar notificação =====
function showNotification(message, color) {
  feedbackMessage.textContent = message;
  feedbackMessage.style.color = color;
  feedbackMessage.style.opacity = "1";

  if (feedbackTimeout) clearTimeout(feedbackTimeout);

  feedbackTimeout = setTimeout(() => {
    feedbackMessage.style.opacity = "0";
  }, 8000);
}

// ===== Função: Destacar estrelas =====
function highlightStars(stars, count) {
  stars.forEach(star => star.classList.remove('selected'));
  stars.forEach(star => {
    if (parseInt(star.dataset.value) <= count) star.classList.add('selected');
  });
}

// ===== Configurar eventos das estrelas =====
function setupStarEvents(stars, ratingVar) {
  stars.forEach(star => {
    star.addEventListener('mouseover', () => highlightStars(stars, parseInt(star.dataset.value)));
    star.addEventListener('mouseout', () => highlightStars(stars, ratingVar.value));
    star.addEventListener('click', () => {
      ratingVar.value = parseInt(star.dataset.value);
      highlightStars(stars, ratingVar.value);
      checkEnableSubmit();
    });
  });
}

// Ligações das estrelas
setupStarEvents(starsOverall, { get value() { return overallRating; }, set value(v) { overallRating = v; } });
setupStarEvents(starsService, { get value() { return serviceRating; }, set value(v) { serviceRating = v; } });
setupStarEvents(starsAttendance, { get value() { return attendanceRating; }, set value(v) { attendanceRating = v; } });

// ===== Habilitar botão "Enviar" =====
function checkEnableSubmit() {
  submitBtn.disabled = !(
    (overallRating || serviceRating || attendanceRating) &&
    categorySelect.value !== '' &&
    checkboxAgree.checked
  );
}

// ===== Monitorar mudanças =====
[nameInput, emailInput, categorySelect, checkboxAgree].forEach(el =>
  el.addEventListener('input', checkEnableSubmit)
);

// ===== Limpar formulário =====
function clearForm() {
  overallRating = serviceRating = attendanceRating = 0;
  highlightStars(starsOverall, 0);
  highlightStars(starsService, 0);
  highlightStars(starsAttendance, 0);

  nameInput.value = '';
  emailInput.value = '';
  categorySelect.value = '';
  imageInput.value = '';
  checkboxAgree.checked = false;
  checkEnableSubmit();
  showNotification("Formulário limpo!", "green");
}

// ===== Botão limpar =====
clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearForm();
});

// ===== Enviar feedback =====
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (!checkboxAgree.checked) {
    showNotification("Você precisa concordar com os termos antes de enviar.", "red");
    return;
  }

  const review = {
    nome: nameInput.value.trim() || 'Anônimo',
    email: emailInput.value.trim(),
    tipo: categorySelect.value,
    ratings: {
      geral: overallRating,
      serviço: serviceRating,
      atendimento: attendanceRating
    },
    imagem: imageInput.files[0]?.name || '',
    data: new Date().toLocaleString('pt-BR')
  };

  const reviews = JSON.parse(localStorage.getItem('radiant_reviews') || '[]');
  reviews.unshift(review);
  localStorage.setItem('radiant_reviews', JSON.stringify(reviews));

  showNotification("Avaliação enviada com sucesso!", "green");
  clearForm();
});

// ===== Botão voltar =====
document.getElementById('btnBack').addEventListener('click', () => {
  location.href = 'status.html';
});
