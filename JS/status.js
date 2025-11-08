const statusBox = document.getElementById('statusBox');
const eta = document.getElementById('eta');
const current = JSON.parse(localStorage.getItem('lj_current') || 'null');
if (!current) { statusBox.textContent = 'Nenhum serviço agendado. Faça um agendamento.'; eta.textContent = ''; } else {
  let stages = ['agendado', 'em andamento', 'finalizando', 'finalizado'];
  let i = stages.indexOf(current.status || 'agendado');
  statusBox.textContent = 'Status: ' + stages[i];
  let minutesLeft = 30;
  eta.textContent = 'Estimativa: ~' + minutesLeft + ' minutos';
  // simulate progress
  const interval = setInterval(() => {
    if (i < stages.length - 1) { i++; current.status = stages[i]; localStorage.setItem('lj_current', JSON.stringify(current)); statusBox.textContent = 'Status: ' + stages[i]; minutesLeft -= 10; eta.textContent = minutesLeft > 0 ? 'Estimativa: ~' + minutesLeft + ' minutos' : 'Finalizando...'; }
    if (i >= stages.length - 1) { clearInterval(interval); eta.textContent = 'Concluído.'; }
  }, 8000); // advance every 8s for demo
}
document.getElementById('toDashboard').addEventListener('click', () => location.href = 'dashboard.html');
document.getElementById('leaveFeedback').addEventListener('click', () => location.href = 'feedback.html');
document.getElementById('btnBack').addEventListener('click', () => {
  location.href = 'procura.html';
});