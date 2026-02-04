// splash behaviour: click to enter (go to login)
document.getElementById('enterBtn').addEventListener('click', () => location.href = 'login.html');
// optional auto-redirect after 3s
setTimeout(() => { /* location.href='login.html' */ }, 3000);