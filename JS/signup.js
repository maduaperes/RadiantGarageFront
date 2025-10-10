document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signupForm');
  const feedback = document.getElementById('feedback');

  const clienteRadio = document.getElementById('cliente');
  const estabelecimentoRadio = document.getElementById('estabelecimento');
  const clienteFields = document.getElementById('clienteFields');
  const establishmentFields = document.getElementById('establishmentFields');

  function toggleFields() {
    const clienteInputs = clienteFields.querySelectorAll('input');
    const estabelecimentoInputs = establishmentFields.querySelectorAll('input');

    if (clienteRadio.checked) {
      clienteFields.style.display = 'block';
      establishmentFields.style.display = 'none';

      clienteInputs.forEach(input => input.required = true);
      estabelecimentoInputs.forEach(input => input.required = false);

    } else {
      clienteFields.style.display = 'none';
      establishmentFields.style.display = 'grid';

      estabelecimentoInputs.forEach(input => {
        if (input.id === 'horario') {
          input.required = false;
        } else {
          input.required = true;
        }
      });

      clienteInputs.forEach(input => input.required = false);
    }
  }

  clienteRadio.addEventListener('change', toggleFields);
  estabelecimentoRadio.addEventListener('change', toggleFields);

  toggleFields(); // chama ao carregar para ajustar a visibilidade e required

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const userType = document.querySelector('input[name="userType"]:checked').id;

    let userData = { type: userType };

    if (userType === 'cliente') {
      const nome = document.getElementById('nameCliente').value.trim();
      const email = document.getElementById('emailCliente').value.trim();
      const senha = document.getElementById('passwordCliente').value.trim();
      const cpf = document.getElementById('cpf').value.trim();

      if (!nome || !email || !senha || !cpf) {
        feedback.textContent = "Preencha todos os campos de cliente.";
        feedback.style.color = "red";
        return;
      }

      userData = { ...userData, nome, email, senha, cpf };

    } else {
      const nomeEstab = establishmentFields.querySelector('#nameEstab').value.trim();
      const cnpj = establishmentFields.querySelector('#cnpj').value.trim();
      const endereco = establishmentFields.querySelector('#endereco').value.trim();
      const cidade = establishmentFields.querySelector('#cidade').value.trim();
      const estado = establishmentFields.querySelector('#estado').value.trim();
      const cep = establishmentFields.querySelector('#cep').value.trim();
      const horario = establishmentFields.querySelector('#horario').value.trim();
      const emailEstab = establishmentFields.querySelector('#emailEstab').value.trim();
      const senhaEstab = establishmentFields.querySelector('#passwordEstab').value.trim();

      if (!nomeEstab || !cnpj || !endereco || !cidade || !estado || !cep || !emailEstab || !senhaEstab) {
        feedback.textContent = "Preencha todos os campos obrigatórios do estabelecimento.";
        feedback.style.color = "red";
        return;
      }

      userData = {
        ...userData,
        nomeEstab,
        cnpj,
        endereco,
        cidade,
        estado,
        cep,
        horario,
        email: emailEstab,
        senha: senhaEstab
      };
    }

    localStorage.setItem('lj_user', JSON.stringify(userData));

    feedback.textContent = "Conta criada com sucesso! Redirecionando...";
    feedback.style.color = "green";

    setTimeout(() => {
      window.location.href = 'procura.html';
    }, 1500);
  });
});
