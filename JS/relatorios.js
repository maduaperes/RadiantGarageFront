document.addEventListener("DOMContentLoaded", () => {
  const btnFiltrar = document.getElementById("btn-filtrar");
  const btnLimpar = document.getElementById("btn-limpar");
  const btnPDF = document.getElementById("btn-pdf");
  const btnExcel = document.getElementById("btn-excel");

  btnFiltrar.addEventListener("click", () => {
    alert("Filtro aplicado!");
  });

  btnLimpar.addEventListener("click", () => {
    document.getElementById("data-inicio").value = "";
    document.getElementById("data-fim").value = "";
    document.getElementById("tipo-relatorio").selectedIndex = 0;
    alert("Filtros limpos!");
  });

  btnPDF.addEventListener("click", () => {
    alert("Exportando relatório em PDF...");
  });

  btnExcel.addEventListener("click", () => {
    alert("Exportando relatório em Excel...");
  });
});
