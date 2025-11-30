const itensBanner = [
  {
    "id": 1,
    "image": "public/imagens/lapinha-da-serra.jpg",
    "alt": "Paisagem de Minas",
    "title": "Paisagens que Inspiram",
    "description": "Cachoeiras, montanhas e paisagens de tirar o fôlego."
  },
  {
    "id": 2,
    "image": "public/imagens/food.jpg",
    "alt": "Gastronomia Mineira",
    "title": "Sabores que Contam Histórias",
    "description": "Da cozinha da roça aos cafés premiados — descubra o sabor da tradição mineira."
  },
  {
    "id": 3,
    "image": "public/imagens/Mg.jpeg",
    "alt": "Natureza Mineira",
    "title": "Caminhos do Tempo",
    "description": "Explore cidades coloniais, museus e os marcos da liberdade brasileira."
  },
  {
    "id": 4,
    "image": "public/imagens/festival.jpg",
    "alt": "Cultura Mineira",
    "title": "Fé, Festa e Identidade",
    "description": "Celebre as tradições que fazem de Minas um estado único."
  }
];

//JS
const URL_BANNERS = 'http://localhost:3000/banners';

function DetalhesUm(id) {
    window.location.href = `../BANNER/detalhes1.html?id=${id}`;
}

function renderizarBanner(itensDaAPI) {
    const container = document.getElementById('carouselContent'); 
    if (!container) return; 

    let htmlContent = '';
    itensDaAPI.forEach((item, index) => {
        const activeClass = index === 0 ? 'active' : '';
        htmlContent += `
            <div class="carousel-item ${activeClass}" onclick="DetalhesUm('${item.id}')" style="cursor: pointer;">
                <img src="${item.image}" class="img-fluid w-100 main-carousel-img" style="height: 90vh; object-fit: cover;" alt="${item.alt || item.title}">      
                <div class="position-absolute top-50 start-50 translate-middle text-center text-white bg-dark bg-opacity-50 p-4 rounded">
                    <h1 class="display-3 fw-bold">${item.title}</h1>
                    <p class="fs-4">${item.description}</p>
                </div>
            </div>
        `;
    });
    container.innerHTML = htmlContent;
}

async function carregarBanner() {
    try {
        const response = await fetch(URL_BANNERS);
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar banners: ${response.status}`);
        }
        
        const banners = await response.json();
        renderizarBanner(banners); 
        
    } catch (error) {
        console.error('Falha na requisição GET de Banners:', error);
    }
}

document.addEventListener("DOMContentLoaded", carregarBanner);