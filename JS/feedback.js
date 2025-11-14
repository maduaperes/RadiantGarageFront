document.addEventListener("DOMContentLoaded", () => {

  // Variáveis principais
  window.overallRating = 0;
  window.serviceRating = 0;
  window.attendanceRating = 0;

  const starsOverall = document.querySelectorAll('#stars-overall span');
  const starsService = document.querySelectorAll('#stars-service span');
  const starsAttendance = document.querySelectorAll('#stars-attendance span');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const titleInput = document.getElementById('title');
  const imageInput = document.getElementById('image');
  const checkboxAgree = document.getElementById('agree');

  const observationsInput = document.getElementById('description');
  const counterSpan = document.getElementById('charCount');

  const submitBtn = document.getElementById('submit');
  const clearBtn = document.getElementById('clear');
  const feedbackMessage = document.getElementById('feedbackMessage');

  let feedbackTimeout;


  // Mostrar notificação
  function showNotification(message, color, permanent = false) {
    feedbackMessage.textContent = message;
    feedbackMessage.style.color = color;
    feedbackMessage.classList.add('active');

    if (feedbackTimeout) clearTimeout(feedbackTimeout);

    if (!permanent) {
      feedbackTimeout = setTimeout(() => {
        feedbackMessage.classList.remove('active');
      }, 8000);
    }
  }


  // Estrelas
  function highlightStars(stars, count) {
    stars.forEach(star => star.classList.remove('selected'));
    stars.forEach(star => {
      if (parseInt(star.dataset.value) <= count) {
        star.classList.add('selected');
      }
    });
  }

  function setupStarEvents(stars, ratingName) {
    stars.forEach(star => {
      star.addEventListener('mouseover', () => {
        highlightStars(stars, star.dataset.value);
      });

      star.addEventListener('mouseout', () => {
        highlightStars(stars, window[ratingName]);
      });

      star.addEventListener('click', () => {
        window[ratingName] = parseInt(star.dataset.value);
        highlightStars(stars, window[ratingName]);
        checkEnableSubmit();
      });
    });
  }

  setupStarEvents(starsOverall, 'overallRating');
  setupStarEvents(starsService, 'serviceRating');
  setupStarEvents(starsAttendance, 'attendanceRating');


  // Contador de caracteres
  function updateCharCount() {
    const max = 500;
    const used = observationsInput.value.length;
    counterSpan.textContent = `${max - used} caracteres disponíveis.`;
    counterSpan.style.color = max - used <= 50 ? 'red' : 'inherit';
  }

  observationsInput.addEventListener('input', updateCharCount);
  updateCharCount();


  // Botão enviar habilitado?
  function checkEnableSubmit() {
    const hasRating =
      window.overallRating > 0 ||
      window.serviceRating > 0 ||
      window.attendanceRating > 0;

    submitBtn.disabled = !(hasRating && checkboxAgree.checked);
  }


  checkboxAgree.addEventListener('change', checkEnableSubmit);
  observationsInput.addEventListener('input', checkEnableSubmit);


  // Limpar formulário
  function clearForm() {
    window.overallRating = 0;
    window.serviceRating = 0;
    window.attendanceRating = 0;

    highlightStars(starsOverall, 0);
    highlightStars(starsService, 0);
    highlightStars(starsAttendance, 0);

    nameInput.value = '';
    emailInput.value = '';
    titleInput.value = '';
    imageInput.value = '';
    checkboxAgree.checked = false;
    observationsInput.value = '';

    updateCharCount();
    checkEnableSubmit();
  }


  // Botão limpar
  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clearForm();
    showNotification("Formulário limpo!", "green");
  });


  // Enviar feedback
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!checkboxAgree.checked) {
      showNotification("Você precisa concordar com os termos.", "red");
      return;
    }

    const review = {
      nome: nameInput.value.trim() || 'Anônimo',
      email: emailInput.value.trim(),
      titulo: titleInput.value.trim(),
      ratings: {
        geral: window.overallRating,
        servico: window.serviceRating,
        atendimento: window.attendanceRating
      },
      observacoes: observationsInput.value.trim(),
      imagem: imageInput.files[0]?.name || '',
      data: new Date().toLocaleString("pt-BR")
    };

    const reviews = JSON.parse(localStorage.getItem("radiant_reviews") || "[]");
    reviews.unshift(review);
    localStorage.setItem("radiant_reviews", JSON.stringify(reviews));

    showNotification("Obrigada pelo feedback!", "green");

    submitBtn.disabled = true;
    clearBtn.disabled = true;

    setTimeout(clearForm, 1000);
    setTimeout(() => {
      window.location.href = "procura.html";
    }, 2500);
  });


  // Voltar
  const btnBack = document.getElementById('btnBack');
  btnBack?.addEventListener('click', () => {
    window.location.href = "status.html";
  });

});
