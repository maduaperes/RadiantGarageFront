// Gráficos do Dashboard - RadiantGarage

document.addEventListener("DOMContentLoaded", () => {
  // ====== Gráfico de Desempenho Mensal (Line) ======
  const ctxPerformance = document.getElementById('performanceChart');
  if (ctxPerformance) {
    new Chart(ctxPerformance, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
        datasets: [{
          label: 'Serviços Concluídos',
          data: [20, 25, 30, 28, 35, 40, 38, 45, 50, 47],
          backgroundColor: '#4f46e533',
          borderColor: '#4f46e5ff',
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
  }

  // ====== Gráfico de Receita por Serviço (Bar) ======
  const ctxRevenue = document.getElementById('revenueChart');
  if (ctxRevenue) {
    new Chart(ctxRevenue, {
      type: 'bar',
      data: {
        labels: ['Troca de óleo', 'Revisão completa', 'Alinhamento', 'Balanceamento'],
        datasets: [{
          label: 'Receita (R$)',
          data: [1500, 2000, 1200, 1800],
          backgroundColor: [
            '#4f46e5ff',
            '#4e46e5ff',
            '#4f46e5ff',
            '#4e46e5ff'
          ],
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return 'R$ ' + value;
              },
              color: '#e6eef8'
            },
            grid: { color: 'rgba(255,255,255,0.1)' }
          },
          x: {
            ticks: { color: '#e6eef8' },
            grid: { color: 'rgba(255,255,255,0.1)' }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return 'R$ ' + context.raw;
              }
            }
          }
        }
      }
    });
  }
});
