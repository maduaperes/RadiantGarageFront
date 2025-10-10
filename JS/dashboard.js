// Gráfico de desempenho - RadiantGarage

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('performanceChart');

  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
      datasets: [{
        label: 'Serviços Concluídos',
        data: [20, 25, 30, 28, 35, 40, 38, 45, 50, 47],
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: 'rgba(249, 115, 22, 1)',
        pointBorderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#e6eef8' }
        }
      },
      scales: {
        x: {
          ticks: { color: '#e6eef8' },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        y: {
          ticks: { color: '#e6eef8' },
          grid: { color: 'rgba(255,255,255,0.1)' }
        }
      }
    }
  });
});
