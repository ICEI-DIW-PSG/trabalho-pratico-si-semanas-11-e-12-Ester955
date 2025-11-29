const itensCards = [
  {
    "id": 1,
    "image": "/public/CARDS/imagens1/historia.jpeg",
    "title": "História e Patrimônio",
    "subtitle": "Arte, revoluções e memória"
  },
  {
    "id": 2,
    "image": "/public/imagens/mapa.jpeg",
    "title": "Geografia de Minas",
    "subtitle": "Montanhas, rios e biomas"
  },
  {
    "id": 3,
    "image": "/public/imagens/PicodaBandeira.jpeg",
    "title": "Paisagens Naturais",
    "subtitle": "Montanhas, cachoeiras e cânions"
  },
  {
    "id": 4,
    "image": "/public/imagens/januária.jpeg",
    "title": "Parques Naturais",
    "subtitle": "Preservação e biodiversidade"
  },
  {
    "id": 5,
    "image": "/public/imagens\\agricultura.webp",
    "title": "Agricultura Mineira",
    "subtitle": "Do campo à mesa"
  },
  {
    "id": 6,
    "image": "/public/imagens/paodequeijo.jpeg",
    "title": "Culinária Mineira",
    "subtitle": "Sabores que acolhem"
  },
  {
    "id": 7,
    "image": "/public/imagens/queijo.jpeg",
    "title": "Queijos",
    "subtitle": "Sabor que atravessa gerações"
  },
  {
    "id": 8,
    "image": "/public/imagens/Mg2.jpeg",
    "title": "Cidades Históricas",
    "subtitle": "Barroco, fé e resistência"
  },
  {
    "id": 9,
    "image": "/public/imagens/cultura.jpeg",
    "title": "Festas e Tradições",
    "subtitle": "Fé, música e identidade"
  },
  {
    "id": 10,
    "image": "/public/imagens/juscelino.webp",
    "title": "Personalidades Mineiras",
    "subtitle": "Gênios que nasceram em Minas"
  },
  {
    "id": 11,
    "image": "/public/imagens/bh.jpg",
    "title": "Belo Horizonte",
    "subtitle": "Tradição e modernidade"
  },
  {
    "id": 12,
    "image": "/public/imagens/ciencia.webp",
    "title": "Ciência e Educação",
    "subtitle": "Conhecimento que transforma"
  }
];

//JS
function abrirDetalhes(id) {
  window.location.href = `../CARDS/detalhes.html?id=${id}`;
}

function renderizarCards() {
  const container = document.getElementById('cardsDestaqueContainer');
  if (!container) return; 

  let htmlContent = '';
  itensCards.forEach((item) => {
    htmlContent += `
      <div class="col">
        <div class="card card-personalizado">
          <img src="${item.image}" class="card-img-top" style="height: 150px; object-fit: cover;" alt="${item.title}">
          <div class="card-body text-center">
            <h6 class="fw-bold">${item.title}</h6>
            <p class="text-muted small">${item.subtitle}</p>
            <a href="#" onclick="abrirDetalhes(${item.id})" class="btn btn-outline-dark btn-sm">Ver mais</a>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = htmlContent;
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarCards(); 
});
