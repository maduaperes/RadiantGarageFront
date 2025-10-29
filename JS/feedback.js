let attendanceRating = 0, serviceRating = 0;

const starsAttendance = document.querySelectorAll('#stars-attendance span');
const starsService = document.querySelectorAll('#stars-service span');
const textarea = document.getElementById('description');
const titleInput = document.getElementById('title');
const submitBtn = document.getElementById('submit');
const clearBtn = document.getElementById('clear');
const charCount = document.getElementById('charCount');
const feedbackMessage = document.getElementById('feedbackMessage');
const imageInput = document.getElementById('image');
const card = document.querySelector('.card'); // Card principal

let feedbackTimeout; // Timeout para sumir a mensagem

// ===== Função de mostrar notificação =====
function showNotification(message, color) {
  feedbackMessage.textContent = message;
  feedbackMessage.style.color = color;

  // Limpa qualquer timeout anterior
  if (feedbackTimeout) clearTimeout(feedbackTimeout);

  // Desaparece em 10 segundos
  feedbackTimeout = setTimeout(() => {
    feedbackMessage.textContent = '';
  }, 10000);
}

// ===== Função de destacar estrelas =====
function highlightStars(stars, count) {
  stars.forEach(star => star.classList.remove('hover', 'selected'));
  stars.forEach(star => {
    if (parseInt(star.dataset.value) <= count) star.classList.add('selected');
  });
}

// ===== Eventos das estrelas =====
starsAttendance.forEach(star => {
  star.addEventListener('mouseover', () => highlightStars(starsAttendance, parseInt(star.dataset.value)));
  star.addEventListener('mouseout', () => highlightStars(starsAttendance, attendanceRating));
  star.addEventListener('click', () => {
    attendanceRating = parseInt(star.dataset.value);
    highlightStars(starsAttendance, attendanceRating);
    checkEnableSubmit();
  });
});

starsService.forEach(star => {
  star.addEventListener('mouseover', () => highlightStars(starsService, parseInt(star.dataset.value)));
  star.addEventListener('mouseout', () => highlightStars(starsService, serviceRating));
  star.addEventListener('click', () => {
    serviceRating = parseInt(star.dataset.value);
    highlightStars(starsService, serviceRating);
    checkEnableSubmit();
  });
});

// ===== Contagem de caracteres =====
textarea.addEventListener('input', () => {
  charCount.textContent = `${textarea.value.length}/500`;
  checkEnableSubmit();
});

// ===== Habilitar ou desabilitar botão enviar =====
function checkEnableSubmit() {
  submitBtn.disabled = (
    attendanceRating === 0 &&
    serviceRating === 0 &&
    textarea.value.trim() === '' &&
    titleInput.value.trim() === ''
  );
}

// ===== Limpar formulário =====
function clearForm(showMsg = false) {
  attendanceRating = 0;
  serviceRating = 0;
  highlightStars(starsAttendance, 0);
  highlightStars(starsService, 0);
  textarea.value = '';
  charCount.textContent = '0/500';
  titleInput.value = '';
  imageInput.value = '';
  checkEnableSubmit();
}

// ===== Enviar avaliação =====
submitBtn.addEventListener('click', () => {
  const review = {
    title: titleInput.value.trim(),
    description: textarea.value.trim(),
    attendanceRating,
    serviceRating,
    image: imageInput.files[0]?.name || '',
    date: new Date().toISOString()
  };

  const reviews = JSON.parse(localStorage.getItem('lj_reviews') || '[]');
  reviews.unshift(review);
  localStorage.setItem('lj_reviews', JSON.stringify(reviews));

  showNotification("Avaliação enviada com sucesso!", "green"); // verde para enviado
  clearForm(); // limpa sem mostrar notificação de limpeza
});

// ===== Botão voltar =====
document.getElementById('btnBack').addEventListener('click', () => {
  location.href = 'status.html';
});
