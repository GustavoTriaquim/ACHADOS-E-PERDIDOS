const usuarios = ['gustavo', 'yagami', 'gdk', 'ghostzin', 'yuji', 'pudim', 'shio'];
const senhas = {};

function zerarInputs() {
  document.getElementById('input-nome').value = '';
  document.getElementById('input-senha').value = '';
}

function verificarPagina(username) { // Recebe username como parâmetro
  const url = `./pages/${username}.html`;
  return fetch(url, { method: 'HEAD' })
    .then(response => response.ok)
    .catch(() => false);
}

function verificarUsuario() {
  const username = document.getElementById('input-nome').value.toLowerCase();
  const password = document.getElementById('input-senha').value;

  if (!usuarios.includes(username)) {
    alert('Usuario nao encontrado!');
    zerarInputs();
    return; // Adicionado para impedir execução posterior
  }

  if (!senhas[username]) {
    senhas[username] = password;
    alert('Cadastro realizado! Favor realizar login novamente.');
    zerarInputs();
    return; // Adicionado para finalizar o fluxo
  }

  if (senhas[username] === password) {
    verificarPagina(username).then(existePagina => {
      if (existePagina) {
        alert('Redirecionando...');
        window.location.href = `./pages/${username}.html`;
      } else {
        window.location.href = './pages/404.html';
      }
    });
  } else {
    alert('Senha incorreta.');
    zerarInputs();
  }
}

/* MODAL */

function abrirModal(tipo, src, elementoOriginal = null) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalVideo = document.getElementById('modal-video');

  document.querySelectorAll('video').forEach(video => video.pause());

  if (tipo === 'foto') {
    modalImg.src = src;
    modalImg.style.display = 'block';
    modalVideo.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = '';
  } else if (tipo === 'video') {
    modalVideo.src = src;
    modalVideo.style.display = 'block';
    modalVideo.controls = true;
    modalVideo.play();
    modalImg.style.display = 'none';

    if (elementoOriginal) {
      elementoOriginal.pause();
    }
  }
  modal.style.display = 'flex';
}

function fecharModal() {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalVideo = document.getElementById('modal-video');

  modal.style.display = 'none';
  modalImg.src = '';
  modalVideo.pause();
  modalVideo.src = '';
}
